import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postState$ } from "redux/selectors";
import {
  CustomCard,
  CustomSkeleton,
  PostChartContainer,
  PostChartItem,
  PostChartWrapper,
  PostTopTitle,
} from "./PostChartElements";
// import Modal from "components/Modal";

export default function PostChart() {
  // const [index, setIndex] = useState(null);
  // const [isShowModal, setIsShowModal] = useState(false);
  const { topLiked } = useSelector(postState$);
  const history = useHistory();

  const handleViewPost = (index) => {
    // setIndex(index);
    // handleModal();
    history.push(`post/${topLiked[index]._id}`);
  };

  // const handleModal = () => {
  //   if (isShowModal) {
  //     setIsShowModal(false);
  //   } else {
  //     setIsShowModal(true);
  //   }
  // };

  return (
    <>
      <PostChartContainer>
        <PostTopTitle>
          <div className="title">Top Liked</div>
          {/* <div></div> */}
        </PostTopTitle>
        <PostChartWrapper>
          {topLiked
            ? topLiked.map((post, index) => (
                <PostChartItem
                  key={index}
                  onClick={() => handleViewPost(index)}
                  style={{
                    backgroundImage: `url(${post.image.watermark})`,
                  }}
                />
              ))
            : [...Array(3)].map((item, index) => <PostChartItemLoading key={index} />)}
        </PostChartWrapper>
      </PostChartContainer>
      {/* {(index || index === 0) && isShowModal && (
        <Modal post={topLiked[index]} isShow={isShowModal} closeModal={handleModal} />
      )} */}
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
