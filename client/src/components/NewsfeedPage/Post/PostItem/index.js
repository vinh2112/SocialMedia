import React, { useState, useRef, useEffect } from "react";
import ListAction from "./ListAction";
import ListComment from "./ListComment";
import {
  PostContainer,
  PostTop,
  PostImage,
  PostAuthor,
  AuthorInfo,
  AvatarLink,
  Avatar,
  RightSide,
  AuthorName,
  PostCreated,
  Description,
  CustomButton,
  CustomInputLabel,
  CustomInputAdornment,
  CustomOutlinedInput,
} from "./PostItemElements";
import moment from "moment";
import { saveAs } from "file-saver";
import { PaymentAPI } from "api";
import { useHistory } from "react-router-dom";
import { FormControl, Stack, Switch } from "@mui/material";
import { authState$ } from "redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { PostAPI } from "api";
import * as actions from "redux/actions";
import { LoadingButton } from "@mui/lab";
import DefaultAvatar from "images/DefaultAvatar.png";
import PostReportModal from "./PostReportModal";

// const getFirstLetter = (name) => {
//   return name.charAt(0).toUpperCase();
// };

const PostItem = ({ post }) => {
  const [newPost, setNewPost] = useState(null);
  const [isShowComment, setIsShowComment] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(authState$);
  const boxComment = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setNewPost(post);
    }
    return () => {
      setNewPost(null);
    };
  }, [post]);

  const handleShowComment = () => {
    if (!isShowComment) {
      setIsShowComment(true);
    } else {
      boxComment.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      boxComment.current.focus({ preventScroll: true });
    }
  };

  const handleDownload = async () => {
    if (post.isPaymentRequired) {
      if(currentUser){
        if(post.userId=== currentUser._id ){
          saveAs(post.image.url, `${post.image.public_id}.png`);
        }
        else{
        const isPaid = await PaymentAPI.checkPayment(post._id);

        if (isPaid.data) {
          saveAs(post.image.url, `${post.image.public_id}.png`);
        } else {
          history.push("/checkout", { post });
          }
        }
      }
      else{
        dispatch(
          actions.toast.showToast({
            message: "Please Login",
            type: "warning",
          })
        );

      }
    }
    else {
      saveAs(post.image.url, `${post.image.public_id}.png`);
    }
  };

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
    <>
      <PostContainer>
        <PostTop>
          <PostAuthor>
            <AuthorInfo>
              {/* {post.price} */}
              <AvatarLink to={`/profile/${post.userId._id}`}>
                <Avatar src={post.userId.avatar ? post.userId.avatar : DefaultAvatar} />
              </AvatarLink>
              <RightSide>
                <AuthorName to={`/profile/${post.userId._id}`}>
                  @{post.userId.name ? post.userId.name : post.userId.email}
                </AuthorName>
                <PostCreated>{moment(post.createdAt).fromNow()}</PostCreated>
              </RightSide>

              {post.userId._id === currentUser?._id && isOnEdit && (
                <Stack spacing={1} direction="row">
                  <CustomButton
                    size="small"
                    variant="string"
                    onClick={() => setIsOnEdit(!isOnEdit)}
                  >
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
              )}
            </AuthorInfo>
            <Description>
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
                      <CustomInputLabel
                        style={{ color: `${({ theme }) => theme.textColor}` }}
                        htmlFor="outlined-adornment-amount"
                      >
                        Price
                      </CustomInputLabel>
                      <CustomOutlinedInput
                        id="outlined-adornment-amount"
                        name="price"
                        value={newPost.price}
                        disabled={!newPost.isPaymentRequired}
                        onChange={handleChangeValue}
                        startAdornment={
                          <CustomInputAdornment position="start">$</CustomInputAdornment>
                        }
                        label="Price"
                        style={{ color: `${({ theme }) => theme.textColor}` }}
                        sx={{ width: 100, height: 40 }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              ) : (
                <pre className="post__desc">{post.desc}</pre>
              )}
            </Description>
          </PostAuthor>
          <PostImage src={post.image.url} />
        </PostTop>
        <ListAction
          showComment={handleShowComment}
          post={post}
          downloadImage={handleDownload}
          handleEdit={setIsOnEdit}
          handleReport={setIsReporting}
        />
        {isShowComment && <ListComment boxComment={boxComment} post={post} />}
      </PostContainer>
      {isReporting && <PostReportModal handleClose={setIsReporting} postId={post._id} />}
    </>
  );
};

export default PostItem;
