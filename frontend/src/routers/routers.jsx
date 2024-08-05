import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "../pages/ProductList/ProductList";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Home from "../pages/Home/Home";
import Cate_Product from "../pages/ProductList/Cate_Product";
import Signin from "../pages/Signin/index";
import SignUp from "../pages/SignUp";
import Cart from "../pages/Cart/Cart";
import QLProducts from "../admin/QLProducts";
import UpdateProduct from "../admin/FormUpdate/UpdateProduct";
import CreateProduct from "../admin/FormCreate/CreateProduct";
import Checkout from "../pages/Checkout/Checkout";
import { OrderDetail } from "../pages/OrderDetail/OrderDetail";
import QLDH from "../admin/QLDH";



const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/productList" element={<ProductList/>}></Route>
    <Route path="/productdetail/:productId" element={<ProductDetail />} />
    <Route path="/categories/:categoryId" element={<Cate_Product/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/qlproducts" element={<QLProducts/>}></Route>
    <Route path="/qldh" element={<QLDH/>}></Route>
    <Route path="/cart/:cartId" element={<Cart />} />
    <Route path="/updatepro/:productId" element={<UpdateProduct/>}/>
    <Route path="/createPro" element={<CreateProduct/>}></Route>
    <Route path="/checkout" element={<Checkout/>}></Route>
    <Route path="/orderdetail/:userId" element={<OrderDetail/>}></Route>
  </Routes>
}
 


export default Routers;
