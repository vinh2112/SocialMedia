import React, { useEffect, useState } from "react";
import { InfoWrapper, LikeButton, LikeButtonWrapper, Likes } from "./ModalInfoElements";
import { Icon } from "@iconify/react";
import { authState$ } from "redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "redux/actions";

export default function ModalInfo({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser } = useSelector(authState$);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialLike = () => {
      if (currentUser) {
        const isLiked = post.likes.find((like) => {
          return like._id === currentUser._id;
        });
        if (isLiked) setIsLiked(true);
      }
    };
    initialLike();
    return () => {
      setIsLiked(false);
    };
  }, [currentUser, post]);

  const handleReact = () => {
    // Check Log in status - if false redirect to login page
    if (currentUser) {
      setIsLiked(!isLiked);
      dispatch(actions.reactPost.reactPostRequest(post._id));
    } else {
      // history.push("/login");
      dispatch(
        actions.toast.showToast({
          message: "Please Login",
          type: "warning",
        })
      );
    }
  };

  return (
    <InfoWrapper>
      <Likes>{post.likes.length} likes</Likes> ● 123 comments
      <LikeButtonWrapper>
        <LikeButton onClick={handleReact}>
          {isLiked ? (
            <Icon icon="ant-design:heart-filled" style={{ color: "var(--primary-color)" }} />
          ) : (
            <Icon icon="ant-design:heart-outlined" />
          )}
        </LikeButton>
      </LikeButtonWrapper>
    </InfoWrapper>
  );
}
