import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleProductDetailClick = () => {
    navigate("/products", { state: { product } });
  };

  const cardStyle = {
    width: "22%",
    height: "350px",
    margin: "15px",
  };

  const priceStyle = {
    marginTop: "8px",
  };

  const productImageURL = `/media/products/${product.productid}.jpeg`;
  const defaultImageURL = "/media/products/default.jpg";

  return (
    <Card style={cardStyle}>
      <CardActionArea onClick={handleProductDetailClick}>
        <div style={{ textAlign: "center" }}>
          <img
            src={productImageURL}
            onError={(e) => {
              e.target.src = defaultImageURL;
            }}
            alt="Product"
            width="80%"
            height="250px"
            style={{ display: "block", margin: "0 auto" }}
          />
        </div>
        <CardContent style={{ backgroundColor: "lightgreen" }}>
          <Typography variant="h6" component="div" textAlign="center">
            {product.name}
          </Typography>
          <Typography variant="h6" textAlign="center" style={priceStyle}>
            Rs. {product.price}.00
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
