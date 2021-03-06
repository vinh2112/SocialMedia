import React, { useEffect, useState, useRef } from "react";
// import { useHistory } from "react-router-dom";
import { ActionContainer, LikeAction, CommentAction, MoreAction, ActionMenu, MenuItem, Title } from "./ListActionElements";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "redux/actions";
import { authState$, commentState$ } from "redux/selectors";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { containedButtonStyle, textButtonStyle } from "styles/muiCustom";

const ListAction = ({ showComment, post, downloadImage, handleEdit, handleReport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const menuNode = useRef();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authState$);
  const { data } = useSelector(commentState$);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const initialLike = () => {
      if (currentUser) {
        const isLiked = post.likes.find((like) => {
          return like._id === currentUser._id;
        });
        if (isLiked) setIsLiked(true);
      }
    };
    initialLike();
    return () => {
      setIsLiked(false);
    };
  }, [currentUser, post]);

  useEffect(() => {
    const handleOutSide = (e) => {
      if (!menuNode.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutSide);
    return () => {
      document.removeEventListener("mousedown", handleOutSide);
    };
  }, [setIsOpen]);

  const handleReact = async () => {
    // Check Log in status - if false redirect to login page
    if (currentUser) {
      setIsLiked(!isLiked);
      dispatch(actions.reactPost.reactPostRequest(post._id));
    } else {
      dispatch(
        actions.toast.showToast({
          message: "Please Login",
          type: "warning",
        })
      );
    }
  };

  const handleCloseDialog = (e) => {
    setIsOpenDialog(false);
    setIsOpen(false);
  };

  const handleDeletePost = () => {
    if (currentUser) {
      dispatch(actions.deletePost.deletePostRequest(post._id));
    } else {
      dispatch(
        actions.toast.showToast({
          message: "Please Login",
          type: "warning",
        })
      );
    }
    handleCloseDialog();
  };

  return (
    <ActionContainer>
      <LikeAction onClick={handleReact}>
        {isLiked ? (
          <Icon icon="ant-design:heart-filled" style={{ color: "var(--primary-color)" }} />
        ) : (
          <Icon icon="ant-design:heart-outlined" />
        )}
        <span>{post.likes.length}</span>
      </LikeAction>

      <CommentAction onClick={showComment}>
        <Icon icon="akar-icons:chat-bubble" />
        <span>{data.filter((comment) => comment.postId === post._id).length || post.commentCount}</span>
      </CommentAction>

      <MoreAction ref={menuNode} onClick={() => setIsOpen(!isOpen)}>
        <Icon icon="carbon:overflow-menu-horizontal" />
        <ActionMenu isOpen={isOpen}>
          {post?.userId._id === currentUser?._id && (
            <MenuItem onClick={handleEdit}>
              <Icon icon="ant-design:edit-outlined" />
              <Title>Edit Post</Title>
            </MenuItem>
          )}
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              downloadImage();
            }}
          >
            <Icon icon="fluent:arrow-download-16-filled" />
            <Title>Download</Title>
          </MenuItem>
          {post?.userId._id === currentUser?._id && (
            <>
              <MenuItem
                className="danger"
                onClick={() => {
                  setIsOpenDialog(true);
                  setIsOpen(false);
                }}
              >
                <Icon icon="feather:delete" />
                <Title>Delete post</Title>
              </MenuItem>

              <Dialog
                maxWidth="xs"
                open={isOpenDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle sx={{ color: "var(--danger-color)" }} id="alert-dialog-title">
                  Delete this post?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    If you want to delete this post, agree with our policies and please press "Agree".
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button sx={textButtonStyle} className="btn-default" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button sx={{ ...containedButtonStyle, width: "100px" }} onClick={handleDeletePost}>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
          <MenuItem className="danger" onClick={() => handleReport(true)}>
            <Icon icon="jam:triangle-danger" />
            <Title>Report</Title>
          </MenuItem>
        </ActionMenu>
      </MoreAction>
    </ActionContainer>
  );
};

export default ListAction;
