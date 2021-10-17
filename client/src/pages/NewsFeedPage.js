import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";
import NewsFeed from "components/NewsfeedPage";

const NewsFeedPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(actions.getPosts.getPostsRequest());
  }, [dispatch]);

  return <NewsFeed />;
};

export default NewsFeedPage;
