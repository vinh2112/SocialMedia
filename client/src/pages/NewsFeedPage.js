import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "redux/actions";
const NewsFeed = lazy(() => import("../components/NewsfeedPage"));

const NewsFeedPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest());
  }, [dispatch]);

  return (
    <Suspense
      fallback={<div style={{ paddingTop: "80px" }}>Loading .....</div>}
    >
      <NewsFeed />
    </Suspense>
  );
};

export default NewsFeedPage;
