import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './layout/home';
import LoginPage from './layout/loginpage';
import Profile from './layout/userprofile';
import ProductView from './layout/product';
import Cart from './layout/cart';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='profile' element={<Profile />} />
        <Route path='products' element={<ProductView />} />
        <Route path='cart' element={<Cart />} />
      </Routes>
    </Router>
  );
}
