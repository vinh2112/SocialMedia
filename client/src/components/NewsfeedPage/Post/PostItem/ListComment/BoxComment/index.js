import React, { useState } from "react";
import {
  CommentForm,
  CommentArea,
  RightSide,
  SubmitButton,
  TextCount,
} from "./BoxCommentElements";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { authState$ } from "redux/selectors";
import * as actions from "redux/actions";

export default function BoxComment({ boxComment, isReply, postId, commentId }) {
  const [data, setData] = useState({
    comment: "",
    postId,
    commentId,
  });
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authState$);

  const handleTextarea = (e) => {
    if (e.target.value.length <= 200) {
      setData({ ...data, comment: e.target.value });
      e.target.style.height = "32px";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  const handleTextareaEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      if (data.postId && data.comment.length > 0) {
        dispatch(
          actions.createComment.createCommentRequest({
            ...data,
            comment: data.comment.trim(),
          })
        );
        setData({ ...data, comment: "" });
      } else if (data.commentId && data.comment.length > 0) {
        dispatch(
          actions.createReply.createReplyRequest({
            ...data,
            comment: data.comment.trim(),
          })
        );
        setData({ ...data, comment: "" });
      }
    } else {
      dispatch(
        actions.toast.showToast({
          message: "Please Login",
          type: "warning",
        })
      );
    }
  };
  return (
    <CommentForm isReply={isReply}>
      <CommentArea
        ref={boxComment}
        type="text"
        placeholder="Nhập bình luận ..."
        onChange={handleTextarea}
        onKeyDown={handleTextareaEnter}
        value={data.comment}
      />
      <RightSide>
        <SubmitButton
          className={data.comment.length > 0 ? "" : "disable"}
          disabled={data.comment.length > 0 ? false : true}
          onClick={handleSubmit}
        >
          <Icon icon="fluent:send-16-regular" />
        </SubmitButton>
        <TextCount>{data.comment.length}/200</TextCount>
      </RightSide>
    </CommentForm>
  );
}
