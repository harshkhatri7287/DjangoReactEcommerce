import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function OrderBox({order}) {
    return (
        <div
          key={order.orderid}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>Order Date: {order.order_date}</h3>
          <h3>Address:</h3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <Paper
                style={{
                  width: "100%",
                  padding: "16px",
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="body1"
                  style={{ marginBottom: "8px" }}
                >   
                    <strong>Address: </strong>
                  {order.user_address.street},{" "}
                  {order.user_address.city},{" "}
                  {order.user_address.state},{" "}
                  {order.user_address.pincode}
                </Typography>
                <Typography variant="body1">
                <strong>Mobile No.: </strong>
                  {order.user_address.phone}
                </Typography>
              </Paper>
            </div>
          </Box>
          <h3>Products:</h3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {order.products.map((product) => {
              const productImageURL = `/media/products/${product.productid}.jpeg`;
              const defaultImageURL = "/media/products/default.jpg";
              return (
              <Paper
                key={product.productid}
                style={{
                  width: "80%",
                  padding: "16px",
                  backgroundColor: "white",
                  marginBottom: "16px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <img
                      src={productImageURL}
                      onError={(e) => { e.target.src = defaultImageURL; }}
                      alt="Product"
                      style={{ width: "auto", height: "150px" }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="h5"
                      style={{
                        marginBottom: "8px",
                        color: "black",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ marginBottom: "8px", color: "#333" }}
                    >
                      Price: Rs. {product.price}.00
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ marginBottom: "8px", color: "#333" }}
                    >
                      Quantity: {product.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            )})}
          </Box>
          
        </div>
      );
}