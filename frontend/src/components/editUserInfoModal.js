import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

export default function ChangeUserInfo({open, onClose, userData}) {
    const [formData, setFormData] = useState({
        id : userData.id,
        first_name : userData.first_name,
        last_name : userData.last_name,
        username : userData.username,
      });
    
      const onFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
    
      const handleSubmit = () => {
        fetch(`http://127.0.0.1:8000/api/edit/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (response.status === 200) {
              setFormData({
                ...formData,
                superuser: false
              });
              localStorage.setItem('userData', JSON.stringify({...formData, superuser:userData.superuser}));
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.message);
            onClose();
          })
          .catch((error) => {
            console.error("Error:", error);
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
                    name="username"
                    value={formData.username }
                    onChange={onFormChange}
                    type="text"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
              <TextField
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={onFormChange}
                    type="text"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name }
                    type="text"
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