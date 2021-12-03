import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarWrapper,
  InfoContainer,
  InfoItem,
  InfoWrapper,
} from "./InformationSectionElements";
import { Icon } from "@iconify/react";
import { AuthAPI, UPLOAD, UserAPI } from "api";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";
import DefaultAvatar from "images/DefaultAvatar.png";

const initialUser = {
  avatar: "",
  name: "",
  from: "",
  creditCard: "",
  desc: "",
};

export default function InformationSection({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user)
      setNewUser({
        ...initialUser,
        name: user.name,
        from: user.from,
        creditCard: user.creditCard,
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
    if (name === "creditCard") {
      if (value.length < 20) {
        value = value.replaceAll("-", "");
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(value)) {
          let loop = Math.floor((value.length - 1) / 4);
          for (var i = 1; i <= loop; i++) {
            value =
              value.substring(0, i * 4 + i - 1) +
              "-" +
              value.substring(i * 4 + i - 1, value.length);
          }
        } else {
          return;
        }
      } else {
        return;
      }
    }
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

    setIsLoading(false);
  };

  const updateUser = async (user) => {
    try {
      const res = await UserAPI.updateUser(user);
      if (res.status === 200) {
        const newUser = await AuthAPI.getUserInfo();
        dispatch(actions.getCurrentUser(newUser.data));
        dispatch(
          actions.toast.showToast({
            message: "Updated User",
            type: "success",
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!newUser) return null;

  return (
    <InfoContainer>
      <InfoWrapper>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <InfoItem>
              <AvatarWrapper>
                <Avatar
                  onClick={handleClick}
                  src={
                    newUser.avatar ? newUser.avatar : [user?.avatar ? user.avatar : DefaultAvatar]
                  }
                  alt="avatar"
                />
                <input
                  onChange={handleUploadAvatar}
                  hidden
                  id="avatar"
                  type="file"
                  accept="image/png, image/jpeg"
                />
              </AvatarWrapper>
            </InfoItem>
          </Grid>
          <Grid item xs={12}>
            <InfoItem>
              <Button
                onClick={handleClick}
                variant="outlined"
                startIcon={<Icon icon="ant-design:camera-outlined" />}
              >
                Change
              </Button>
            </InfoItem>
          </Grid>
          <Grid item xs={12}>
            <InfoItem>
              <TextField
                name="name"
                onChange={handleChangeValue}
                defaultValue={newUser.name}
                label="Name"
                style={{ width: "300px" }}
                size="small"
              />
            </InfoItem>
          </Grid>
          <Grid item xs={12}>
            <InfoItem>
              <TextField
                name="from"
                onChange={handleChangeValue}
                defaultValue={newUser.from}
                label="From"
                style={{ width: "300px" }}
                size="small"
              />
            </InfoItem>
          </Grid>
          <Grid item xs={12}>
            <InfoItem>
              <TextField
                name="creditCard"
                onChange={handleChangeValue}
                value={newUser.creditCard}
                label="Credit Card"
                style={{ width: "300px" }}
                size="small"
              />
            </InfoItem>
          </Grid>
          <Grid item xs={12}>
            <InfoItem>
              <TextField
                name="desc"
                onChange={handleChangeValue}
                defaultValue={newUser.desc}
                label="Description"
                multiline
                rows={4}
                style={{ width: "300px" }}
                size="small"
              />
            </InfoItem>
          </Grid>
          <Grid item xs={12} justifyContent="center">
            <InfoItem>
              <LoadingButton
                onClick={handleSubmit}
                loading={isLoading}
                style={{ width: "300px" }}
                variant="contained"
              >
                Update
              </LoadingButton>
            </InfoItem>
          </Grid>
        </Grid>
      </InfoWrapper>
    </InfoContainer>
  );
}
