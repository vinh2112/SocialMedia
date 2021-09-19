import React from "react";
import {
  Container,
  Top,
  Title,
  SeeAll,
  SuggestionList,
  SuggestItem,
  Avatar,
  SuggestInfo,
  Name,
  Follow,
  FollowButton,
} from "./UserSuggestionElements";
import { Data } from "./SuggestData";

const UserSuggestion = () => {
  return (
    <Container>
      <Top>
        <Title>Suggestions For You</Title>
        <SeeAll to="#">See All</SeeAll>
      </Top>

      <SuggestionList>
        {Data.map((suggest) => {
          return (
            <SuggestItem key={suggest.id}>
              <Avatar src={suggest.photo_url} />
              <SuggestInfo>
                <Name>{suggest.name}</Name>
                <Follow>{suggest.followed}</Follow>
              </SuggestInfo>
              <FollowButton>Follow</FollowButton>
            </SuggestItem>
          );
        })}
      </SuggestionList>
    </Container>
  );
};

export default UserSuggestion;
