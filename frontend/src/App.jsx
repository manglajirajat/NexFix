<<<<<<< Updated upstream
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import AddProductForm from './AddProductForm.jsx';
import Announcement from './components/Announcement.jsx';
import Profile from './Profile.jsx';
import Hardware from './components/Hardware.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import NavigationMenu from "./components/NavigationMenu.jsx";
import HardwarePage from "./components/pages/HardwarePage.jsx";
import SecondHeader from "./components/SecondHeader.jsx";
import { Home } from "lucide-react";
// import About from "./routes/About";
// import Account from "./routes/Account";
// import Cart from "./routes/Cart";
// import Tracking from "./routes/Tracking";
// import Wishlist from "./routes/Wishlist";
// import SanitaryPage from "./components/pages/SanitaryPage";
// import HardwarePage from "./components/pages/HardwarePage";
// import PaintPage from "./components/pages/PaintPage";
// import PowerToolsPage from "./components/pages/PowerToolsPage";
>>>>>>> Stashed changes

export default function App() {
  return (
    <Router>
<<<<<<< Updated upstream
      <Announcement />
      <div>
        <ToastContainer />
      </div>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hardware' element={<Hardware />}/>
        <Route path='/paints' element={<h1>paints</h1>}/>
        <Route path='/addProduct' element={<AddProductForm />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route />
=======
      <AnnouncementBar />
      <SecondHeader />
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hardware" element={<HardwarePage />} />
        {/* <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/sanitary" element={<SanitaryPage />} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route path="/paint" element={<PaintPage />} />
        <Route path="/power-tools" element={<PowerToolsPage />} /> */}
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}