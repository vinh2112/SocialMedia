import React, { useState } from "react";
import {
  ActionContainer,
  LikeAction,
  CommentAction,
  MoreAction,
} from "./ListActionElements";
import { Icon } from "@iconify/react";

const ListAction = ({ isShowComment, setIsShowComment }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <ActionContainer>
      <LikeAction onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? (
          <Icon
            icon="ant-design:heart-filled"
            style={{ color: "var(--primary-color)" }}
          />
        ) : (
          <Icon icon="ant-design:heart-outlined" />
        )}
        <span>1024 likes</span>
      </LikeAction>

      <CommentAction onClick={() => setIsShowComment(!isShowComment)}>
        <Icon icon="fluent:comment-24-regular" />
        <span>Comment</span>
      </CommentAction>

      <MoreAction>
        <Icon icon="carbon:overflow-menu-horizontal" />
      </MoreAction>
    </ActionContainer>
  );
};

export default ListAction;
