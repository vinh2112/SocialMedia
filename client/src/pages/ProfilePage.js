import React, { useEffect } from "react";
import * as actions from "redux/actions";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import Profile from "components/ProfilePage";

export default function ProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    userId && dispatch(actions.getProfilePosts.getProfilePostsRequest(userId));
  }, [dispatch, userId]);

  return <Profile />;
}
