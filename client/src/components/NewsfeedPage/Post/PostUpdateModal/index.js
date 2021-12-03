import React, { useRef, useState, useEffect } from "react";
import {
  OverLay,
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
  Actions,
  UploadButtonWrapper,
  UploadButton,
  PostButtonWrapper,
  PostButton,
  LoadingSection,
  PostPayment,
  SwitchWrapper,
  InputPrice,
} from "./PostUpdateModalElements";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, hideModal } from "redux/actions";
import { modalState$, postState$ } from "redux/selectors";
import Switch from "@mui/material/Switch";
import DefaultAvatar from "images/DefaultAvatar.png";

const initial_post = {
  desc: "",
  category: [],
  image: "",
  isPaymentRequired: false,
  price: 0,
};

const PostUpdateModal = ({ user }) => {
  const overlayRef = useRef();
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);
  const { isLoading } = useSelector(postState$);

  const [post, setPost] = useState(initial_post);
  const [isSmall, setIsSmall] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setPost(initial_post);
    }
  }, [isLoading]);

  const handleChangeValue = React.useCallback(
    (e) => {
      if (e.target.value.length <= 250) {
        setPost({ ...post, desc: e.target.value });
        if (post.desc.length > 100) {
          setIsSmall(true);
        } else {
          setIsSmall(false);
        }
      }
    },
    [post]
  );

  const handleUpload = async (e) => {
    setPost({ ...post, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleRemovePhoto = () => {
    setPost({ ...post, image: "" });
  };

  const handlePayment = () => {
    const cac = !post.isPaymentRequired;
    setPost({ ...post, isPaymentRequired: cac });
    setIsChecked(!isChecked);
  };

  const handlePrice = (e) => {
    setPost({ ...post, price: e.target.value });
  };

  const closeModal = React.useCallback(
    (e) => {
      if (overlayRef.current === e.target) {
        dispatch(hideModal());
      }
    },
    [dispatch]
  );

  const onSubmit = React.useCallback(() => {
    dispatch(createPost.createPostRequest({ ...post }));
  }, [post, dispatch]);

  return (
    <OverLay ref={overlayRef} onMouseDown={closeModal} isShow={isShow}>
      <Container isShow={isShow}>
        <Top>
          <Title>New Post</Title>
          <ButtonWrapper>
            <CloseButton onClick={() => dispatch(hideModal())}>
              <Icon icon="akar-icons:cross" />
            </CloseButton>
          </ButtonWrapper>
        </Top>
        <Content>
          <UserWrapper>
            <AvatarWrapper>
              <Avatar src={user.avatar ? user.avatar : DefaultAvatar} alt="avatar" />
            </AvatarWrapper>
            <Name>@{user.name}</Name>
            <PostPayment>
              <SwitchWrapper>
                Payment Required
                <Switch checked={post.isPaymentRequired} onChange={handlePayment} size="small" />
                <InputPrice
                  onChange={handlePrice}
                  type="number"
                  disabled={isChecked ? "" : "disabled"}
                ></InputPrice>
              </SwitchWrapper>
            </PostPayment>
          </UserWrapper>
          <DescArea
            className="desc-area"
            placeholder="What do you want to talk about?"
            onChange={handleChangeValue}
            value={post.desc}
            isSmall={isSmall}
          />
          <LetterCount>{post.desc.length}/250</LetterCount>

          {post.image && (
            <PhotoWrapper>
              <Photo
                style={isLoaded ? {} : { display: "none" }}
                onLoad={() => setIsLoaded(true)}
                src={post.image}
              />
              <RemovePhotoButton onClick={handleRemovePhoto}>
                <Icon icon="fluent:delete-16-regular" />
                <span>Remove</span>
              </RemovePhotoButton>
            </PhotoWrapper>
          )}
        </Content>
        <Actions>
          {!post.image && (
            <UploadButtonWrapper>
              <UploadButton htmlFor="upload-btn">
                <input
                  id="upload-btn"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleUpload}
                />
                <Icon icon="carbon:image" />
              </UploadButton>
            </UploadButtonWrapper>
          )}

          <PostButtonWrapper>
            <PostButton
              disabled={post.desc.length === 0 || !post.image ? "disabled" : null}
              onClick={onSubmit}
            >
              Post
            </PostButton>
          </PostButtonWrapper>
        </Actions>
        {isLoading && <LoadingSection />}
        {/* <LoadingSection /> */}
      </Container>
    </OverLay>
  );
};

export default PostUpdateModal;
