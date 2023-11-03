import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

export default function ChangePassword({open, onClose}) {
    const [formData, setFormData] = useState({
        newpass : "",
        confirmnewpass : "",
        email : "",
      });
    
      const onFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
    
      const handleSubmit = () => {
        if (formData.newpass !== formData.confirmnewpass) {
            console.log("Passwords are not same!");
            return ;
        }
    
        fetch(`http://127.0.0.1:8000/api/changepass/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
            onClose();
          });
      };
    
      return (
        <div>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
              <form>
              <TextField
                    label="Email"
                    name="email"
                    value={formData.email }
                    onChange={onFormChange}
                    type="password"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
              <TextField
                    label="New Password"
                    name="newpass"
                    value={formData.newpass}
                    onChange={onFormChange}
                    type="password"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Confirm New Password"
                    name="confirmnewpass"
                    value={formData.confirmnewpass }
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