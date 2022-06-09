import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import { GoogleLogin } from "react-google-login";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { checkBoxStyle, containedButtonStyle, outlinedButtonStyle, textFieldStyle } from "styles/muiCustom";
import { SignupContainer } from "./SignupElements";
import Google from "assets/images/google.png";
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";
import { UserAPI } from "api";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";

const errorInitial = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  repassword: "",
  avatar: "",
};

const SignupSection = () => {
  const clientId = "828741880621-pqvtk7ei98q91lno41bclfnkjhdsou4l.apps.googleusercontent.com";
  const [data, setData] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repassword: "",
    avatar: "",
  });
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(errorInitial);
  const [responseMessage, setResponseMessage] = React.useState("");
  const nodeRef = React.useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validateField = (e) => {
    const { name } = e.target;

    if (name === "email") {
      if (data.email) {
        if (
          !data.email.match(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          )
        ) {
          setErrors({ ...errors, email: "Email format is incorrect" });
        } else {
          setErrors({ ...errors, email: "" });
        }
      } else {
        setErrors({ ...errors, email: "Please enter your email" });
      }
    } else if (name === "password" || name === "repassword") {
      if (data.password) {
        if (data.password.length < 6) {
          setErrors({ ...errors, password: "Password must be at least 6 letters" });
        } else {
          setErrors({ ...errors, password: "" });
        }
      } else {
        setErrors({ ...errors, password: "Please enter your password" });
      }

      if (data.repassword) {
        if (data.repassword.length < 6) {
          setErrors({ ...errors, repassword: "Password must be at least 6 letters" });
        } else if (data.password !== data.repassword) {
          setErrors({ ...errors, repassword: "Confirmation password is not match" });
        } else {
          setErrors({ ...errors, repassword: "" });
        }
      } else {
        setErrors({ ...errors, repassword: "Please confirm your password" });
      }
    }
  };

  const handleShowPassword = (e) => {
    setIsShowPassword(e.target.checked);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const isValidated = Object.values(errors).every((value) => {
      if (value) {
        return false;
      }
      return true;
    });

    if (isValidated) {
      setLoading(true);

      const res = await UserAPI.register({
        email: data.email,
        password: data.password,
        name: [data.firstName, data.lastName].join(" ")
          ? [data.firstName, data.lastName].join("_").toLowerCase()
          : data.email.substr(0, data.email.indexOf("@")),
        fullName: [data.firstName, data.lastName].join(" ")
          ? [data.firstName, data.lastName].join(" ")
          : data.email.substr(0, data.email.indexOf("@")),
        avatar: DefaultAvatar,
      });

      if (res.status === 200) {
        history.push("/login");
        dispatch(
          actions.toast.showToast({
            message: "Register Successfully",
            type: "success",
          })
        );
      } else {
        setResponseMessage(res.response.data.msg);
      }
      setLoading(false);
    }
  };

  const onLoginSuccess = (res) => {
    if (res.profileObj) {
      dispatch(
        actions.login.loginRequest({
          idToken: res.tokenId,
        })
      );
      history.push("/");
    }
  };

  const onFailureSuccess = (res) => {
    console.log("Login Failed: ", res);
  };

  return (
    <SignupContainer>
      <Box className="signup__form">
        <Typography sx={{ mb: "16px" }} align="center" variant="h4">
          Sign up to Photoos
        </Typography>

        <GoogleLogin
          clientId={clientId}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              size="large"
              sx={{ ...outlinedButtonStyle, textTransform: "unset" }}
              fullWidth
              variant="outlined"
              startIcon={<img style={{ height: "24px" }} src={Google} alt="" />}
            >
              Sign up with Google
            </Button>
          )}
          onSuccess={onLoginSuccess}
          onFailure={onFailureSuccess}
          cookiePolicy={"single_host_origin"}
        />

        <Divider sx={{ margin: "20px 0" }}>or</Divider>

        {responseMessage && (
          <Typography sx={{ color: "red", mb: "8px" }} variant="body2">
            *{responseMessage}
          </Typography>
        )}

        <form
          onChange={handleValueChange}
          onSubmitCapture={() => nodeRef.current.focus()}
          onSubmit={handleSignup}
          onBlur={validateField}
        >
          <Stack spacing={2}>
            <FormControl>
              <Typography variant="subtitle2" component="div">
                Email
              </Typography>
              <TextField
                name="email"
                value={data.email}
                placeholder="abc@gmail.com"
                sx={textFieldStyle}
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="ic:outline-alternate-email" />
                    </InputAdornment>
                  ),
                }}
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email : null}
                required
              />
            </FormControl>

            <Stack spacing={1} direction="row">
              <FormControl fullWidth>
                <Typography variant="subtitle2" component="div">
                  First name
                </Typography>
                <TextField
                  name="firstName"
                  value={data.firstName}
                  sx={textFieldStyle}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth>
                <Typography variant="subtitle2" component="div">
                  Last name
                </Typography>
                <TextField
                  name="lastName"
                  value={data.lastName}
                  sx={textFieldStyle}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
            </Stack>

            <Stack spacing={1} direction="row">
              <FormControl fullWidth>
                <Typography variant="subtitle2" component="div">
                  Password
                </Typography>
                <TextField
                  name="password"
                  value={data.password}
                  sx={textFieldStyle}
                  type={isShowPassword ? "text" : "password"}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon="bx:lock-alt" />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password : null}
                  fullWidth
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <Typography variant="subtitle2" component="div">
                  Confirm password
                </Typography>
                <TextField
                  name="repassword"
                  value={data.repassword}
                  sx={textFieldStyle}
                  type={isShowPassword ? "text" : "password"}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon="bx:lock-alt" />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.repassword ? true : false}
                  helperText={errors.repassword ? errors.repassword : null}
                  fullWidth
                  required
                />
              </FormControl>
            </Stack>
          </Stack>

          <Stack sx={{ mt: "4px", mb: "8px" }} direction="row" alignItems="center" justifyContent="space-between">
            <FormControlLabel
              sx={{ userSelect: "none" }}
              control={<Checkbox onChange={handleShowPassword} size="small" sx={checkBoxStyle} />}
              label={
                <Typography variant="body2" component="div">
                  Show password
                </Typography>
              }
            />
          </Stack>

          <LoadingButton
            loading={loading}
            sx={{ ...containedButtonStyle, textTransform: "capitalize" }}
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Create Account
          </LoadingButton>
        </form>

        <Typography sx={{ mt: "10px" }} variant="body2" component="div">
          Already have an account?{" "}
          <Link ref={nodeRef} href="/login" sx={{ color: "var(--primary-color)", fontWeight: "500" }} underline="none">
            Log in
          </Link>
        </Typography>
      </Box>
      <div className="signup__content-right" />
    </SignupContainer>
  );
};

export default SignupSection;
