import React, { useState, useEffect } from "react";
import { Container, LoadingSection } from "./ListCommentElements";
import CommentItem from "./CommentItem";
import BoxComment from "./BoxComment";
import CommentAPI from "api/comments";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "redux/actions";
import { commentState$ } from "redux/selectors";

const ListComment = ({ boxComment, postId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { data } = useSelector(commentState$);

  useEffect(() => {
    const fetchCommentsByPostId = async () => {
      const res = await CommentAPI.fetchComments(postId);

      if (res.status === 200) {
        dispatch(fetchComments.fetchCommentsSuccess(res.data));
      }
      setIsLoading(false);
    };

    fetchCommentsByPostId();
  }, [dispatch, setIsLoading, postId]);

  return (
    <Container>
      {isLoading ? (
        <LoadingSection />
      ) : (
        <>
          <BoxComment boxComment={boxComment} postId={postId} />

          {data &&
            data.map((comment) => {
              return (
                comment.postId === postId && (
                  <CommentItem key={comment._id} comment={comment} />
                )
              );
            })}
        </>
      )}
    </Container>
  );
};

export default ListComment;
