import React, { useRef, useState, useEffect } from "react";
import BoxComment from "../BoxComment";
import {
  Container,
  LeftSide,
  AvatarLink,
  Avatar,
  RightSide,
  CommentContainer,
  CommentContent,
  Name,
  Comment,
  BottomComment,
  ReplyButton,
  Time,
  ButtonWrapper,
  Button,
  CommentWrapper,
  MenuActions,
  MenuItem,
  ReplyWrapper,
  ReplyCount,
} from "./CommentItemElements";
import { Icon } from "@iconify/react";
import moment from "moment";
import * as actions from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { authState$, commentState$ } from "redux/selectors";
import { CommentAPI } from "api";
import ReplyComment from "./ReplyComment";
import DefaultAvatar from "assets/images/DefaultAvatar.jpg";
import { CircularProgress } from "@mui/material";

const CommentItem = ({ comment, post, socket }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentReply = useRef();
  const menuNode = useRef();
  const dispatch = useDispatch();
  const { commentId } = useSelector(commentState$);
  const { currentUser } = useSelector(authState$);

  const handleReply = () => {
    dispatch(actions.showBoxComment.showBoxCommentRequest(comment._id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuNode.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setIsOpen(false);
    };
  }, []);

  const handleDeleteComment = async () => {
    setIsOpen(false);
    setIsDeleting(true);
    const res = await CommentAPI.deleteComment(comment._id);
    if (res.status === 200) {
      dispatch(actions.deleteComment.deleteCommentSuccess(res.data));
      dispatch(
        actions.toast.showToast({
          message: "Comment deleted",
          type: "success",
        })
      );
      socket?.emit("sendDeleteComment", {
        comment: res.data,
      });
    }
    setIsDeleting(false);
  };

  useEffect(() => {
    socket?.on("getDeleteComment", (data) => {
      if (comment._id === data.comment._id) {
        dispatch(actions.deleteComment.deleteCommentSuccess(data.comment));
      }
    });
  }, [comment, socket, dispatch]);

  return (
    <Container>
      <LeftSide>
        <AvatarLink to={`/profile/${comment.userId._id}`}>
          <Avatar src={comment.userId.avatar ? comment.userId.avatar : DefaultAvatar} />
        </AvatarLink>
      </LeftSide>

      <RightSide>
        <CommentContainer>
          <CommentWrapper>
            <CommentContent
              ref={currentReply}
              className={commentId === comment._id ? "post__comment replying" : "post__comment"}
            >
              <Name to={`/profile/${comment.userId._id}`} className="name__author">
                @{comment.userId.name}
              </Name>
              <Comment>{comment.comment}</Comment>
            </CommentContent>

            <BottomComment>
              <ReplyButton onClick={handleReply}>Reply</ReplyButton>
              <Time>{moment(comment.createdAt).fromNow()}</Time>
              <ReplyCount>
                {comment.reply.length === 0
                  ? null
                  : comment.reply.length + [comment.reply.length > 1 ? " replies" : " reply"]}
              </ReplyCount>
            </BottomComment>
          </CommentWrapper>

          {currentUser && (currentUser._id === comment.userId._id || currentUser._id === post.userId._id) && (
            <ButtonWrapper ref={menuNode}>
              {isDeleting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <>
                  <Button onClick={() => setIsOpen(!isOpen)}>
                    <Icon icon="akar-icons:more-horizontal" />
                  </Button>
                  <MenuActions isOpen={isOpen}>
                    <MenuItem onClick={handleDeleteComment}>Delete comment</MenuItem>
                  </MenuActions>
                </>
              )}
            </ButtonWrapper>
          )}
        </CommentContainer>

        {/* Reply Comment */}

        {commentId === comment._id ? (
          <>
            <ReplyWrapper>
              {comment.reply.map((reply) => (
                <ReplyComment
                  key={reply._id}
                  reply={reply}
                  commentId={comment._id}
                  currentUser={currentUser}
                  post={post}
                  socket={socket}
                />
              ))}
            </ReplyWrapper>

            <BoxComment isReply={true} comment={comment} socket={socket} />
          </>
        ) : null}

        {/* ---------------------- */}
      </RightSide>
    </Container>
  );
};

export default CommentItem;
