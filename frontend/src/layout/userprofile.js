import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Grid, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserImage from "../images/user.jpg";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../components/navbar";
import AddAddress from "../components/addAddressModal";
import SignInDialog from "../components/signInDialog";
import AddressBox from "../components/userAddressBox";
import OrderBox from "../components/userOrderBox";
import EditIcon from "@mui/icons-material/Edit";
import ChangeUserInfo from "../components/editUserInfoModal";

export default function Profile() {
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState([]);
  const [accountToggle, setAccountToggle] = useState(true);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [addAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editUserInfoModal, setEditUserInfoModal] = useState(false);

  // Fetching Address related to User

  const fetchData = () => {
    if (userData) {
      fetch(`http://127.0.0.1:8000/api/address/?userid=${userData.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 404) {
            return null;
          } else if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch profile data");
          }
        })
        .then((data) => {
          if (data !== null) {
            setAddressData(data.addresses);
          }
        })
        .catch((error) => {
          console.error(
            "An error occurred while fetching profile data:",
            error
          );
        });
    }
  };

  // Checking if the user is logged in or not

  const checkUser = (userData) => {
    if (!userData) {
      setOpenDialog(true);
    }
  };

  useEffect(() => {
    fetchData();
    checkUser(userData);
  }, []);

  // Logout Handler

  function LogOut() {
    localStorage.removeItem("userData");
    navigate("/");
  }

  const buttonStyle = {
    width: "80%",
    height: "50px",
    justifyContent: "center",
    backgroundColor: "lightgreen",
    color: "black",
    marginBottom: "10px",
  };

  // Fetching User's order history

  const fetchOrderHistory = () => {
    if (userData) {
      fetch(`http://127.0.0.1:8000/order/?userid=${userData.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 404) {
            return null;
          } else if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch profile data");
          }
        })
        .then((data) => {
          if (data !== null) {
            setOrderHistoryData(data.orders);
          }
        })
        .catch((error) => {
          console.error(
            "An error occurred while fetching profile data:",
            error
          );
        });
    }
  };

  // Orders/Account toggle

  const handleOrderHistory = () => {
    setAccountToggle(false);
    fetchOrderHistory();
  };

  const handleAccountToggle = () => {
    setAccountToggle(true);
  };

  const handleAddAddress = () => {
    setAddAddressModalOpen(true);
  };

  const handleEdit = () => {
    setEditUserInfoModal(true);
  }

  const userInfoStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "80%",
    margin: "20px",
    padding: "10px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
    height: "100px",
    justifyContent: "center",
  };

  return (
    <>
      {openDialog ? (
        <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      ) : (
        <>
          <Navbar userData={userData}></Navbar>
          <Container sx={{ marginTop: "20px", width: "80%" }}>
            <Typography
              variant="h4"
              component="h4"
              sx={{
                textAlign: "center",
                backgroundColor: "lightgreen",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              User Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  <img src={UserImage} alt="User" style={{ width: "80%" }} />
                  <Button
                    variant="contained"
                    color="secondary"
                    style={buttonStyle}
                    onClick={handleAccountToggle}
                  >
                    Account
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={buttonStyle}
                    onClick={handleOrderHistory}
                  >
                    Order History
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={LogOut}
                    style={buttonStyle}
                  >
                    Log Out
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={9}>
                {accountToggle ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid container sx={{ width: "80%" }}>
                      <Grid item xs={6}>
                        <Box sx={{...userInfoStyle, position: "relative" }}>
                          <IconButton
                            sx={{ position: "absolute", top: 0, right: 0 }}
                            color="primary"
                            onClick={handleEdit}
                          >
                            <EditIcon />
                          </IconButton>
                          <Typography marginBottom="5px">
                            {" "}
                            <strong>First Name: </strong>
                            {userData.first_name}
                          </Typography>
                          <Typography marginBottom="5px">
                            {" "}
                            <strong>Last Name: </strong> {userData.last_name}
                          </Typography>
                          <Typography marginBottom="5px">
                            {" "}
                            <strong>Email:</strong> {userData.username}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box onClick={handleAddAddress} sx={userInfoStyle}>
                          <AddIcon fontSize="large" />
                          <Typography
                            variant="h5"
                            component="h5"
                            sx={{ textAlign: "center" }}
                          >
                            ADD ADDRESS
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    {addressData
                      ? addressData.map((address) => (
                          <AddressBox
                            key={address.profileid}
                            address={address}
                            fetchData={fetchData}
                          ></AddressBox>
                        ))
                      : null}
                  </Box>
                ) : (
                  <div>
                    {orderHistoryData.map((order) => {
                      return <OrderBox order={order}></OrderBox>;
                    })}
                  </div>
                )}
              </Grid>
            </Grid>
            <AddAddress
              open={addAddressModalOpen}
              onClose={() => setAddAddressModalOpen(false)}
              userData={userData}
              fetchData={fetchData}
            />
            <ChangeUserInfo
              open={editUserInfoModal}
              onClose={() => setEditUserInfoModal(false)}
              userData={userData}
              />
          </Container>
        </>
      )}
    </>
  );
}
