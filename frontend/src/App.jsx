import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import AddProductForm from './AddProductForm.jsx';
import Announcement from './components/Announcement.jsx';
import Profile from './Profile.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Announcement />
      <div>
        <ToastContainer />
      </div>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hardware' element={'<h1>Helloo</h1>'}/>
        <Route path='/paints' element={<h1>paints</h1>}/>
        <Route path='/addProduct' element={<AddProductForm />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </Router>
  )
}

export default App
