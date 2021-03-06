import React, { useState, useEffect, useContext } from "react";
import { Container, LoadingSection } from "./ListCommentElements";
import CommentItem from "./CommentItem";
import BoxComment from "./BoxComment";
import CommentAPI from "api/comments";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "redux/actions";
import { commentState$ } from "redux/selectors";
import { SocketContext } from "context/socketContext";

const ListComment = ({ boxComment, post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { data } = useSelector(commentState$);
  const socket = useContext(SocketContext);

  const fetchCommentsByPostId = React.useCallback(
    async (postId) => {
      const res = await CommentAPI.fetchComments(postId);

      if (res.status === 200) {
        dispatch(fetchComments.fetchCommentsSuccess(res.data));
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    fetchCommentsByPostId(post._id);
  }, [post, fetchCommentsByPostId]);

  useEffect(() => {
    socket?.on("getUpdateCommentPost", ({ postId }) => {
      if (postId === post._id) {
        fetchCommentsByPostId(postId);
      }
    });
  }, [socket, post, fetchCommentsByPostId]);

  return (
    <Container>
      {isLoading ? (
        <LoadingSection />
      ) : (
        <>
          <BoxComment boxComment={boxComment} post={post} socket={socket} />

          {data &&
            data.map((comment) => {
              return (
                comment.postId === post._id && (
                  <CommentItem key={comment._id} comment={comment} post={post} socket={socket} />
                )
              );
            })}
        </>
      )}
    </Container>
  );
};

export default ListComment;
