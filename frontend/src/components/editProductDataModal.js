import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EditProduct({open, onClose, product}) {
  const userData = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productid : product.productid,
    name:product.name,
    price:product.price,
    description:product.description,
    category:product.category,
    sub_category:product.sub_category,
    brand:product.brand,
  });

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = () => {

    if(userData) {
      setFormData({
        ...userData,
        userid: userData.id
      })  
    }

    fetch(`http://127.0.0.1:8000/products/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log("Product has been edited successfully!!");
        onClose();
        navigate('/');
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <form>
          <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={onFormChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Price"
                name="price"
                value={formData.price }
                onChange={onFormChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description }
                onChange={onFormChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Category"
                name="category"
                value={formData.category }
                onChange={onFormChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Sub Category"
                name="sub_category"
                value={formData.sub_category }
                onChange={onFormChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Brand"
                name="brand"
                value={formData.brand }
                onChange={onFormChange}
                fullWidth
                sx={{ mb: 2 }}
              />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
