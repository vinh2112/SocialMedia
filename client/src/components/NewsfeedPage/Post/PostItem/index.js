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

  useEffect(() => {
    if (isOverflow(postDesc.current)) {
      setOverflow(true);
      return;
    }

    setOverflow(false);
  }, [setOverflow]);

  return (
    <div>
      <PostContainer>
        <PostTop>
          <PostAuthor>
            <AuthorInfo>
              <AvatarLink to="#">
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
                <AuthorName to="#">
                  @{post.userId.name ? post.userId.name : post.userId.email}
                </AuthorName>
                <PostCreated>
                  {moment(post.createdAt).fromNow().toUpperCase()}
                </PostCreated>
              </RightSide>
            </AuthorInfo>
            <Description isShow={isDescShow}>
              <pre className="post__desc" ref={postDesc}>
                {post.desc}
              </pre>

              {isDescShow || !overflow ? (
                <></>
              ) : (
                <ToggleButton onClick={() => setIsDescShow(!isDescShow)}>
                  Load more
                </ToggleButton>
              )}
            </Description>
          </PostAuthor>
          <PostImage src={post.image} />
        </PostTop>
        <ListAction
          isShowComment={isShowComment}
          setIsShowComment={setIsShowComment}
          post={post}
        />
        {isShowComment && <ListComment />}
      </PostContainer>
    </div>
  );
};

export default PostItem;
