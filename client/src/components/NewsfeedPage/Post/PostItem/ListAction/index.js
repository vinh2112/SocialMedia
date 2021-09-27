import React, { useEffect, useState, useRef } from "react";
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

const ListAction = ({ isShowComment, setIsShowComment, post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuNode = useRef();
  const dispatch = useDispatch();
  const user = useSelector(authState$);

  useEffect(() => {
    const checkLiked = () => {
      if (user.currentUser) {
        const isLiked = post.likes.find((like) => {
          return like._id === user.currentUser._id;
        });
        if (isLiked) setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };

    const handleOutSide = (e) => {
      if (!menuNode.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutSide);
    checkLiked();
    return () => {
      document.removeEventListener("mousedown", handleOutSide);
    };
  }, [setIsOpen, post, user]);

  const handleReact = () => {
    setIsLiked(!isLiked);
    dispatch(actions.reactPost.reactPostRequest(post._id));
  };

  return (
    <ActionContainer>
      <LikeAction onClick={handleReact}>
        {isLiked ? (
          <Icon
            icon="ant-design:heart-filled"
            style={{ color: "var(--primary-color)" }}
          />
        ) : (
          <Icon icon="ant-design:heart-outlined" />
        )}
        <span>{post.likes.length} likes</span>
      </LikeAction>

      <CommentAction onClick={() => setIsShowComment(!isShowComment)}>
        <Icon icon="fluent:comment-24-regular" />
        <span>Comment</span>
      </CommentAction>

      <MoreAction ref={menuNode} onClick={() => setIsOpen(!isOpen)}>
        <Icon icon="carbon:overflow-menu-horizontal" />
        <ActionMenu isOpen={isOpen}>
          <MenuItem>
            <Icon icon="fluent:arrow-download-16-filled" />
            <Title>Download</Title>
            <Icon icon="ant-design:dollar-circle-filled" />
          </MenuItem>
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
