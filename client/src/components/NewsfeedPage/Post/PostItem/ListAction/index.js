import React, { useEffect, useState, useRef } from "react";
// import { useHistory } from "react-router-dom";
import {
  ActionContainer,
  LikeAction,
  CommentAction,
  MoreAction,
  ActionMenu,
  MenuItem,
  Title,
} from "./ListActionElements";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "redux/actions";
import { authState$ } from "redux/selectors";

const ListAction = ({ showComment, post, downloadImage }) => {
  // const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const menuNode = useRef();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authState$);
  const [isLiked, setIsLiked] = useState(false);

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

  useEffect(() => {
    const handleOutSide = (e) => {
      if (!menuNode.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutSide);
    return () => {
      document.removeEventListener("mousedown", handleOutSide);
    };
  }, [setIsOpen]);

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
    <ActionContainer>
      <LikeAction onClick={handleReact}>
        {isLiked ? (
          <Icon icon="ant-design:heart-filled" style={{ color: "var(--primary-color)" }} />
        ) : (
          <Icon icon="ant-design:heart-outlined" />
        )}
        <span>Like</span>
      </LikeAction>

      <CommentAction onClick={showComment}>
        <Icon icon="fluent:comment-24-regular" />
        <span>Comment</span>
      </CommentAction>

      <MoreAction ref={menuNode} onClick={() => setIsOpen(!isOpen)}>
        <Icon icon="carbon:overflow-menu-horizontal" />
        <ActionMenu isOpen={isOpen}>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              downloadImage();
            }}
          >
            <Icon icon="fluent:arrow-download-16-filled" />
            <Title>Download</Title>
          </MenuItem>
          {post?.userId._id === currentUser?._id && (
            <MenuItem className="danger">
              <Icon icon="feather:delete" />
              <Title>Delete post</Title>
            </MenuItem>
          )}
          <MenuItem className="danger">
            <Icon icon="jam:triangle-danger" />
            <Title>Report</Title>
          </MenuItem>
        </ActionMenu>
      </MoreAction>
    </ActionContainer>
  );
};

export default ListAction;
