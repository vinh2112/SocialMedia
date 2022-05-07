import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";
import NewsFeed from "components/NewsfeedPage";
// import { postState$ } from "redux/selectors";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <NewsFeed />
    </>
  );
};

export default NewsFeedPage;
