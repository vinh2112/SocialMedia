import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { Item, SecurityContainer, SecurityWrapper } from "./SecuritySectionElements";
import { AuthAPI, UserAPI } from "api";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";

const initialState = {
  password: "",
  newPassword: "",
};

const initialError = {
  password: false,
  newPassword: false,
};

export default function SecuritySection() {
  const [password, setPassword] = useState(initialState);
  const [error, setError] = useState(initialError);
  const dispatch = useDispatch();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setError(initialError);
    setPassword({ ...password, [name]: value });
  };
  const handleSubmit = async () => {
    const newError = {
      password: false,
      newPassword: false,
    };
    const isCorrectPassword = await AuthAPI.checkPassword({ password: password.password });

    if (!isCorrectPassword.data) {
      newError.password = true;
    }

    if (password.newPassword.length < 6) {
      newError.newPassword = true;
    }
    setError(newError);
    if (!newError.password && !newError.newPassword) {
      const res = await UserAPI.updateUser({ password: password.newPassword });
      if (res.status === 200) {
        dispatch(
          actions.toast.showToast({
            message: "Changed password",
            type: "success",
          })
        );
      }
    }
  };
  return (
    <SecurityContainer>
      <SecurityWrapper>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Item>
              <TextField
                error={error.password}
                name="password"
                onChange={handleChangeValue}
                type="password"
                label="Password"
                style={{ width: "300px" }}
                size="small"
                value={password.password}
                helperText={`${error.password ? "Incorrect Password" : ""}`}
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <TextField
                error={error.newPassword}
                name="newPassword"
                onChange={handleChangeValue}
                type="password"
                label="New password"
                value={password.newPassword}
                style={{ width: "300px" }}
                size="small"
                helperText={`${error.newPassword ? "Password at least 6 letters" : ""}`}
              />
            </Item>
          </Grid>
          <Grid item xs={12} justifyContent="center">
            <Item>
              <Button
                disabled={!password.password || !password.newPassword ? true : false}
                onClick={handleSubmit}
                style={{ width: "300px" }}
                variant="contained"
              >
                Change
              </Button>
            </Item>
          </Grid>
        </Grid>
      </SecurityWrapper>
    </SecurityContainer>
  );
}
