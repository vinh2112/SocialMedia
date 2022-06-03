import React, { useContext, useEffect, useState } from "react";
import {
  ModalCloseButton,
  ModalCloseWrapper,
  ModalContainer,
  ModalContentContainer,
  ModalContentWrapper,
  ModalForm,
  ModalPhoto,
  ModalPhotoWrapper,
} from "./ModalElements";
import { Icon } from "@iconify/react";
import ModalActions from "./ModalActions";
import ModalContent from "./ModalContent";
import ModalInfo from "./ModalInfo";
import { useDispatch, useSelector } from "react-redux";
import { commentState$ } from "redux/selectors";
import { fetchComments } from "redux/actions";
import CommentAPI from "api/comments";
import ModalComments from "./ModalComments";
import ModalReport from "./ModalReport";
import useScrollBlock from "hooks/useScrollBlock";
import { SocketContext } from "context/socketContext";
import { Link } from "react-router-dom";

export default function Modal({ post, isShow, closeModal }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector(commentState$);
  const socket = useContext(SocketContext);
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();

    return () => allowScroll();
  }, [blockScroll, allowScroll]);

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
    if (isLoading) {
      fetchCommentsByPostId(post._id);
    }
  }, [isLoading, fetchCommentsByPostId, post]);

  useEffect(() => {
    socket?.on("getUpdateCommentPost", ({ postId }) => {
      if (postId === post._id) {
        fetchCommentsByPostId(postId);
      }
    });
  }, [socket, post, fetchCommentsByPostId]);

  return (
    <ModalContainer isShow={isShow}>
      <ModalForm>
        <ModalPhotoWrapper>
          <ModalPhoto
            style={{
              backgroundImage: `url(${post.image.watermark})`,
            }}
          ></ModalPhoto>
          <div className="modal__categories">
            {post.category.map((cate, index) => (
              <Link to="#" key={index}>
                #{cate}
              </Link>
            ))}
          </div>
        </ModalPhotoWrapper>

        <ModalContentContainer>
          <ModalActions post={post} handleEdit={setIsEditing} />
          <ModalContentWrapper>
            {!isEditing ? (
              <>
                <ModalContent post={post} />
                <ModalInfo
                  post={post}
                  comments={comments.data.filter(
                    (comment) => comment.postId === post._id && comment
                  )}
                />
                <ModalComments
                  post={post}
                  comments={comments.data.filter(
                    (comment) => comment.postId === post._id && comment
                  )}
                  socket={socket}
                />
              </>
            ) : (
              <ModalReport handleEdit={setIsEditing} postId={post._id} />
            )}
          </ModalContentWrapper>
        </ModalContentContainer>

        <ModalCloseWrapper>
          <ModalCloseButton onClick={closeModal}>
            <Icon icon="eva:close-fill" />
          </ModalCloseButton>
        </ModalCloseWrapper>
      </ModalForm>
    </ModalContainer>
  );
}
