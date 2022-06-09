import React, { useState, useEffect } from "react";
import {
  Container,
  Top,
  Title,
  ButtonWrapper,
  CloseButton,
  Content,
  UserWrapper,
  AvatarWrapper,
  Avatar,
  Name,
  DescArea,
  LetterCount,
  PhotoWrapper,
  Photo,
  RemovePhotoButton,
  PostPayment,
} from "./PostUpdateModalElements";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, hideModal } from "redux/actions";
import { modalState$, postState$ } from "redux/selectors";
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { checkBoxStyle, containedButtonStyle, outlinedButtonStyle, textFieldStyle } from "styles/muiCustom";
import { LoadingButton } from "@mui/lab";
import NumberFormat from "react-number-format";

const initial_post = {
  desc: "",
  category: [],
  image: "",
  isPaymentRequired: false,
  price: "",
};

const PostUpdateModal = ({ user }) => {
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);
  const { isPosting } = useSelector(postState$);

  const [post, setPost] = useState(initial_post);
  const [isSmall, setIsSmall] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isPosting) {
      setPost(initial_post);
    }
  }, [isPosting]);

  const handleChangeValue = (e) => {
    const { name, value, checked } = e.target;

    if (e.target.value.length <= 250 && name === "desc") {
      if (post.desc.length > 100) {
        setIsSmall(true);
      } else {
        setIsSmall(false);
      }
    } else if (name === "isPaymentRequired") {
      setPost({ ...post, [name]: checked });
      return;
    }

    setPost({ ...post, [name]: value });
  };
  const handleUpload = async (e) => {
    setPost({ ...post, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleRemovePhoto = () => {
    setPost({ ...post, image: "" });
  };

  const closeModal = React.useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createPost.createPostRequest({ ...post }));
  }, [post, dispatch]);

  return (
    <Modal onClose={closeModal} open={isShow}>
      <Container isShow={isShow}>
        <Top>
          <Title>New Post</Title>
          <ButtonWrapper>
            <CloseButton onClick={closeModal}>
              <Icon icon="akar-icons:cross" />
            </CloseButton>
          </ButtonWrapper>
        </Top>
        <Content>
          <UserWrapper>
            <AvatarWrapper>
              <Avatar src={user.avatar ? user.avatar : DefaultAvatar} alt="avatar" />
            </AvatarWrapper>
            <Name>
              <div className="fullName">{user.fullName}</div>
              <div className="name">@{user.name}</div>
            </Name>
            <PostPayment>
              <Stack alignItems="center">
                <FormControlLabel
                  sx={{ userSelect: "none" }}
                  control={
                    <Checkbox
                      name="isPaymentRequired"
                      checked={post.isPaymentRequired}
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
                  name="price"
                  sx={{ ...textFieldStyle, width: "100px" }}
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputComponent: NumberFormatCustom,
                  }}
                  disabled={!post.isPaymentRequired}
                  value={post.price}
                  onChange={handleChangeValue}
                ></TextField>
              </Stack>
            </PostPayment>
          </UserWrapper>
          <DescArea
            name="desc"
            className="desc-area"
            placeholder="What do you want to talk about?"
            onChange={handleChangeValue}
            value={post.desc}
            isSmall={isSmall}
          />
          <LetterCount>{post.desc.length}/250</LetterCount>

          {post.image && (
            <PhotoWrapper>
              <Photo style={isLoaded ? {} : { display: "none" }} onLoad={() => setIsLoaded(true)} src={post.image} />
              <RemovePhotoButton onClick={handleRemovePhoto}>
                <Icon icon="fluent:delete-16-regular" />
                <span>Remove</span>
              </RemovePhotoButton>
            </PhotoWrapper>
          )}
        </Content>
        <Stack sx={{ p: 2 }} spacing={1}>
          {!post.image && (
            <>
              <LoadingButton
                sx={outlinedButtonStyle}
                size="large"
                variant="outlined"
                htmlFor="upload-btn"
                component="label"
                fullWidth
                startIcon={<Icon icon="carbon:image" />}
              ></LoadingButton>
              <input id="upload-btn" type="file" hidden accept="image/*" onChange={handleUpload} />
            </>
          )}

          <LoadingButton
            loading={isPosting}
            sx={containedButtonStyle}
            variant="contained"
            disabled={post.desc.length === 0 || !post.image ? true : false}
            onClick={onSubmit}
            fullWidth
          >
            Post
          </LoadingButton>
        </Stack>
      </Container>
    </Modal>
  );
};

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

export default PostUpdateModal;
