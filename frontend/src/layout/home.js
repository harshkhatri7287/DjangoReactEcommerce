import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Slide from "../components/slide";
import Product from "../components/products";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [searched, setSearched] = useState("");

  // Get userData from the local Storage

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);


  return (
    <>
      <Navbar userData={userData} setSearched={setSearched}></Navbar>
      <Slide></Slide>
      <Product searched={searched}></Product>
    </>
  );
}
