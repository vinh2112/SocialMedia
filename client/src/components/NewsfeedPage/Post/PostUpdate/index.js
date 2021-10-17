import React from "react";
import {
  Container,
  AvatarLink,
  Avatar,
  OverLay,
  DescSection,
} from "./PostUpdateElements";
import PostUpdateModal from "./PostUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "redux/actions";
import { modalState$, authState$ } from "redux/selectors";

const PostUpdate = () => {
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);
  const { currentUser } = useSelector(authState$);

  const handleModal = React.useCallback(() => {
    dispatch(showModal());
    if (!isShow) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = null;
    }
  }, [dispatch, isShow]);
  return (
    <Container>
      <AvatarLink to={`/${currentUser._id}`}>
        <Avatar src={currentUser.avatar} alt="avatar" />
        <OverLay></OverLay>
      </AvatarLink>
      <DescSection onClick={handleModal}>
        <div>What do you want to talk about?</div>
      </DescSection>
      <PostUpdateModal user={currentUser} />
    </Container>
  );
};

export default PostUpdate;
