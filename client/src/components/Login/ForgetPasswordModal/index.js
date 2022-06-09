import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  Modal,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  boxStyle,
  textButtonStyle,
  containedButtonStyle,
  textFieldStyle,
  stepStyle,
  textFieldPinStyle,
  pinCodeStyle,
} from "styles/muiCustom";
import * as api from "api";
import * as actions from "redux/actions";

const steps = ["Enter your Email", "Verify", "Create a new password"];

const initialState = {
  email: "",
  pin: "",
  password: "",
  confirmPassword: "",
};

const ForgetPasswordModal = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [pinCode, setPinCode] = React.useState(["", "", "", ""]);
  const [errors, setErrors] = React.useState(initialState);
  const [state, setState] = React.useState(initialState);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handlePinCodeKeyDown = (e) => {
    if (e.key === "Backspace") {
      const form = e.target.form;
      const index = [...form].indexOf(e.target) / 2;
      const newPinCode = pinCode.map((num, indexNum) => (indexNum === index ? "" : num));
      setPinCode(newPinCode);
      if (index > 0) {
        form.elements[(index - 1) * 2].focus();
      }
      e.preventDefault();
    }
  };

  const handlePinCodeChange = (e) => {
    if (e.target.value.match(/^[0-9]$/)) {
      const form = e.target.form;
      const index = [...form].indexOf(e.target) / 2;
      const newPinCode = pinCode.map((num, indexNum) =>
        indexNum === index ? e.target.value : num
      );
      setPinCode(newPinCode);
      if (index < pinCode.length - 1) {
        form.elements[(index + 1) * 2].focus();
      }
      e.preventDefault();
    }
  };

  const overflowEmail = (email) => {
    const subStrEmail = email.substr(4, email.indexOf("@") - 4);
    email = email.replace(subStrEmail, "****");
    return email;
  };

  const handleChangeValue = (e) => {
    var { name, value } = e.target;
    setErrors(initialState);
    setState({ ...state, [name]: value });
  };

  const handleNext = async () => {
    setIsLoading(true);
    if (activeStep === 0) {
      if (
        !state.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        setIsLoading(false);

        setErrors({ ...errors, email: "Format is incorrect." });
        return;
      } else {
        try {
          const res = await api.UserAPI.checkEmail({
            email: state.email,
          });
          if (res.status === 200) {
            setErrors(initialState);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setIsLoading(false);
            return;
          } else {
            setErrors({ ...errors, email: res.response.data.message });
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (activeStep === 1) {
      try {
        const res = await api.UserAPI.checkPinCode({
          email: state.email,
          pin: pinCode.join(""),
        });
        if (!res.data) {
          setIsLoading(false);

          setErrors({ ...errors, pin: "PIN is incorrect." });
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (activeStep === 2) {
      if (state.password.length < 6) {
        setIsLoading(false);

        setErrors({ ...errors, newPW: "Password is at least 6 letters." });
        return;
      } else {
        if (state.password === state.confirmPassword) {
          try {
            await api.UserAPI.changePassword({
              email: state.email,
              password: state.password,
            });

            handleClose();

            dispatch(
              actions.toast.showToast({
                message: "Password has been changed",
                type: "success",
              })
            );
          } catch (error) {
            console.log(error);
          }
        } else {
          setIsLoading(false);

          setErrors({ ...errors, confirmPW: "Incorrect password." });
          return;
        }
      }
    }

    setIsLoading(false);
    setErrors(initialState);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={boxStyle}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            return (
              <Step key={label} sx={stepStyle}>
                {/* <StepLabel>Step {index + 1}</StepLabel> */}
                <StepLabel />
              </Step>
            );
          })}
        </Stepper>

        {activeStep === 0 ? (
          <React.Fragment>
            <Typography sx={{ mt: 2 }} variant="h6">
              Enter your email
            </Typography>

            <Typography sx={{ mt: 1, mb: 2 }} variant="body2">
              We will send confirmation code to you
            </Typography>

            <TextField
              placeholder="abc@gmail.com"
              name="email"
              sx={textFieldStyle}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="ic:outline-alternate-email" />
                  </InputAdornment>
                ),
              }}
              fullWidth
              error={errors.email ? true : false}
              defaultValue={state.email}
              onChange={handleChangeValue}
              helperText={errors.email ? errors.email : null}
            />
            <Stack sx={{ mt: 4 }} direction="row" justifyContent="space-between">
              <Button
                sx={textButtonStyle}
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>

              <LoadingButton
                sx={containedButtonStyle}
                variant="contained"
                loading={isLoading}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </LoadingButton>
            </Stack>
          </React.Fragment>
        ) : activeStep === 1 ? (
          <React.Fragment>
            <Typography sx={{ mt: 2 }} variant="h6">
              Enter code sent to your email
            </Typography>

            <Typography sx={{ mt: 1, mb: 2 }} variant="body2">
              We sent it to the email{" "}
              <span style={{ fontWeight: "700" }}>
                {overflowEmail("vuongquocvinh.bh@gmail.com")}
              </span>
            </Typography>

            <form style={pinCodeStyle}>
              <TextField
                value={pinCode[0]}
                onKeyDown={handlePinCodeKeyDown}
                onChange={handlePinCodeChange}
                autoComplete="new-password"
                sx={textFieldPinStyle}
                name="pin"
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />
              <TextField
                value={pinCode[1]}
                onKeyDown={handlePinCodeKeyDown}
                onChange={handlePinCodeChange}
                autoComplete="new-password"
                sx={textFieldPinStyle}
                name="pin"
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />
              <TextField
                value={pinCode[2]}
                onKeyDown={handlePinCodeKeyDown}
                onChange={handlePinCodeChange}
                autoComplete="new-password"
                sx={textFieldPinStyle}
                name="pin"
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />
              <TextField
                value={pinCode[3]}
                onKeyDown={handlePinCodeKeyDown}
                onChange={handlePinCodeChange}
                autoComplete="new-password"
                sx={textFieldPinStyle}
                name="pin"
                inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              />
            </form>
            <Stack sx={{ mt: 4 }} direction="row" justifyContent="space-between">
              <Button
                sx={textButtonStyle}
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>

              <LoadingButton
                sx={containedButtonStyle}
                disabled={pinCode.join("").length > 3 ? false : true}
                variant="contained"
                loading={isLoading}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </LoadingButton>
            </Stack>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 2 }} variant="h6">
              Create new password
            </Typography>

            <Stack spacing={2} direction="row">
              <FormControl fullWidth>
                <Typography variant="subtitle2" component="div">
                  Password
                </Typography>
                <TextField
                  name="password"
                  type="password"
                  sx={textFieldStyle}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon="bx:lock-alt" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  // error={errors.email ? true : false}
                  // helperText={errors.email ? errors.email : null}
                  defaultValue={state.password}
                  onChange={handleChangeValue}
                />
              </FormControl>

              <FormControl fullWidth>
                <Typography variant="subtitle2" component="div">
                  Confirm password
                </Typography>
                <TextField
                  name="confirmPassword"
                  type="password"
                  sx={textFieldStyle}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon="bx:lock-alt" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  // error={errors.email ? true : false}
                  defaultValue={state.confirmPassword}
                  onChange={handleChangeValue}
                  // helperText={errors.email ? errors.email : null}
                />
              </FormControl>
            </Stack>

            <Stack sx={{ mt: 4 }} direction="row" justifyContent="space-between">
              <Button
                sx={textButtonStyle}
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>

              <LoadingButton
                sx={containedButtonStyle}
                variant="contained"
                loading={isLoading}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </LoadingButton>
            </Stack>
          </React.Fragment>
        )}
      </Box>
    </Modal>
  );
};

export default ForgetPasswordModal;
