const Ads = require('../models/ads.model');
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ads.find().populate());
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getAdsId = async (req, res) => {
  try {
    const dep = await Ads.findById(req.params.id);
    if (!dep) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(dep);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getFindOneAds = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;
    const ads = await Ads.find({ title: { $regex: searchPhrase, $options: 'i' } });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addAds = async (req, res) => {
  try {
    const { title, describe, datePublish, price, location, infoOfSeller } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    if (req.file.size > 1000000) {
      // Usuń plik, jeśli przekracza limit
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'File size exceeds the limit (1 MB)' });
    }

    const newAds = new Ads({
      title: title,
      describe: describe,
      datePublish: datePublish,
      photo: req.file.filename,
      price: price,
      location: location,
      infoOfSeller: infoOfSeller
    });

    console.log(newAds);
    
    await newAds.save();
    console.log('Ogłoszenie zapisane');
    res.json({ message: 'OK' });
  } catch (err) {
    // Usuń plik, jeśli coś poszło nie tak
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Błąd przy zapisie ogłoszenia:', err);
    res.status(500).json({ message: err.message });
  }
}

exports.updateAds = async (req, res) => {
  const { title, describe, datePublish, price, location, infoOfSeller } = req.body;
  try {
    const dep = await Ads.findById(req.params.id);
    if (dep) {
      console.log('Dokument znaleziony:', dep);
      // Sprawdź, czy jest nowy plik
      if (req.file) {
        if (req.file.size > 1000000) {
          // Usuń plik, jeśli przekracza limit
          fs.unlinkSync(req.file.path);
          return res.status(400).json({ message: 'File size exceeds the limit (1 MB)' });
        }
        // Usuń stary plik, jeśli istnieje
        if (dep.photo) {
          fs.unlinkSync(`public/uploads/${dep.photo}`);
        }
        // Zaktualizuj dokument z nowym plikiem
        await Ads.updateOne({ _id: req.params.id },
          {
            $set: {
              title: title,
              describe: describe,
              datePublish: datePublish,
              photo: req.file.filename,
              price: price,
              location: location,
              infoOfSeller: infoOfSeller
            }
          });
      } else {
        // Jeśli nie ma nowego pliku, zaktualizuj dokument bez zmiany pliku
        await Ads.updateOne({ _id: req.params.id },
          {
            $set: {
              title: title,
              describe: describe,
              datePublish: datePublish,
              price: price,
              location: location,
              infoOfSeller: infoOfSeller
            }
          });
      }
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    // Obsłuż błędy
    res.status(500).json({ message: err });
  }
}


exports.deleteAds = async (req, res) => {
  try {
    const dep = await Ads.findById(req.params.id);
    if (dep) {
      await Ads.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else
      res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}