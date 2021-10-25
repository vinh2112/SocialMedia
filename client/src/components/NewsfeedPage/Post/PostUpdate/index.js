import React from "react";
import { Container, AvatarLink, Avatar, OverLay, DescSection } from "./PostUpdateElements";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "redux/actions";
import { authState$ } from "redux/selectors";

const PostUpdate = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authState$);

  const handleModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);
  return (
    <Container>
      <AvatarLink to={`/${currentUser._id}`}>
        <Avatar src={currentUser.avatar} alt="avatar" />
        <OverLay></OverLay>
      </AvatarLink>
      <DescSection onClick={handleModal}>
        <div>What do you want to talk about?</div>
      </DescSection>
    </Container>
  );
};

export default PostUpdate;
