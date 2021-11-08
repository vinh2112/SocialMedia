import React from "react";
import SearchItem from "../SearchItem";
import { CustomCard, CustomSkeleton, SearchListContainer } from "./SearchListElements";

export default function SearchList({ posts, showModal }) {
  return (
    <SearchListContainer>
      {posts.length !== 0
        ? posts.map((post, index) => (
            <SearchItem key={index} post={post} index={index} showModal={showModal} />
          ))
        : [...Array(5)].map((item, index) => <LoadingItem key={index} />)}
    </SearchListContainer>
  );
}

const LoadingItem = () => {
  return (
    <>
      <CustomCard sx={{ borderRadius: "10px" }}>
        <CustomSkeleton animation="wave" variant="rectangular" width="100%" height="200px" />
      </CustomCard>
    </>
  );
};
