import React, { useEffect, useState } from "react";
import {
  AuthorName,
  AuthorWrapper,
  Avatar,
  AvatarLink,
  AvatarWrapper,
  Container,
  ContentTop,
  CreatedDate,
  CustomButton,
  Desc,
  DescWrapper,
} from "./ModalContentElements";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, FormControlLabel, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { authState$ } from "redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { PostAPI } from "api";
import * as actions from "redux/actions";
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";
import { checkBoxStyle, textButtonStyle, textFieldStyle } from "styles/muiCustom";
import NumberFormat from "react-number-format";

export default function ModalContent({ post }) {
  const [newPost, setNewPost] = useState(null);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(authState$);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setNewPost(post);
    }
    return () => {
      setNewPost(null);
    };
  }, [post]);

  const handleChangeValue = (e) => {
    const { name, value, checked } = e.target;
    if (name === "isPaymentRequired") {
      setNewPost({ ...newPost, [name]: checked });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await PostAPI.updatePost({
        data: {
          desc: newPost.desc,
          isPaymentRequired: newPost.isPaymentRequired,
          price: newPost.price,
        },
        postId: newPost._id,
      });
      if (res.status === 200) {
        dispatch(actions.updatePost(res.data));
        dispatch(
          actions.toast.showToast({
            message: "Update post success",
            type: "success",
          })
        );
      } else {
        dispatch(
          actions.toast.showToast({
            message: "Update post failed",
            type: "warning",
          })
        );
      }
      setIsOnEdit(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ContentTop>
        {isOnEdit ? null : (
          <>
            <AvatarWrapper>
              <AvatarLink to={`/profile/${post.userId._id}`}>
                <Avatar src={post.userId.avatar || DefaultAvatar} />
              </AvatarLink>
            </AvatarWrapper>

            <AuthorWrapper>
              <AuthorName to={`/profile/${post.userId._id}`}>@{post.userId.name}</AuthorName>
              <CreatedDate>{moment(post.createdAt).fromNow()}</CreatedDate>
            </AuthorWrapper>
          </>
        )}

        {post.userId._id === currentUser?._id &&
          (isOnEdit ? (
            <Stack sx={{ height: "fit-content" }} spacing={2} direction="row">
              <Button
                sx={textButtonStyle}
                className="btn-default"
                size="small"
                variant="text"
                onClick={() => setIsOnEdit(!isOnEdit)}
              >
                Cancel
              </Button>
              <LoadingButton
                sx={textButtonStyle}
                // className="btn-primary"
                size="small"
                loading={loading}
                variant="text"
                onClick={handleSubmit}
              >
                Update
              </LoadingButton>
            </Stack>
          ) : (
            <>
              <CustomButton size="small" variant="string" onClick={() => setIsOnEdit(!isOnEdit)}>
                Edit
              </CustomButton>
            </>
          ))}
      </ContentTop>
      <DescWrapper>
        {isOnEdit ? (
          <Stack spacing={1} direction="row">
            <TextField
              sx={{ ...textFieldStyle, height: "100%" }}
              multiline
              minRows={2}
              name="desc"
              onChange={handleChangeValue}
              value={newPost.desc}
              fullWidth
            ></TextField>

            <Stack alignItems="center">
              <FormControlLabel
                sx={{ userSelect: "none" }}
                control={
                  <Checkbox
                    checked={newPost.isPaymentRequired}
                    name="isPaymentRequired"
                    onChange={handleChangeValue}
                    size="small"
                    sx={checkBoxStyle}
                  />
                }
                label={
                  <Typography variant="caption" component="div">
                    Fee
                  </Typography>
                }
              />
              <TextField
                sx={{ ...textFieldStyle, width: "100px" }}
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputComponent: NumberFormatCustom,
                }}
                name="price"
                value={newPost.price}
                disabled={!newPost.isPaymentRequired}
                onChange={handleChangeValue}
              ></TextField>
            </Stack>
          </Stack>
        ) : (
          <Desc>{post.desc}</Desc>
        )}
      </DescWrapper>
    </Container>
  );
}

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});
