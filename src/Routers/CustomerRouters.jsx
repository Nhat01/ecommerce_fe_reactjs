import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../customer/pages/HomePage/HomePage";
import Cart from "../customer/components/Cart/Cart";
import Navigation from "../customer/components/Navigation/Navigation";
import Footer from "../customer/components/Footer/Footer";
import Product from "../customer/components/Product/Product";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import ProductCard from "../customer/components/Product/ProductCard";
import Checkout from "../customer/components/Checkout/Checkout";
import Order from "../customer/components/Order/Order";
import OrderDetails from "../customer/components/Order/OrderDetails";
import PaymentSuccess from "../customer/components/Payment/PaymentSuccess";
import { useSelector } from "react-redux";
import LoginPage from "../customer/pages/LoginPage/LoginPage";
import RegisterPage from "../customer/pages/RegisterPage/RegisterPage";
import ProductSearch from "../customer/components/Product/ProductSearch";

const CustomerRouters = () => {
   const { user } = useSelector((store) => store.auth);
   const jwtLocal = localStorage.getItem("jwt");
   return (
      <div>
         <div className="h-16">
            <Navigation />
         </div>
         <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route
               path="/cart"
               element={jwtLocal ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
               path="/:levelOne/:levelTwo/:levelThree"
               element={<Product />}
            ></Route>
            <Route path="/search" element={<ProductSearch />}></Route>
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route
               path="/checkout"
               element={jwtLocal ? <Checkout /> : <Navigate to="/login" />}
            />
            <Route
               path="/account/order"
               element={jwtLocal ? <Order /> : <Navigate to="/login" />}
            ></Route>
            <Route
               path="/account/order/:orderId"
               element={jwtLocal ? <OrderDetails /> : <Navigate to="/login" />}
            ></Route>
            <Route
               path="/payment/:orderId"
               element={
                  jwtLocal ? <PaymentSuccess /> : <Navigate to="/login" />
               }
            ></Route>
         </Routes>
         <div>
            <Footer />
         </div>
      </div>
   );
};

export default CustomerRouters;
