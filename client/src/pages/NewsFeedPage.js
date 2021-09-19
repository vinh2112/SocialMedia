import React, { Suspense, lazy } from "react";
const NewsFeed = lazy(() => import("../components/NewsfeedPage"));

const NewsFeedPage = () => {
  return (
    <Suspense
      fallback={<div style={{ paddingTop: "80px" }}>Loading .....</div>}
    >
      <NewsFeed />
    </Suspense>
  );
};

export default NewsFeedPage;
