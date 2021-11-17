import React from "react";
import { Container, CustomCard, CustomSkeleton, PostTopTitle } from "./PostElements";
import PostItem from "./PostItem";
import PostUpdate from "./PostUpdate";
import { useSelector } from "react-redux";
import { authState$, postState$ } from "../../../redux/selectors";
import { useParams } from "react-router";
import { CardContent, CardHeader } from "@mui/material";

const Posts = ({ direction }) => {
  const { data, isLoading } = useSelector(postState$);
  const { currentUser } = useSelector(authState$);

  const { userId } = useParams();

  return (
    <>
      <Container direction={direction}>
        {userId
          ? [userId === currentUser?._id && <PostUpdate key="0" />]
          : [currentUser && <PostUpdate key="1" />]}

        <PostTopTitle>
          <h3>Activities Recently</h3>
          <span></span>
        </PostTopTitle>

        {data.map((post, i) => (
          <PostItem key={i} post={post} />
        ))}

        {isLoading && [...Array(2)].map((item, index) => <PostLoading key={index} />)}
      </Container>
    </>
  );
};

const PostLoading = () => {
  return (
    <>
      <CustomCard>
        <CardHeader
          avatar={<CustomSkeleton animation="wave" variant="circular" width={40} height={40} />}
          title={
            <CustomSkeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />
          }
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
