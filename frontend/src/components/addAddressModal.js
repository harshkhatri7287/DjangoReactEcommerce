import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

export default function AddAddress({userData, open, onClose, fetchData}) {
  const [formData, setFormData] = useState({
    user: userData.id,
    phone:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
  });

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = () => {

    fetch(`http://127.0.0.1:8000/api/address/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchData();
        onClose();
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Address</DialogTitle>
        <DialogContent>
          <form>
          <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={onFormChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Pincode"
                name="pincode"
                value={formData.pincode }
                onChange={onFormChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Street"
                name="street"
                value={formData.street }
                onChange={onFormChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="City"
                name="city"
                value={formData.city }
                onChange={onFormChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="State"
                name="state"
                value={formData.state }
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
