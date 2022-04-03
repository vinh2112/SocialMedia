import { Icon } from "@iconify/react";
import { CommentAPI } from "api";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  AvatarLink,
  BottomComment,
  Button,
  ButtonWrapper,
  Comment,
  CommentContainer,
  CommentContent,
  CommentWrapper,
  LeftSide,
  MenuActions,
  MenuItem,
  Name,
  RightSide,
  Time,
} from "../CommentItemElements";
import { Container } from "./ReplyCommentElements";
import * as actions from "redux/actions";
import moment from "moment";
import DefaultAvatar from "images/DefaultAvatar.png";

export default function ReplyComment({ reply, commentId, currentUser, post, socket }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuNode = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuNode.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteComment = async () => {
    const res = await CommentAPI.deleteReplyComment({
      replyId: reply._id,
      commentId,
    });
    if (res.status === 200) {
      dispatch(actions.deleteReply.deleteReplySuccess(res.data));
      dispatch(
        actions.toast.showToast({
          message: "Comment deleted",
          type: "success",
        })
      );
      socket?.emit("sendDeleteReply", {
        comment: res.data,
      });
    }
  };

  useEffect(() => {
    socket?.on("getDeleteReply", (data) => {
      if (commentId === data.comment._id) {
        dispatch(actions.deleteReply.deleteReplySuccess(data.comment));
      }
    });
  }, [commentId, socket, dispatch]);

  return (
    <Container>
      <LeftSide>
        <AvatarLink to={`/profile/${reply.user._id}`}>
          <Avatar src={reply.user.avatar ? reply.user.avatar : DefaultAvatar} alt="avatar" />
        </AvatarLink>
      </LeftSide>

      <RightSide>
        <CommentContainer>
          <CommentWrapper>
            <CommentContent>
              <Name to={`/profile/${reply.user._id}`}>@{reply.user.name}</Name>
              <Comment>{reply.replyComment}</Comment>
            </CommentContent>
            <BottomComment>
              <Time>{moment(reply?.createdAt).fromNow()}</Time>
            </BottomComment>
          </CommentWrapper>

          {currentUser &&
            (currentUser._id === reply.user._id || currentUser._id === post.userId._id) && (
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
      </RightSide>
    </Container>
  );
}
