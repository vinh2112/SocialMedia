import React, { useState, useEffect } from "react";
import { Container, LoadingSection } from "./ListCommentElements";
import CommentItem from "./CommentItem";
import BoxComment from "./BoxComment";
import CommentAPI from "api/comments";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "redux/actions";
import { commentState$ } from "redux/selectors";

const ListComment = ({ boxComment, post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { data } = useSelector(commentState$);

  useEffect(() => {
    const fetchCommentsByPostId = async () => {
      const res = await CommentAPI.fetchComments(post._id);

      if (res.status === 200) {
        dispatch(fetchComments.fetchCommentsSuccess(res.data));
      }
      setIsLoading(false);
    };

    fetchCommentsByPostId();
  }, [dispatch, setIsLoading, post._id]);

  return (
    <Container>
      {isLoading ? (
        <LoadingSection />
      ) : (
        <>
          <BoxComment boxComment={boxComment} postId={post._id} />

          {data &&
            data.map((comment) => {
              return (
                comment.postId === post._id && (
                  <CommentItem key={comment._id} comment={comment} post={post} />
                )
              );
            })}
        </>
      )}
    </Container>
  );
};

export default ListComment;
