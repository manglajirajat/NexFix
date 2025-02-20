import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Navbar imports
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import NavigationMenu from "./components/NavigationMenu.jsx";
import SecondaryHeader from "./components/SecondaryHeader.jsx"
import MainHeader from "./components/MainHeader.jsx";

// Form imports
import AddProductForm from "./components/AddProductForm.jsx";

// My account
import Login from "./components/LogIn.jsx";
import CreateAccount from "./components/CreateAccount.jsx";
import AddAddressForm from "./components/AddAddressForm.jsx";

// Pages import
import HomePage from "./components/pages/HomePage.jsx"
import ProductList from "./components/pages/ProductList.jsx";
import Product from "./components/pages/Product.jsx";
import MyCart from "./components/pages/MyCart.jsx";
import CheckOut from "./components/pages/CheckOut.jsx";
import MyOrders from "./components/MyOrders.jsx";

// footer import
import { Footer } from "./components/Footer.jsx";

export default function App() {
  
  return (
    <Router>
      <AnnouncementBar /> {/*Sales Announcement at Top*/}
      <SecondaryHeader /> {/*About Us,Wishlisht, Order Tracking Bar*/}
      <MainHeader />      {/*Logo,Lcation, Search, Login,Cart Bar*/}
      <NavigationMenu />  {/*Navbar*/}

      <ToastContainer  autoClose={2000} position="top-center" pauseOnFocusLoss={false} pauseOnHover={false}/>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addProduct" element={<AddProductForm />} />

        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/account" element={<Login />} />
        <Route path="/addAddress" element={<AddAddressForm />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/tracking" element={<MyOrders />} />

        <Route path="/:category" element={<ProductList />} />
        <Route path="/:category/:subCategory" element={<ProductList />} />
        <Route path="/contact" element={"hii"} />
        <Route path="/contact/customer-support" element={"ram ram"} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/checkout/:cartId" element={<CheckOut />} />
      </Routes>

      <Footer />
    </Router>
  );
}
