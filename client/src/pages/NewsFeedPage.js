import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "redux/actions";
import NewsFeed from "components/NewsfeedPage";
import { postState$ } from "redux/selectors";

const NewsFeedPage = () => {
  const [page, setPage] = useState(1);
  const { isLoading } = useSelector(postState$);
  const dispatch = useDispatch();

  useEffect(() => {
    const scrollWindow = () => {
      if (
        Math.abs(
          window.innerHeight +
            document.documentElement.scrollTop -
            document.documentElement.offsetHeight
        ) <= 200
      ) {
        if (!isLoading) {
          setPage(page + 1);
        }
      }
    };

    window.addEventListener("scroll", scrollWindow);

    return () => {
      window.removeEventListener("scroll", scrollWindow);
    };
  }, [page, isLoading]);

  useEffect(() => {
    if (page !== 1) {
      dispatch(actions.getPostsLoadMore.getPostsLoadMoreRequest(page));
    }
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(actions.resetPosts());
    dispatch(actions.getPosts.getPostsRequest());
    dispatch(actions.getTopLikedPosts.getTopLikedPostsRequest());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <NewsFeed />;
};

export default NewsFeedPage;
