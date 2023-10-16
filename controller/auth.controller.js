const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs'); 

exports.register = async (req, res) => {
  
  try {
    if (req.file && req.file.size > 1000000) {
      // Usuń plik, jeśli przekracza limit
      fs.unlinkSync(req.file.path);
      return res.status(400).send({ message: 'File size exceeds the limit (1 MB)' });
    }

    const { login, password, phone } = req.body;
    // console.log(req.body, req.file);
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    
    if (login && typeof login === 'string' && password && typeof password === 'string' && req.file 
    && ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(fileType)) {

      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {

        // Usuń plik, jeśli użytkownik o danym loginie już istnieje
        fs.unlinkSync(req.file.path);
        return res.status(409).send({ message: 'User with this login already exists' });
      }
      // Tworzenie nowego użytkownika

      const user = await User.create({ 
        login, 
        password: await bcrypt.hash(password, 10), 
        phone,
        avatar: req.file.filename 
      });

      res.status(201).send({ message: 'User created' + user.login });
    } else {
      // Usuń plik, jeśli wystąpił błąd związany z żądaniem

      if (req.file) {

        fs.unlinkSync(req.file.path);
      }
      res.status(400).send({ message: 'Bad request' });
    }
  } 
    catch (err){

    // Usuń plik, jeśli wystąpił błąd podczas przetwarzania
    if (req.file) {

      fs.unlinkSync(req.file.path);
    }
    res.status(500).send({ message: err.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    console.log(req.body)

    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: 'Login or password are incorect!' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.login = user.login;
          res.status(200).send({ message: 'Login successful' });
        }
        else {
          res.status(400).send({ message: 'Login or password are incorect!' });
        } 
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.getUser = async (req, res) => {
  const { login } = req.body;
  res.send('Yeah! I\'m logged' + login);
}

exports.userLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during session destruction:', err);
      res.status(500).send({ error: 'Error during logout' });
    } else {
      res.status(204).send({ message: 'Successfully logged out!' });
    }
  });
};