import { Grid } from "@mui/material";
import React from "react";
import {
  AccountContainer,
  AccountWrapper,
  CustomCard,
  CustomCardContent,
  CustomSkeleton,
  ProfileLoadingContainer,
  ProfileLoadingWrapper,
} from "./AccountElements";
import UserInfo from "./UserInfo";

export default function Account({ isLoading }) {
  return (
    <>
      {isLoading ? (
        <ProfileLoading />
      ) : (
        <AccountContainer>
          <AccountWrapper>
            <UserInfo />
          </AccountWrapper>
        </AccountContainer>
      )}
    </>
  );
}

const ProfileLoading = () => {
  return (
    <>
      <ProfileLoadingContainer>
        <CustomCard>
          <CustomCardContent>
            <CustomSkeleton animation="wave" variant="circular" width={110} height={110} />
          </CustomCardContent>

          <ProfileLoadingWrapper>
            <CustomCardContent>
              <CustomSkeleton
                animation="wave"
                width="40%"
                height={12}
                style={{ marginBottom: 12 }}
              />
              <CustomSkeleton animation="wave" width="70%" height={10} />
            </CustomCardContent>

            <CustomCardContent>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={6}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <CustomSkeleton
                    animation="wave"
                    width="40%"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <CustomSkeleton animation="wave" width="70%" height={10} />
                </Grid>

                <Grid
                  item
                  xs={6}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <CustomSkeleton
                    animation="wave"
                    width="40%"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <CustomSkeleton animation="wave" width="70%" height={10} />
                </Grid>
              </Grid>
            </CustomCardContent>
          </ProfileLoadingWrapper>
        </CustomCard>
      </ProfileLoadingContainer>
    </>
  );
};
