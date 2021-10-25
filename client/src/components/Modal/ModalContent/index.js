import React, { useEffect, useRef, useState } from "react";
import {
  AuthorName,
  AuthorWrapper,
  Avatar,
  AvatarLink,
  AvatarWrapper,
  Container,
  ContentTop,
  CreatedDate,
  Desc,
  DescWrapper,
  LoadmoreButton,
} from "./ModalContentElements";
import moment from "moment";

const EllipsisActive = (e) => {
  return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
};

export default function ModalContent({ post }) {
  const [isOverflow, setIsOverflow] = useState(true);
  const descRef = useRef();

  useEffect(() => {
    if (EllipsisActive(descRef.current)) {
      setIsOverflow(true);
    } else {
      setIsOverflow(false);
    }
  }, [post]);

  const handleOverflow = () => {
    setIsOverflow(false);
  };

  return (
    <Container>
      <ContentTop>
        <AvatarWrapper>
          <AvatarLink to="#">
            <Avatar src={`${post.userId.avatar}`} />
          </AvatarLink>
        </AvatarWrapper>

        <AuthorWrapper>
          <AuthorName to="#">@{post.userId.name}</AuthorName>
          <CreatedDate>{moment(post.createdAt).fromNow()}</CreatedDate>
        </AuthorWrapper>
      </ContentTop>
      <DescWrapper ref={descRef} isOverflow={isOverflow}>
        <Desc>{post.desc}</Desc>
      </DescWrapper>
      {isOverflow && <LoadmoreButton onClick={handleOverflow}>Load more</LoadmoreButton>}
    </Container>
  );
}
