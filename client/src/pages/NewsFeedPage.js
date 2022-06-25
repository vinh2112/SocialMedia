import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";
import NewsFeed from "components/NewsfeedPage";
import Header from "components/Header";

const NewsFeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest());
    dispatch(actions.getTopLikedPosts.getTopLikedPostsRequest());

    return () => {
      dispatch(actions.resetPosts());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <NewsFeed />
    </>
  );
};

export default NewsFeedPage;
