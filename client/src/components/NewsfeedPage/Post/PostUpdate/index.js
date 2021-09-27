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
import { modalState$ } from "redux/selectors";

const PostUpdate = () => {
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);

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
      <AvatarLink to="">
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyGhZ2XZ2g5GMdJ77A7r1poypRUq1o2zLRSbBMYdxqg3aDJkmgW5wg9jd4Iq3jaq9qhc&usqp=CAU"
          alt="photo"
        />
        <OverLay></OverLay>
      </AvatarLink>
      <DescSection onClick={handleModal}>
        <div>What do you want to talk about?</div>
      </DescSection>
      <PostUpdateModal />
    </Container>
  );
};

export default PostUpdate;
