import { SocketContext } from "context/socketContext";
import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { authState$ } from "redux/selectors";
import {
  ListOnlineUser,
  OnlineUserContainer,
  OnlineUserItemContainer,
  OUAvatar,
  OUAvatarWrapper,
  OUName,
} from "./OnlineUserSectionElements";

export default function OnlineUserSection() {
  const user = useSelector(authState$);
  const socket = useContext(SocketContext);

  let listOnlineUsers = useRef([]);

  useEffect(() => {
    listOnlineUsers.current = user.currentUser ? user.currentUser.followings : [];
  }, [user.currentUser]);

  useEffect(() => {
    if (user.currentUser) socket?.emit("sendOnlineUsers");
  }, [socket, user]);

  useEffect(() => {
    socket?.on("getOnlineUsers", ({ onlineUsers }) => {
      listOnlineUsers.current = user?.currentUser?.followings.reduce((acc, element) => {
        if (onlineUsers.some((ou) => ou.userId === element._id)) {
          element.online = true;
          return [element, ...acc];
        }
        element.online = false;
        return [...acc, element];
      }, []);
    });
  }, [socket, user]);

  return (
    <OnlineUserContainer>
      <div className="contact-title">Contacts</div>
      <ListOnlineUser>
        {listOnlineUsers.current.map((user) => (
          <OnlineUserItem key={user._id} user={user} />
        ))}
      </ListOnlineUser>
    </OnlineUserContainer>
  );
}

const OnlineUserItem = ({ user }) => {
  return (
    <OnlineUserItemContainer>
      <OUAvatarWrapper>
        <OUAvatar src={user.avatar} alt="OU-avatar" online={user.online} />
      </OUAvatarWrapper>
      <OUName online={user.online}>@{user.name}</OUName>
    </OnlineUserItemContainer>
  );
};
