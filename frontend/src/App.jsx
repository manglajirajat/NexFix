import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import AddProductForm from './AddProductForm.jsx';
import Announcement from './components/Announcement.jsx';

function App() {
  return (
    <Router>
      <Announcement />
      <NavBar />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hardware' element={'<h1>Helloo</h1>'}/>
        <Route path='/paints' element={<h1>paints</h1>}/>
        <Route path='/addProduct' element={<AddProductForm />}/>
      </Routes>
    </Router>
  )
}

export default App
