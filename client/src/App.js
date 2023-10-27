import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';
import { Container } from "react-bootstrap";

import Header from './components/vievs/Header/Header';
import Footer from './components/vievs/Footer/Footer';

import Home from './components/pages/Home/Home';
import AdsAll from './components/pages/AdsAll/AdsAll';
import AdsAdd from './components/pages/AdsAdd/AdsAdd';
import AdsEdit from './components/pages/AdsEdit/AdsEdit';
import AdsRemove from './components/pages/AdsRemove/AdsRemove';
import Search from './components/pages/Search/Search';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import NotFound from './components/pages/NotFound/NotFound';
import Profile from './components/pages/Profile/Profile';




function App() {
  return (
    <div>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ads/:id' element={<AdsAll />} />
          <Route path='/ads/add' element={<AdsAdd/>} />
          <Route path='/ads/edit/:id' element={<AdsEdit />} />
          <Route path='/ads/remove/:id' element={<AdsRemove />} />
          <Route path='/search/:searchPhrase' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
