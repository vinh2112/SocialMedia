import React from "react";
import { Container, PostTopTitle } from "./PostElements";
import PostItem from "./PostItem";
import PostUpdate from "./PostUpdate";
import { useSelector } from "react-redux";
import { postState$ } from "../../../redux/selectors";

const Posts = ({ direction }) => {
  const posts = useSelector(postState$);

  return (
    <>
      <Container direction={direction}>
        <PostUpdate />

        <PostTopTitle>
          <h3>Hoạt động gần đây</h3>
          <span></span>
        </PostTopTitle>

        {posts.data.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </Container>
    </>
  );
};

export default Posts;
