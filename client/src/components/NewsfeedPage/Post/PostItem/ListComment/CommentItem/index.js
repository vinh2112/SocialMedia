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
  Time,
} from "./CommentItemElements";

const CommentItem = () => {
  return (
    <Container>
      <LeftSide>
        <AvatarLink to="">
          <Avatar src="https://picsum.photos/200/300?random=1" />
        </AvatarLink>
      </LeftSide>

      <RightSide>
        <CommentContent>
          <Name to="">Alejandro Escamilla</Name>
          <Comment>come here with me 🥺</Comment>
        </CommentContent>
        <Time>1h</Time>
      </RightSide>
    </Container>
  );
};

export default CommentItem;
