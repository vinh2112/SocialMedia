import React, { useEffect, useState } from "react";
import { Container, CustomCard, CustomSkeleton, PostTopTitle } from "./PostElements";
import PostItem from "./PostItem";
import PostUpdate from "./PostUpdate";
import { useDispatch, useSelector } from "react-redux";
import { authState$, postState$ } from "../../../redux/selectors";
import { useParams } from "react-router";
import { CardContent, CardHeader } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import * as actions from "redux/actions";

const Posts = ({ direction }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSelector(postState$);
  const { currentUser } = useSelector(authState$);
  const dispatch = useDispatch();

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(actions.getProfilePosts.getProfilePostsRequest({ userId, page }));
    } else {
      dispatch(actions.getPostsLoadMore.getPostsLoadMoreRequest(page));
    }
  }, [page, dispatch, userId]);

  useEffect(() => {
    return () => {
      setPage(1);
    };
  }, [userId]);

  const handleNext = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };

  return (
    <Container direction={direction}>
      {userId ? [userId === currentUser?._id && <PostUpdate key="0" />] : [currentUser && <PostUpdate key="1" />]}

      <PostTopTitle>
        <h3>Recently Activities</h3>
        <span></span>
      </PostTopTitle>

      <InfiniteScroll dataLength={data.length} next={handleNext} hasMore={true} scrollableTarget="scroll-node">
        {data.map((post, i) => (
          <PostItem post={post} key={i} />
        ))}
        {!data.length && !isLoading && <div className="post__no-post">There is no post</div>}
      </InfiniteScroll>

      {isLoading && <PostLoading />}
    </Container>
  );
};

const PostLoading = () => {
  return (
    <>
      <CustomCard>
        <CardHeader
          avatar={<CustomSkeleton animation="wave" variant="circular" width={40} height={40} />}
          title={<CustomSkeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />}
          subheader={<CustomSkeleton animation="wave" height={10} width="20%" />}
        />
        <CardContent sx={{ padding: "0 16px 16px" }}>
          <React.Fragment>
            <CustomSkeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <CustomSkeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        </CardContent>

        <CustomSkeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      </CustomCard>
    </>
  );
};

export default Posts;
