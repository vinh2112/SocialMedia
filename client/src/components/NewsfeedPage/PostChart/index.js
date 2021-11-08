import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postState$ } from "redux/selectors";
import {
  CustomCard,
  CustomSkeleton,
  PostChartContainer,
  PostChartItem,
  PostChartWrapper,
} from "./PostChartElements";
import Modal from "components/Modal";
import { PostTopTitle } from "../Post/PostElements";

export default function PostChart() {
  const [currentPost, setCurrentPost] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const { topLiked } = useSelector(postState$);

  const handleViewPost = (post) => {
    setCurrentPost(post);
    handleModal();
  };

  const handleModal = () => {
    if (isShowModal) {
      setIsShowModal(false);
    } else {
      setIsShowModal(true);
    }
  };

  return (
    <>
      <PostChartContainer>
        <PostTopTitle>
          <h3>Top Liked</h3>
          <span></span>
        </PostTopTitle>
        <PostChartWrapper>
          {topLiked
            ? topLiked.map((post, index) => (
                <PostChartItem
                  key={index}
                  onClick={() => handleViewPost(post)}
                  style={{
                    backgroundImage: `url(${post.image.url})`,
                  }}
                />
              ))
            : [...Array(6)].map((item, index) => <PostChartItemLoading key={index} />)}
        </PostChartWrapper>
      </PostChartContainer>
      {currentPost && <Modal post={currentPost} isShow={isShowModal} closeModal={handleModal} />}
    </>
  );
}

const PostChartItemLoading = () => {
  return (
    <>
      <CustomCard>
        <CustomSkeleton variant="rectangular" animation="wave" height="100%" width="100%" />
      </CustomCard>
    </>
  );
};
