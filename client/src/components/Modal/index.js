import React, { useEffect, useState } from "react";
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

export default function Modal({ post, isShow, closeModal }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector(commentState$);
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();

    return () => allowScroll();
  }, [blockScroll, allowScroll]);

  useEffect(() => {
    const fetchCommentsByPostId = async () => {
      const res = await CommentAPI.fetchComments(post._id);

      if (res.status === 200) {
        dispatch(fetchComments.fetchCommentsSuccess(res.data));
      }
      setIsLoading(false);
    };
    if (isLoading) {
      fetchCommentsByPostId();
    }
  }, [dispatch, isLoading, post]);

  return (
    <ModalContainer isShow={isShow}>
      <ModalForm>
        <ModalPhotoWrapper>
          <ModalPhoto
            style={{
              backgroundImage: `url(${post.image.url})`,
            }}
          />
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
