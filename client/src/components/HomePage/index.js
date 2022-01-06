import React, { useState } from "react";
import Navbar from "./Navbar";
import Signin from "./SigninForm";
import HomePageSection from "./HomePageSection";
import Modal from "@mui/material/Modal";
import { Box, Stepper, Typography, Step, StepLabel, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as api from "api";
import * as actions from "redux/actions";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "700px",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "2px solid #000",
  p: 4,
};

const steps = ["Enter your Email", "Verify", "Create a new password"];

const errorState = {
  email: "",
  pin: "",
  newPW: "",
  confirmPW: "",
};

const initialState = {
  email: "",
  pin: "",
  password: "",
  confirmPassword: "",
};

const Home = ({ toggle, isOpen }) => {
  const [openModal, setOpenModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState(errorState);
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
          if (!res.data) {
            setIsLoading(false);

            setErrors({ ...errors, email: "Email does not exist." });
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
          pin: state.pin,
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

            handleModal();
            toggle();

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
    setErrors(errorState);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeValue = (e) => {
    var { name, value } = e.target;
    setErrors(errorState);
    setState({ ...state, [name]: value });
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Navbar toggle={toggle} />
      <Signin isOpen={isOpen} toggle={toggle} handleModal={handleModal} />
      <HomePageSection toggle={toggle} />

      <Modal
        open={openModal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === 0 ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, color: "text.secondary" }}>
                Step {activeStep + 1}
              </Typography>
              <TextField
                name="email"
                error={errors.email ? true : false}
                label="Email"
                value={state.email}
                onChange={handleChangeValue}
                helperText={errors.email ? errors.email : null}
                fullWidth
              />

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <LoadingButton loading={isLoading} onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </LoadingButton>
              </Box>
            </React.Fragment>
          ) : activeStep === 1 ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, color: "text.secondary" }}>
                Step {activeStep + 1}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  name="pin"
                  error={errors.pin ? true : false}
                  label="PIN"
                  onChange={handleChangeValue}
                  value={state.pin}
                  helperText={errors.pin ? errors.pin : null}
                  inputProps={{ maxLength: 6 }}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1, color: "text.primary" }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <LoadingButton loading={isLoading} onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </LoadingButton>
              </Box>
            </React.Fragment>
          ) : (
            activeStep === 2 && (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, color: "text.secondary" }}>
                  Step {activeStep + 1}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", width: "300px", gap: "16px" }}>
                  <TextField
                    type="password"
                    name="password"
                    onChange={handleChangeValue}
                    value={state.password}
                    error={errors.newPW ? true : false}
                    label="New password"
                    helperText={errors.newPW ? errors.newPW : null}
                  />

                  <TextField
                    type="password"
                    name="confirmPassword"
                    onChange={handleChangeValue}
                    value={state.confirmPassword}
                    error={errors.confirmPW ? true : false}
                    label="Confirm password"
                    helperText={errors.confirmPW ? errors.confirmPW : null}
                  />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <LoadingButton loading={isLoading} onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </LoadingButton>
                </Box>
              </React.Fragment>
            )
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Home;
