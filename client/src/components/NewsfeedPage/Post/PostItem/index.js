import React, { useState, useRef, useEffect } from "react";
import ListAction from "./ListAction";
import ListComment from "./ListComment";
import {
  PostContainer,
  PostTop,
  PostImage,
  PostAuthor,
  AuthorInfo,
  AvatarLink,
  Avatar,
  AvatarLetter,
  RightSide,
  AuthorName,
  PostCreated,
  Description,
  ToggleButton,
} from "./PostItemElements";
import moment from "moment";
import { saveAs } from "file-saver";

const getFirstLetter = (name) => {
  return name.charAt(0).toUpperCase();
};

const isOverflow = (e) => {
  return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
};

const PostItem = ({ post }) => {
  const [isDescShow, setIsDescShow] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);
  const postDesc = useRef();
  const boxComment = useRef();

  useEffect(() => {
    if (isOverflow(postDesc.current)) {
      setOverflow(true);
      return;
    }

    setOverflow(false);
  }, [setOverflow]);

  const handleShowComment = () => {
    if (!isShowComment) {
      setIsShowComment(true);
    } else {
      boxComment.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      boxComment.current.focus({ preventScroll: true });
    }
  };

  const handleDownload = async () => {
    saveAs(post.image.url, `${post.image.public_id}.png`);
  };

  return (
    <div>
      <PostContainer>
        <PostTop>
          <PostAuthor>
            <AuthorInfo>
              <AvatarLink to={`/profile/${post.userId._id}`}>
                {post.userId.avatar ? (
                  <Avatar src={post.userId.avatar} />
                ) : (
                  <AvatarLetter>
                    {post.userId.name
                      ? getFirstLetter(post.userId.name)
                      : getFirstLetter(post.userId.email)}
                  </AvatarLetter>
                )}
              </AvatarLink>
              <RightSide>
                <AuthorName to={`/profile/${post.userId._id}`}>
                  @{post.userId.name ? post.userId.name : post.userId.email}
                </AuthorName>
                <PostCreated>{moment(post.createdAt).toNow(true)}</PostCreated>
              </RightSide>
            </AuthorInfo>
            <Description isShow={isDescShow}>
              <pre className="post__desc" ref={postDesc}>
                {post.desc}
              </pre>

              {isDescShow || !overflow ? (
                <></>
              ) : (
                <ToggleButton onClick={() => setIsDescShow(!isDescShow)}>Load more</ToggleButton>
              )}
            </Description>
          </PostAuthor>
          <PostImage src={post.image.url} />
        </PostTop>
        <ListAction showComment={handleShowComment} post={post} downloadImage={handleDownload} />
        {isShowComment && <ListComment boxComment={boxComment} postId={post._id} />}
      </PostContainer>
    </div>
  );
};

export default PostItem;
