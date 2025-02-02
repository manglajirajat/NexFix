import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//navbar imports
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import NavigationMenu from "./components/NavigationMenu.jsx";
import SecondHeader from "./components/SecondHeader.jsx";

//form imports
import AddProductForm from "./components/AddProductForm.jsx";

//pages import
import HardwarePage from "./components/pages/HardwarePage.jsx";
import HandToolPage from "./components/pages/HandToolPage.jsx";

export default function App() {
  return (
    <Router>
      <AnnouncementBar />
      <SecondHeader />
      <NavigationMenu />
      <Routes>
        <Route path="/" element={"ye le"} />
        <Route path="/addProduct" element={<AddProductForm />} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route path="/hardware/hand-tools" element={<HandToolPage />} /> 
      </Routes>
    </Router>
  );
}