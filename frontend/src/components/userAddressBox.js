import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AddressBox({ address, fetchData }) {
    const handleDeleteAddress = () => {
      const apiUrl = `http://127.0.0.1:8000/api/address/?profileid=${address.profileid}`;
  
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
          console.log("Deleted product successfully!");
          fetchData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  
    return (
      <Grid container spacing={2} sx={{ width: "80%", marginBottom: "15px" }}>
        <Grid item xs={9}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "20px",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
                  variant="body1"
                  style={{ marginBottom: "8px" }}
                > <strong>Address: </strong>
                  {address.street},{" "}
                  {address.city},{" "}
                  {address.state},{" "}
                  {address.pincode}
                </Typography>
                <Typography variant="body1">
                <strong>Mobile No.: </strong>
                  {address.phone}
                </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} container justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteAddress}
          >
            Delete Address
          </Button>
        </Grid>
      </Grid>
    );
  }
  