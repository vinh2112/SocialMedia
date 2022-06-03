import React from "react";
import SearchItem from "../SearchItem";
import { CustomCard, CustomSkeleton, SearchListContainer } from "./SearchListElements";
import InfiniteScroll from "react-infinite-scroll-component";
import StackGrid from "react-stack-grid";

export default function SearchList({ posts, showModal, next, isLoading }) {
  return (
    <SearchListContainer>
      <InfiniteScroll
        dataLength={posts.length}
        next={next}
        hasMore={true}
        scrollableTarget="scroll-node"
        scrollThreshold="200px"
      >
        <StackGrid
          columnWidth={875 / 5}
          monitorImagesLoaded={true}
          duration={0}
          gutterWidth={10}
          gutterHeight={10}
        >
          {posts.length !== 0
            ? posts.map((post, index) => (
                <SearchItem key={index} post={post} index={index} showModal={showModal} />
              ))
            : [...Array(2)].map((item, index) => <LoadingItem key={index} />)}
          {isLoading && [...Array(3)].map((item, index) => <LoadingItem key={index} />)}
        </StackGrid>
      </InfiniteScroll>
    </SearchListContainer>
  );
}

const LoadingItem = () => {
  const randomHeight = () => {
    let height = Math.random() * 100 + 250;
    return height;
  };
  return (
    <>
      <CustomCard sx={{ borderRadius: "10px" }}>
        <CustomSkeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={randomHeight()}
        />
      </CustomCard>
    </>
  );
};
