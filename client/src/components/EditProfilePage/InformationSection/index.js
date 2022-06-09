import { Autocomplete, Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarWrapper, InfoContainer, InfoWrapper } from "./InformationSectionElements";
import { Icon } from "@iconify/react";
import { AuthAPI, UPLOAD, UserAPI } from "api";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";
import { autoCompleteStyle, containedButtonStyle, outlinedButtonStyle, textFieldStyle } from "styles/muiCustom";
import countries from "assets/json/countries";

const initialUser = {
  avatar: "",
  name: "",
  fullName: "",
  from: "",
  city: "",
  desc: "",
};

export default function InformationSection({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const dispatch = useDispatch();
  let countryOptions = Object.keys(countries).map((code) => {
    return { code: code, label: countries[code] };
  });

  useEffect(() => {
    if (user)
      setNewUser({
        ...initialUser,
        name: user.name,
        fullName: user.fullName,
        from: user.from,
        city: user.city,
        desc: user.desc,
      });
    return () => {
      setNewUser(null);
    };
  }, [user]);

  const handleClick = () => {
    const input = document.getElementById("avatar");
    input.click();
  };

  const handleUploadAvatar = (e) => {
    setNewUser({ ...newUser, avatar: URL.createObjectURL(e.target.files[0]) });
  };

  const handleChangeValue = (e) => {
    var { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async () => {
    const newObj = newUser;
    setIsLoading(true);
    if (!newUser.avatar) {
      delete newObj.avatar;
    } else {
      try {
        let file = await fetch(newObj.avatar)
          .then((r) => r.blob())
          .then((blobFile) => new File([blobFile], "Avatar", { type: "image/png" }));

        let formData = new FormData();
        formData.append("image", file);

        const res = await UPLOAD.uploadAvatar(formData);
        if (res.status === 200) {
          newObj.avatar = res.data.url;
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    updateUser(newObj);
  };

  const updateUser = async (user) => {
    try {
      const res = await UserAPI.updateUser(user);
      if (res.status === 200) {
        const newUser = await AuthAPI.getUserInfo();
        dispatch(actions.getCurrentUser(newUser.data));
        dispatch(
          actions.toast.showToast({
            message: "Updated user",
            type: "success",
          })
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!newUser) return null;

  return (
    <InfoContainer>
      <InfoWrapper>
        <Stack justifyContent="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <AvatarWrapper>
              <Avatar
                onClick={handleClick}
                src={newUser.avatar ? newUser.avatar : [user?.avatar ? user.avatar : DefaultAvatar]}
                alt="avatar"
              />
              <input onChange={handleUploadAvatar} hidden id="avatar" type="file" accept="image/png, image/jpeg" />
            </AvatarWrapper>
            <Stack spacing={1}>
              <Typography variant="subtitle2" component="div">
                @{newUser.name}
              </Typography>
              <Button
                sx={outlinedButtonStyle}
                onClick={handleClick}
                variant="outlined"
                startIcon={<Icon icon="ant-design:camera-outlined" />}
              >
                Change
              </Button>
            </Stack>
          </Stack>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2" component="div">
              Fullname
            </Typography>
            <TextField
              sx={textFieldStyle}
              name="fullName"
              onChange={handleChangeValue}
              defaultValue={newUser.fullName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="ant-design:user-outlined" />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Stack>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2" component="div">
              Nickname
            </Typography>
            <TextField
              sx={textFieldStyle}
              name="name"
              onChange={handleChangeValue}
              defaultValue={newUser.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="ic:outline-alternate-email" />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Stack>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2" component="div">
              Country
            </Typography>
            <Autocomplete
              sx={{ ...autoCompleteStyle, padding: "0 !important" }}
              name="from"
              options={countryOptions}
              autoHighlight
              freeSolo
              disablePortal
              getOptionLabel={(option) => `${option.label} | ${option.code}`}
              isOptionEqualToValue={(option, value) => option.code === value.code}
              value={
                countryOptions.find((option) => option.code === newUser?.from) ||
                countryOptions.find((option) => option.code === "vn")
              }
              onChange={(e, value) => {
                value ? setNewUser({ ...newUser, from: value.code }) : setNewUser({ ...newUser, from: "" });
              }}
              renderOption={(props, option) => (
                <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase() || "vn"}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase() || "vn"}.png 2x`}
                    alt=""
                  />
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    ...textFieldStyle,
                    "& input": {
                      paddingLeft: "0px !important",
                    },
                    "& > div": {
                      padding: "6px 0 6px 2px !important",
                    },
                  }}
                  placeholder="Choose your country"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    autoComplete: "new-password",
                    startAdornment: (
                      <InputAdornment sx={{ ml: 1 }} position="start">
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${newUser?.from.toLowerCase() || "vn"}.png`}
                          srcSet={`https://flagcdn.com/w40/${newUser?.from.toLowerCase() || "vn"}.png 2x`}
                          alt=""
                        />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2" component="div">
              City
            </Typography>
            <TextField
              sx={textFieldStyle}
              name="city"
              onChange={handleChangeValue}
              defaultValue={newUser.city}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="bx:map" />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="subtitle2" component="div">
              Description
            </Typography>
            <TextField
              sx={textFieldStyle}
              name="desc"
              onChange={handleChangeValue}
              defaultValue={newUser.desc}
              multiline
              minRows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="carbon:string-text" />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Stack>
        </Stack>
        <Stack sx={{ mt: 3 }}>
          <LoadingButton
            loading={isLoading}
            sx={{ ...containedButtonStyle, textTransform: "unset" }}
            onClick={handleSubmit}
            variant="contained"
          >
            Update user
          </LoadingButton>
        </Stack>
      </InfoWrapper>
    </InfoContainer>
  );
}
