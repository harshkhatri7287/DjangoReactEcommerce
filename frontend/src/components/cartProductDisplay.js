import React, { useState } from 'react';
import { Paper, Grid, Typography, Box, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Cart from '../layout/cart';

export default function CartProduct({product, fetchCartData}) {
    const [quantity, setQuantity] = useState(product.quantity);
  
    const handleIncreaseQuantity = () => {
      setQuantity(quantity + 1);
    };
  
    const handleDecreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    // Update Product Quantity in Cart

    const finalizeProductQuantity = () => {
      const apiUrl = `http://127.0.0.1:8000/cart/?cartid=${product.cartid}&quantity=${quantity}`;
  
      fetch(apiUrl, {
        method: "PUT",
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
          console.log(data.message);
          fetchCartData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  
     // Delete Product Quantity in Cart

    const handleDeleteProduct = () => {
      const apiUrl = `http://127.0.0.1:8000/cart/?cartid=${product.cartid}`;
  
      fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
        })
        .then(() => {
          console.log('Deleted product successfully!');
          fetchCartData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  
    const productImageURL = `/media/products/${product.productid}.jpeg`;
    const defaultImageURL = "/media/products/default.jpg";
  
    return (
      <Paper
        style={{ width: "80%", padding: "16px", backgroundColor: "#f7f7f7" , marginBottom:"20px"}}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              src={productImageURL}
              onError={(e) => { e.target.src = defaultImageURL; }}
              alt="Product"
              style={{ width: "200px", height: "200px" }}
            />
          </Grid>
          <Grid item xs={6} justifySelf={'center'}>
            <Typography
              variant="h5"
              style={{ marginBottom: "8px", color: "black" }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="h6"
              style={{ marginBottom: "8px", color: "#333" }}
            >
              Price: Rs. {product.price}.00
            </Typography>
            <Box display="flex" alignItems="center" marginTop="8px">
              <IconButton
                aria-label="decrease quantity"
                size="small"
                onClick={handleDecreaseQuantity}
                style={{
                  backgroundColor: "lightgreen",
                  marginRight: "10px",
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h5" style={{ marginRight: "10px" }}>
                {quantity}
              </Typography>
              <IconButton
                aria-label="increase quantity"
                size="small"
                onClick={handleIncreaseQuantity}
                style={{ backgroundColor: "lightgreen" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={finalizeProductQuantity}
              style={{
                backgroundColor: "lightgreen",
                color: "black",
                marginTop: "15px",
              }}
            >
              Finalize Product Quantity
            </Button>
          </Grid>
          <Grid item xs={2} alignItems={"center"} justifyContent={"center"}>
            <Button
              aria-label="delete"
              size="large"
              style={{ color: "red", marginTop: "16px" }}
              onClick={handleDeleteProduct}
            >
              <DeleteIcon fontSize="large" style={{ color: "red" }} />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };
  