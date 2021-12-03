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
} from "./CommentItemElements";
import { Icon } from "@iconify/react";
import moment from "moment";
import * as actions from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { authState$, commentState$ } from "redux/selectors";
import { CommentAPI } from "api";
import ReplyComment from "./ReplyComment";
import DefaultAvatar from "images/DefaultAvatar.png";

const CommentItem = ({ comment, post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentReply = useRef();
  const menuNode = useRef();
  const dispatch = useDispatch();
  const { commentId } = useSelector(commentState$);
  const { currentUser } = useSelector(authState$);

  const handleReply = () => {
    const prevReply = document.querySelectorAll(".post__comment.replying");
    if (prevReply.length > 0) {
      [].forEach.call(prevReply, (el) => {
        el.classList.remove("replying");
      });
    }

    currentReply.current.classList.add("replying");
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
    const res = await CommentAPI.deleteComment(comment._id);
    if (res.status === 200) {
      dispatch(actions.deleteComment.deleteCommentSuccess(res.data));
      dispatch(
        actions.toast.showToast({
          message: "Comment deleted",
          type: "success",
        })
      );
      setIsOpen(false);
    }
  };

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
            <CommentContent ref={currentReply} className="post__comment">
              <Name to={`/profile/${comment.userId._id}`} className="name__author">
                @{comment.userId.name}
              </Name>
              <Comment>{comment.comment}</Comment>
            </CommentContent>

            <BottomComment>
              <ReplyButton onClick={handleReply}>Reply</ReplyButton>
              <Time>{moment(comment.createdAt).fromNow()}</Time>
            </BottomComment>
          </CommentWrapper>

          {currentUser &&
            (currentUser._id === comment.userId._id || currentUser._id === post.userId._id) && (
              <ButtonWrapper ref={menuNode}>
                <Button onClick={() => setIsOpen(!isOpen)}>
                  <Icon icon="akar-icons:more-horizontal" />
                </Button>
                <MenuActions isOpen={isOpen}>
                  <MenuItem onClick={handleDeleteComment}>Delete comment</MenuItem>
                </MenuActions>
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
                />
              ))}
            </ReplyWrapper>

            <BoxComment isReply={true} commentId={comment._id} />
          </>
        ) : null}

        {/* ---------------------- */}
      </RightSide>
    </Container>
  );
};

export default CommentItem;
