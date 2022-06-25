import React from "react";
import Header from "components/Header";
import ViewPost from "components/ViewPostPage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as api from "api";
import * as actions from "redux/actions";
import { postState$ } from "redux/selectors";

export default function ViewPostPage() {
  const { id } = useParams();
  const { data } = useSelector(postState$);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        await api.PostAPI.fetchPost(id).then((res) => dispatch(actions.getPosts.getPostsSuccess([res.data])));
      }
    };

    fetchPost();
  }, [id, dispatch]);

  React.useEffect(() => {
    const scrollNode = document.querySelector("#scroll-node");
    scrollNode.scrollTop = 0;
  }, [data]);

  React.useEffect(() => {
    return () => {
      dispatch(actions.resetPosts());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <ViewPost post={data[0]} />
    </>
  );
}
