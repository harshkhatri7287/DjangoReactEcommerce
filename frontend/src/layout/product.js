// IMPORTS

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Button, Typography, Container, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import SignInDialog from "../components/signInDialog";
import EditProduct from "../components/editProductDataModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Single product view

export default function ProductView() {
  // Product Data From Home Page
  const location = useLocation();
  const product = location.state.product;
  const user = JSON.parse(localStorage.getItem("userData"));
  const [quantity, setQuantity] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);

  const buttonStyle = {
    padding: "12px",
    marginBottom: "8px",
    color: "black",
  };

  // Add to Cart Button Handler

  const handleAddToCart = () => {
    if (!user) {
      setOpenDialog(true);
      return;
    }

    const cartData = {
      user: user.id,
      product: product.productid,
      quantity: quantity,
    };

    fetch("http://127.0.0.1:8000/cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Product added to cart successfully");
          navigate("/cart");
        } else {
          console.error("Failed to add product to cart");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const productImageURL = `/media/products/${product.productid}.jpeg`;
  const defaultImageURL = "/media/products/default.jpg";

  const handleEditProduct = () => {
      setEditModal(true);
  }

  const handleDeleteProduct = () => {
    fetch(`http://127.0.0.1:8000/products/?productid=${product.productid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 204) {
        console.log("Product deleted successfully");
        navigate('/');
      } else {
        console.error("Failed to delete product");
      }
    });
  }

  return (
    <>
      {/* Open a Dialog if user is not logged in */}
      {openDialog ? (
        <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      ) : (
        <div>
          <Navbar userData={user} />
          <Container>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              height={"90vh"}
            >
              {/* Grid for Product Image */}
              <Grid item xs={12} sm={6}>
                <img
                  src={productImageURL}
                  onError={(e) => {
                    e.target.src = defaultImageURL;
                  }}
                  alt="Product"
                  style={{ width: "80%", height: "auto" }}
                />
              </Grid>
              {/* Grid for Product Details and Add to Cart Button */}
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  padding: "16px",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h4">{product.name}</Typography>
                <Typography
                  variant="h6"
                  style={{ fontSize: "1.5rem", marginBottom: "16px" }}
                >
                  Rs. {product.price}.00
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "16px" }}>
                  {product.description}
                </Typography>
                <TextField
                  label="Quantity"
                  type="number"
                  variant="filled"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  style={{ marginBottom: "16px" }}
                />
                <div>
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ ...buttonStyle, backgroundColor: "lightblue" }}
                    onClick={() => {
                      handleAddToCart();
                    }}
                  >
                    <AddShoppingCartIcon style={{ marginRight: "8px" }} /> Add
                    to Cart
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ ...buttonStyle, backgroundColor: "lightgreen" }}
                  >
                    <ShoppingBagIcon style={{ marginRight: "8px" }} /> Buy Now
                  </Button>
                  {user && user.superuser && (
                    <div>
                      <Button
                        variant="contained"
                        fullWidth
                        style={{ ...buttonStyle, backgroundColor: "white", color: "black" }}
                        onClick={() => {
                          handleEditProduct();
                        }}
                      >
                       {" "}
                        <EditIcon style={{ marginRight: "8px" }}></EditIcon>
                        Edit Product
                      </Button>
                      <Button
                        variant="contained"
                        fullWidth
                        style={{ ...buttonStyle, backgroundColor: "white" , color: "black"}}
                        onClick={() => {
                          handleDeleteProduct();
                        }}
                      >
                        <DeleteIcon style={{ marginRight: "8px" }}></DeleteIcon> Delete Product
                      </Button>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
            <EditProduct
            open={editModal}
            onClose={() => setEditModal(false)}
            product={product}>
            </EditProduct>
          </Container>
        </div>
      )}
    </>
  );
}
