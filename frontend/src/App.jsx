import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Navbar imports
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import NavigationMenu from "./components/NavigationMenu.jsx";
import SecondaryHeader from "./components/SecondaryHeader.jsx"
import MainHeader from "./components/MainHeader.jsx";

// Form imports
import AddProductForm from "./components/forms/AddProductForm.jsx";

// My account
import Login from "./components/LogIn.jsx";
import CreateAccount from "./components/forms/CreateAccount.jsx";
import AddAddressForm from "./components/forms/AddAddressForm.jsx";
import UpdateAddress from "./components/forms/UpdateAddress.jsx";
import ForgotPassword from "./components/forms/ForgotPassword.jsx";

// Pages import
import HomePage from "./components/pages/HomePage.jsx"
import ProductList from "./components/pages/ProductList.jsx";
import Product from "./components/pages/Product.jsx";
import MyCart from "./components/pages/MyCart.jsx";
import MyOrders from "./components/pages/MyOrders.jsx";

// footer import
import { Footer } from "./components/Footer.jsx";

export default function App() {
  
  return (
    <Router>
      <ToastContainer  autoClose={2000} position="top-center" pauseOnFocusLoss={false} pauseOnHover={false}/>

      <AnnouncementBar /> 
      <SecondaryHeader />
      <MainHeader />      
      <NavigationMenu />  

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addProduct" element={<AddProductForm />} />

        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/changePassword" element={<ForgotPassword />} />
        <Route path="/account" element={<Login />} />
        <Route path="/addAddress" element={<AddAddressForm />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/tracking" element={<MyOrders />} />
        <Route path="/updateAddress/:addressId" element={<UpdateAddress />} />

        <Route path="/:category" element={<ProductList />} />
        <Route path="/:category/:subCategory" element={<ProductList />} />
        <Route path="/contact" element={"hii"} />
        <Route path="/contact/customer-support" element={"ram ram"} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>

      <Footer />
    </Router>
  );
}
