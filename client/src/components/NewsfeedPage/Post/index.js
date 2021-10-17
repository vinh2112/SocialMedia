import React from "react";
import { Container, PostTopTitle } from "./PostElements";
import PostItem from "./PostItem";
import PostUpdate from "./PostUpdate";
import { useSelector } from "react-redux";
import { authState$, postState$ } from "../../../redux/selectors";
import { useParams } from "react-router";

const Posts = ({ direction }) => {
  const { data } = useSelector(postState$);
  const { currentUser } = useSelector(authState$);

  const { userId } = useParams();

  return (
    <>
      <Container direction={direction}>
        {userId
          ? [userId === currentUser?._id && <PostUpdate key="0" />]
          : [currentUser && <PostUpdate key="1" />]}

        <PostTopTitle>
          <h3>Hoạt động gần đây</h3>
          <span></span>
        </PostTopTitle>

        {data.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </Container>
    </>
  );
};

export default Posts;
