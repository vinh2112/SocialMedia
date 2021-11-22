import BoxComment from "components/NewsfeedPage/Post/PostItem/ListComment/BoxComment";
import CommentItem from "components/NewsfeedPage/Post/PostItem/ListComment/CommentItem";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

export default function ModalComments({ comments, post }) {
  return (
    <Container>
      <BoxComment postId={post._id} />
      {comments.map((comment, index) => (
        <CommentItem key={index} comment={comment} post={post} />
      ))}
    </Container>
  );
}
