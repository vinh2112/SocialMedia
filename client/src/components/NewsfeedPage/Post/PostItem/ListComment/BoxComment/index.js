import React, { useEffect, useState } from "react";
import { CommentForm, CommentArea, RightSide, SubmitButton, TextCount } from "./BoxCommentElements";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { authState$ } from "redux/selectors";
import * as actions from "redux/actions";

export default function BoxComment({ boxComment, isReply, postId, comment, socket }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authState$);

  useEffect(() => {
    return () => {
      setText("");
    };
  }, []);

  const handleTextarea = (e) => {
    if (e.target.value.length <= 200) {
      setText(e.target.value);
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
      if (postId && text.length > 0) {
        dispatch(
          actions.createComment.createCommentRequest({
            postId,
            comment: text.trim(),
          })
        );
        socket?.emit("sendUpdateCommentPost", {
          postId: postId,
        });
        setText("");
      } else if (comment && text.length > 0) {
        dispatch(
          actions.createReply.createReplyRequest({
            commentId: comment._id,
            comment: text.trim(),
          })
        );
        socket?.emit("sendUpdateCommentPost", {
          postId: comment.postId,
        });
        setText("");
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
        placeholder="Leave your comment ..."
        onChange={handleTextarea}
        onKeyDown={handleTextareaEnter}
        value={text}
      />
      <RightSide>
        <SubmitButton
          className={text.length > 0 ? "" : "disable"}
          disabled={text.length > 0 ? false : true}
          onClick={handleSubmit}
        >
          <Icon icon="fluent:send-16-regular" />
        </SubmitButton>
        <TextCount>{text.length}/200</TextCount>
      </RightSide>
    </CommentForm>
  );
}
