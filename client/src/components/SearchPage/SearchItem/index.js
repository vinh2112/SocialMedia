import React from "react";
import { useHistory } from "react-router-dom";
import { OverLay, SearchItemContainer, WatchButton } from "./SearchItemContainerElements";

const SearchItem = ({ post, index, showModal }) => {
  const history = useHistory();

  const heightRef = React.useRef(Math.random() * 100 + 230);
  const handleShowModal = () => {
    // const indexPost = index;
    // showModal(indexPost);
    history.push(`/post/${post._id}`);
  };

  return (
    <SearchItemContainer onClick={handleShowModal}>
      <img loading="lazy" src={post.image.watermark} alt="" style={{ height: heightRef.current }} />

      <OverLay>
        <WatchButton>Watch Now</WatchButton>
      </OverLay>
    </SearchItemContainer>
  );
};

export default SearchItem;
