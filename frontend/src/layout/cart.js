import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Navbar from "../components/navbar";
import CartProduct from "../components/cartProductDisplay";

export default function Cart() {
  // State Variables

  const [cartProductData, setCartProductData] = useState([]);
  const [userAddressData, setUserAddressData] = useState([]);
  const [userSelectedAddress, setUserSelectedAddress] = useState(0);
  const user = JSON.parse(localStorage.getItem("userData"));
  const [cartEmpty, setCartEmpty] = useState(true);

  // Fetching Cart Products

  const fetchCartData = () => {
    const url = `http://127.0.0.1:8000/cart/?userid=${user.id}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartProductData(data.cart);
        if (data.cart.length > 0) {
          setCartEmpty(false);
        } else {
          setCartEmpty(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Fetching User Address

  const fetchAddressData = () => {
    const url = `http://127.0.0.1:8000/api/address/?userid=${user.id}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserAddressData(data.addresses);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchCartData();
    fetchAddressData();
  }, []);

  // Cofirm Order Button Handler

  const handleConfirmOrder = () => {
    const orderData = {
      userid: user.id,
      profileid: userSelectedAddress,
    };

    fetch("http://127.0.0.1:8000/order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Ordered successfully");
          fetchCartData();
        } else {
          console.error("Failed to order");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const subtotal = cartProductData.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  const handleSelectAddress = (event) => {
    setUserSelectedAddress(event.target.value);
  };

  const handleEmptyCart = () => {
    fetch(`http://127.0.0.1:8000/cart/deleteall/?userid=${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        fetchCartData();
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error:", error); 
      });
  };

  return (
    <div style={{ backgroundColor: "lightgray", minHeight: "100vh" }}>
      <Navbar userData={user} />
      {!cartEmpty ? (
        <Grid container>
          {/* Cart Product Data Listing */}
          <Grid
            item
            xs={12}
            sm={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" style={{ margin: "16px" }}>
                Shopping Cart
              </Typography>
              {cartProductData.map((product) => (
                <CartProduct
                  key={product.cartid}
                  product={product}
                  fetchCartData={fetchCartData}
                />
              ))}
            </div>
            <Button
              onClick={handleEmptyCart}
              style={{
                backgroundColor: "red",
                color: "white",
                width: "200px",
                margin: "auto",
                marginTop: "20px",
              }}
            >
              <Typography variant="h6">Empty Cart</Typography>
            </Button>
          </Grid>

          {/* Shipping Address and Order Summary */}
          <Grid item xs={12} sm={5}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h4"
                style={{ margin: "16px", textAlign: "center", width: "80%" }}
              >
                Order Summary
              </Typography>

              <Paper
                style={{
                  backgroundColor: "white",
                  padding: "16px",
                  width: "80%",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", marginBottom: "16px" }}
                >
                  Shipping Address
                </Typography>
                <RadioGroup
                  value={userSelectedAddress}
                  onChange={handleSelectAddress}
                >
                  {userAddressData.map((address) => (
                    <FormControlLabel
                      key={address.profileid}
                      value={address.profileid}
                      control={<Radio color="success" />}
                      sx={{ marginBottom: "20px", justifyContent: "center" }}
                      label={
                        <div>
                          <Typography
                            variant="body1"
                            style={{ marginBottom: "8px" }}
                          >
                            {address.street}, {address.city}, {address.state},{" "}
                            {address.pincode}.
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ marginBottom: "8px" }}
                          >
                            <strong>Mobile No.</strong>: {address.phone}
                          </Typography>
                        </div>
                      }
                    />
                  ))}
                </RadioGroup>
              </Paper>

              {/* Order Details Code */}

              <Paper
                style={{
                  backgroundColor: "white",
                  padding: "16px",
                  width: "80%",
                  marginTop: "16px",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", marginBottom: "16px" }}
                >
                  Order Details
                </Typography>
                {cartProductData.map((product) => (
                  <Box
                    key={product.cartid}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom="8px"
                  >
                    <Typography variant="body1">
                      {product.name} (Quantity: {product.quantity})
                    </Typography>
                    <Typography variant="body1">
                      Rs. {product.quantity * product.price}
                    </Typography>
                  </Box>
                ))}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="16px"
                >
                  <Typography variant="body1" fontWeight="bold">
                    Subtotal:
                  </Typography>
                  <Typography variant="body1">Rs. {subtotal}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleConfirmOrder}
                  style={{
                    backgroundColor: "lightgreen",
                    color: "black",
                    marginTop: "20px",
                  }}
                >
                  Confirm Order
                </Button>
              </Paper>
            </div>
          </Grid>
        </Grid>
      ) : (
        // If the cart is empty
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            minHeight: "90vh",
          }}
        >
          <img
            src={`/utils/emptycart.jpg`}
            alt="Cart Empty"
            style={{ width: "60%", height: "90vh" }}
          />
        </div>
      )}
    </div>
  );
}
