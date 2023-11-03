import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel, Container } from "@mui/material";
import SignUp from "../components/signup";
import Login from "../components/login";

export default function LoginPage() {
  const [register, setRegister] = useState(false);

  const handleChange = (event) => {
    setRegister(event.target.value === "signup");
  };

  return (
    <Container sx={{marginTop:'4rem'}}>
      <RadioGroup
        sx={{ justifyContent: 'center', marginBottom:'20px' }}
        name="authentication"
        value={register ? "signup" : "login"}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value="login"
          control={<Radio />}
          label="Login"
          labelPlacement="end"
        />
        <FormControlLabel
          value="signup"
          control={<Radio />}
          label="Signup"
          labelPlacement="end"
        />
      </RadioGroup>

      {register ? <SignUp /> : <Login />}
    </Container>
  );
}
