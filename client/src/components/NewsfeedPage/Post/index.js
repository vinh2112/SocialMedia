import React, { useEffect, useState } from "react";
import { Container, PostTopTitle } from "./PostElements";
import PostItem from "./PostItem";

const Posts = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const URL = "https://picsum.photos/v2/list?page=7&limit=10";
        const response = await fetch(URL);
        const responseJSON = await response.json();
        console.log(responseJSON);

        setPostList(responseJSON);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      <Container>
        <PostTopTitle>
          <h3>Hoạt động gần đây</h3>
          <span></span>
        </PostTopTitle>

        {postList &&
          postList.map((post) => {
            return <PostItem key={post.id} post={post} />;
          })}
      </Container>
    </>
  );
};

export default Posts;
