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
  AuthorNameWrapper,
  PostCreated,
  Description,
  DescriptionWrapper,
} from "./PostItemElements";
import moment from "moment";
import { saveAs } from "file-saver";
import { PaymentAPI } from "api";
import { useHistory } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { authState$ } from "redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { PostAPI } from "api";
import * as actions from "redux/actions";
import { LoadingButton } from "@mui/lab";
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";
import PostReportModal from "./PostReportModal";
import { Link } from "react-router-dom";
import { checkBoxStyle, textButtonStyle, textFieldStyle } from "styles/muiCustom";
import NumberFormat from "react-number-format";

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
      if (currentUser) {
        if (post.userId._id === currentUser._id) {
          await PostAPI.downloadPost(post._id).then((res) => {
            saveAs(res.data.url, `${res.data.public_id}.png`);
          });
        } else {
          const isPaid = await PaymentAPI.checkPayment(post._id);

          if (isPaid.data) {
            await PostAPI.downloadPost(post._id).then((res) => {
              saveAs(res.data.url, `${res.data.public_id}.png`);
              dispatch(
                actions.createNotification.createNotificationRequest({
                  receivers: [post.userId._id],
                  type: "download",
                  targetId: post._id,
                })
              );
            });
          } else {
            history.push(`/checkout/${post._id}`, { post });
          }
        }
      } else {
        dispatch(
          actions.toast.showToast({
            message: "Please Login",
            type: "warning",
          })
        );
      }
    } else {
      await PostAPI.downloadPost(post._id).then((res) => {
        saveAs(res.data.url, `${res.data.public_id}.png`);
        dispatch(
          actions.createNotification.createNotificationRequest({
            receivers: [post.userId._id],
            type: "download",
            targetId: post._id,
          })
        );
      });
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

  const handleEdit = () => {
    setIsOnEdit(true);
    setNewPost(post);
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
                <AuthorNameWrapper>
                  <a href={`/profile/${post.userId._id}`}>{post.userId.fullName}</a>
                  <span>•</span>
                  <a href={`/profile/${post.userId._id}`}>
                    {post.userId.name ? `@${post.userId.name}` : `@${post.userId.email}`}
                  </a>
                </AuthorNameWrapper>
                <PostCreated>{moment(post.createdAt).fromNow()}</PostCreated>
              </RightSide>

              {post.userId._id === currentUser?._id && isOnEdit && (
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
              )}
            </AuthorInfo>
            <Description>
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
                <DescriptionWrapper>
                  <pre className="post__desc">{post.desc}</pre>
                  <div className="post-price">{post.isPaymentRequired ? "$" + post.price : "$0"}</div>
                </DescriptionWrapper>
              )}
            </Description>
          </PostAuthor>
          <Link style={{ display: "flex" }} to={`/post/${post._id}`}>
            <PostImage loading="lazy" src={post.image.watermark} alt="" />
          </Link>
        </PostTop>
        <ListAction
          showComment={handleShowComment}
          post={post}
          downloadImage={handleDownload}
          handleEdit={handleEdit}
          handleReport={setIsReporting}
        />
        {isShowComment && <ListComment boxComment={boxComment} post={post} />}
      </PostContainer>
      {isReporting && <PostReportModal handleClose={setIsReporting} open={isReporting} postId={post._id} />}
    </>
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

export default PostItem;
