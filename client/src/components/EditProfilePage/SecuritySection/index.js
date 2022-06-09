import { Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { SecurityContainer, SecurityWrapper } from "./SecuritySectionElements";
import { AuthAPI, UserAPI } from "api";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";
import { containedButtonStyle, textFieldStyle } from "styles/muiCustom";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const dispatch = useDispatch();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setError(initialError);
    setPassword({ ...password, [name]: value });
  };
  const handleSubmit = async () => {
    setLoading(true);
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
    setLoading(false);
  };
  return (
    <SecurityContainer>
      <SecurityWrapper>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Stack spacing={0.2}>
              <Typography variant="subtitle2" component="div">
                Current password
              </Typography>
              <TextField
                sx={textFieldStyle}
                error={error.password}
                name="password"
                onChange={handleChangeValue}
                type="password"
                size="small"
                value={password.password}
                helperText={error.password ? "Incorrect Password" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="bx:lock-alt" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.2}>
              <Typography variant="subtitle2" component="div">
                New password
              </Typography>
              <TextField
                sx={textFieldStyle}
                error={error.newPassword}
                name="newPassword"
                onChange={handleChangeValue}
                type="password"
                value={password.newPassword}
                size="small"
                helperText={error.newPassword ? "Password at least 6 letters" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="bx:lock-alt" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12} justifyContent="center">
            <LoadingButton
              sx={{ ...containedButtonStyle, textTransform: "unset" }}
              loading={loading}
              disabled={!password.password || !password.newPassword ? true : false}
              onClick={handleSubmit}
              variant="contained"
              fullWidth
            >
              Change Password
            </LoadingButton>
          </Grid>
        </Grid>
      </SecurityWrapper>
    </SecurityContainer>
  );
}
