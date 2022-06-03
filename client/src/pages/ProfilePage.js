import React, { useEffect, useState } from "react";
import * as actions from "redux/actions";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import Profile from "components/ProfilePage";
import { UserAPI } from "api";
import Header from "components/Header";

export default function ProfilePage() {
  const { userId } = useParams();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const dispatch = useDispatch();

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
