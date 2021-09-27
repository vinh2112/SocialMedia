import React from "react";
import {
  Container,
  LeftSide,
  AvatarLink,
  Avatar,
  RightSide,
  CommentContent,
  Name,
  Comment,
  BottomComment,
  ReplyButton,
  Time,
} from "./CommentItemElements";

const CommentItem = () => {
  return (
    <Container>
      <LeftSide>
        <AvatarLink to="">
          <Avatar src="https://s.ws.pho.to/img/index/ai/source.jpg" />
        </AvatarLink>
      </LeftSide>

      <RightSide>
        <CommentContent>
          <Name to="">Alejandro Escamilla</Name>
          <Comment>come here with me 🥺</Comment>
        </CommentContent>
        <BottomComment>
          <Time>1h</Time>
          <ReplyButton>Reply</ReplyButton>
        </BottomComment>
      </RightSide>
    </Container>
  );
};

export default CommentItem;
