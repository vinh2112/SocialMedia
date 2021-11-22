import React, { useEffect, useState } from "react";
import * as actions from "redux/actions";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Profile from "components/ProfilePage";
import { postState$ } from "redux/selectors";
import { UserAPI } from "api";
import Header from "components/Header";

export default function ProfilePage() {
  const { userId } = useParams();
  const [page, setPage] = useState(1);
  const { isLoading } = useSelector(postState$);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    userId && dispatch(actions.getProfilePosts.getProfilePostsRequest({ userId, page }));
  }, [dispatch, userId, page]);

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
  }, [isLoading, page]);

  useEffect(() => {
    const getProfileUser = async () => {
      try {
        setIsProfileLoading(true);
        const profile = await UserAPI.getProfileUser(userId);
        if (profile) {
          dispatch(actions.getProfileUser(profile.data));
          setIsProfileLoading(false);
        }
      } catch (error) {
        return error;
      }
    };
    getProfileUser();
    window.scrollTo(0, 0);

    return () => {
      dispatch(actions.resetPosts());
    };
  }, [userId, dispatch]);
  return (
    <>
      <Header />
      <Profile isProfileLoading={isProfileLoading} />
    </>
  );
}
