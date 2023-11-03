import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./changePasswordModal";
import { Snackbar, Alert } from "@mui/material";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {"Copyright © HKart "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");


  const handleErrorSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackbar(false);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError("");

    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("userData", JSON.stringify(data.user));
        navigate("/");
      })
      .catch((error) => {
        setOpenErrorSnackbar(true);
        setSnackbarMessage("User not found or invalid credentials.");
        // console.error("Error during login:", error);
      });
  };

  // Chnage Password Modal

  const handleChangePassword = () => {
    setChangePasswordModal(true);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "0px",
      }}
    >
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert severity="error" onClose={handleErrorSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          border: "2px solid black",
          borderRadius: "10px",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <Typography variant="body2" color="error">
                    Not an email.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Button onClick={handleChangePassword}>Forgot Password</Button>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
      <ChangePassword
        open={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
      ></ChangePassword>
    </Container>
  );
}
