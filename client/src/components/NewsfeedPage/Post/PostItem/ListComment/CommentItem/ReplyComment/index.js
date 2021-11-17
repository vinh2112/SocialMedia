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

export default function ReplyComment({ reply, commentId, currentUser }) {
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
    }
  };

  return (
    <Container>
      <LeftSide>
        <AvatarLink to={`/profile/${reply.user._id}`}>
          <Avatar src={reply.user.avatar} alt="avatar" />
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
              <Time>{moment(reply?.createdAt).toNow(true)}</Time>
            </BottomComment>
          </CommentWrapper>

          {currentUser && (
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
