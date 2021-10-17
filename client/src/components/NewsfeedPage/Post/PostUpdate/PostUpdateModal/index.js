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
} from "./PostUpdateModalElements";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, hideModal } from "redux/actions";
import { modalState$, postState$ } from "redux/selectors";

const initial_post = {
  desc: "",
  category: [],
  image: "",
};

const PostUpdateModal = ({ user }) => {
  const overlayRef = useRef();
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);
  const { isLoading } = useSelector(postState$);

  const [post, setPost] = useState(initial_post);
  const [isSmall, setIsSmall] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const handleUpload = (e) => {
    setPost({ ...post, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleRemovePhoto = () => {
    setPost({ ...post, image: "" });
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
              <Avatar src={user.avatar} alt="avatar" />
            </AvatarWrapper>
            <Name>@{user.name}</Name>
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
              disabled={
                post.desc.length === 0 || !post.image ? "disabled" : null
              }
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
