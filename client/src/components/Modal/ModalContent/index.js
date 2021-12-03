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
  CustomInputAdornment,
  CustomInputLabel,
  CustomOutlinedInput,
  Desc,
  DescWrapper,
} from "./ModalContentElements";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { FormControl, Stack, Switch } from "@mui/material";
import { authState$ } from "redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { PostAPI } from "api";
import * as actions from "redux/actions";

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
        <AvatarWrapper>
          <AvatarLink to={`/profile/${post.userId._id}`}>
            <Avatar src={`${post.userId.avatar}`} />
          </AvatarLink>
        </AvatarWrapper>

        <AuthorWrapper>
          <AuthorName to={`/profile/${post.userId._id}`}>@{post.userId.name}</AuthorName>
          <CreatedDate>{moment(post.createdAt).fromNow()}</CreatedDate>
        </AuthorWrapper>

        {post.userId._id === currentUser?._id &&
          (isOnEdit ? (
            <Stack spacing={1} direction="row">
              <CustomButton size="small" variant="string" onClick={() => setIsOnEdit(!isOnEdit)}>
                Cancel
              </CustomButton>
              <LoadingButton
                size="small"
                sx={{ height: 30 }}
                loading={loading}
                variant="outlined"
                color="success"
                onClick={handleSubmit}
              >
                Update
              </LoadingButton>
            </Stack>
          ) : (
            <CustomButton size="small" variant="string" onClick={() => setIsOnEdit(!isOnEdit)}>
              Edit
            </CustomButton>
          ))}
      </ContentTop>
      <DescWrapper>
        {isOnEdit ? (
          <Stack spacing={1} direction="row">
            <textarea name="desc" onChange={handleChangeValue} value={newPost.desc} />

            <Stack spacing={1} alignItems="center" direction="column">
              <Switch
                checked={newPost.isPaymentRequired}
                name="isPaymentRequired"
                onChange={handleChangeValue}
                size="small"
                color="primary"
              />
              <FormControl>
                <CustomInputLabel htmlFor="outlined-adornment-amount">Price</CustomInputLabel>
                <CustomOutlinedInput
                  id="outlined-adornment-amount"
                  name="price"
                  value={newPost.price}
                  disabled={!newPost.isPaymentRequired}
                  onChange={handleChangeValue}
                  startAdornment={<CustomInputAdornment position="start">$</CustomInputAdornment>}
                  label="Price"
                  sx={{ width: 100, height: 40 }}
                />
              </FormControl>
            </Stack>
          </Stack>
        ) : (
          <Desc>{post.desc}</Desc>
        )}
      </DescWrapper>
    </Container>
  );
}
