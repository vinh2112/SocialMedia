import React from "react";
import { LoginContainer } from "./LoginElements";
import Google from "assets/images/google.png";
import { GoogleLogin } from "react-google-login";
import {
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
import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import ForgetPasswordModal from "./ForgetPasswordModal";
import { checkBoxStyle, containedButtonStyle, outlinedButtonStyle, textFieldStyle } from "styles/muiCustom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "redux/actions";
import { authState$ } from "redux/selectors";
import { useHistory } from "react-router-dom";
import PhotoosLogo from "assets/images/Photoos.svg";

const initialData = {
  email: "",
  password: "",
};

const Login = () => {
  const clientId = "828741880621-pqvtk7ei98q91lno41bclfnkjhdsou4l.apps.googleusercontent.com";
  const [data, setData] = React.useState(initialData);
  const [errors, setErrors] = React.useState(initialData);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { errMsg, currentUser } = useSelector(authState$);
  const dispatch = useDispatch();
  const nodeRef = React.useRef();
  const history = useHistory();

  React.useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = Object.values(errors).every((value) => {
      if (value) {
        return false;
      }
      return true;
    });

    if (isValidated) {
      setLoading(true);

      dispatch(
        actions.login.loginRequest({
          email: data.email,
          password: data.password,
        })
      );
    }
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
    }
  };

  const onLoginSuccess = (res) => {
    if (res.profileObj) {
      dispatch(
        actions.login.loginRequest({
          idToken: res.tokenId,
        })
      );
    }
  };

  const onFailureSuccess = (res) => {
    console.log("Login Failed: ", res);
  };
  return (
    <LoginContainer>
      <div className="login__body">
        <div className="login__container-left">
          <div className="login__heading">
            Sign in to
            <span>
              <img src={PhotoosLogo} alt="photoos logo" />
            </span>
          </div>
          <div className="login__content-1">If you don't have an account</div>
          <div className="login__content-2">
            You can <a href="/register">Register here!</a>
          </div>
          <div className="login__image" />
        </div>

        <div className="login__container-right">
          <form
            className="login__form"
            onSubmitCapture={() => nodeRef.current.focus()}
            onSubmit={handleSubmit}
            onChange={handleChangeValue}
            onBlur={validateField}
          >
            {/* <Typography variant="h4" gutterBottom component="div">
              Let's enjoy it
            </Typography>

            <Typography variant="body2" gutterBottom component="div">
              Welcome! Please enter your account.
            </Typography>
            <br /> */}
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
                  Log in with Google
                </Button>
              )}
              onSuccess={onLoginSuccess}
              onFailure={onFailureSuccess}
              cookiePolicy={"single_host_origin"}
            />

            <Divider sx={{ margin: "20px 0" }}>or</Divider>

            {errMsg && (
              <Typography sx={{ color: "red", mb: "8px" }} variant="body2">
                *{errMsg}
              </Typography>
            )}

            <Stack spacing={2}>
              <FormControl>
                <Typography variant="subtitle2" component="div">
                  Email
                </Typography>
                <TextField
                  name="email"
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

              <FormControl>
                <Typography variant="subtitle2" component="div">
                  Password
                </Typography>
                <TextField
                  name="password"
                  sx={textFieldStyle}
                  type="password"
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
                  required
                />
              </FormControl>
            </Stack>

            <Stack sx={{ margin: "4px 0 16px" }} direction="row" alignItems="center" justifyContent="space-between">
              <FormControlLabel
                sx={{ userSelect: "none" }}
                control={<Checkbox size="small" sx={checkBoxStyle} />}
                label={
                  <Typography variant="body2" component="div">
                    Show password
                  </Typography>
                }
              />
              <div className="login__forget-password" onClick={() => setOpen(!open)}>
                Forget password
              </div>
            </Stack>

            <LoadingButton
              type="submit"
              loading={errMsg ? false : loading}
              sx={{ ...containedButtonStyle, textTransform: "none" }}
              variant="contained"
              size="large"
              fullWidth
            >
              Sign in
            </LoadingButton>

            <Typography sx={{ mt: "10px" }} align="center" variant="body2" component="div">
              Don't have an account?{" "}
              <Link ref={nodeRef} href="/register" sx={{ color: "var(--primary-color)", fontWeight: "700" }} underline="none">
                Register
              </Link>
            </Typography>
          </form>
        </div>
      </div>
      <ForgetPasswordModal open={open} handleClose={() => setOpen(!open)} />
    </LoginContainer>
  );
};

export default Login;
