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

export default function App() {
  return (
    <Router>
      <AnnouncementBar />
      <SecondHeader />
      <NavigationMenu />
      <Routes>
        <Route path="/" element={"ye le"} />
        <Route path="/hardware" element={<HardwarePage />} />
        {/* <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/sanitary" element={<SanitaryPage />} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route path="/paint" element={<PaintPage />} />
        <Route path="/power-tools" element={<PowerToolsPage />} /> */}
      </Routes>
    </Router>
  );
}