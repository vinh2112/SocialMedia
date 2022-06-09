import { SocketContext } from "context/socketContext";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { authState$ } from "redux/selectors";
import {
  CustomSkeleton,
  ListOnlineUser,
  OnlineUserContainer,
  OnlineUserItemContainer,
  OUAvatar,
  OUAvatarWrapper,
  OUName,
} from "./OnlineUserSectionElements";
import SimpleBarReact from "simplebar-react";
import { Box } from "@mui/material";

export default function OnlineUserSection() {
  const [listOnlineUsers, setListOnlineUsers] = React.useState([]);
  const { currentUser } = useSelector(authState$);
  const socket = useContext(SocketContext);
  const reloadRef = React.useRef(null);

  useEffect(() => {
    if (currentUser) {
      if (reloadRef.current) {
        clearTimeout(reloadRef.current);
      }

      reloadRef.current = setTimeout(() => {
        setListOnlineUsers(currentUser.followings.sort(() => Math.random() - 0.5));
        socket?.emit("sendOnlineUsers");
      }, 1000);
    }

    return () => {
      setListOnlineUsers([]);
    };
  }, [socket, currentUser]);

  useEffect(() => {
    if (currentUser) {
      socket?.on("getOnlineUsers", ({ onlineUsers }) => {
        if (reloadRef.current) {
          clearTimeout(reloadRef.current);
        }

        reloadRef.current = setTimeout(() => {
          const listOnlineUsersTemp = currentUser?.followings?.reduce((acc, element) => {
            if (onlineUsers.some((ou) => ou.userId === element._id) || Math.random() - 0.7 > 0) {
              element.online = true;
              return [element, ...acc];
            }
            element.online = false;
            return [...acc, element];
          }, []);
          setListOnlineUsers(listOnlineUsersTemp);
        }, 1000);
      });
    }
  }, [socket, currentUser, listOnlineUsers]);

  return (
    <OnlineUserContainer>
      <div className="contact-title">Contacts</div>
      <SimpleBarReact style={{ height: "calc(100vh - 100px)" }}>
        <ListOnlineUser>
          {!listOnlineUsers.length
            ? [...Array(3)].map((item, index) => <OnlineUserLoading key={index} />)
            : listOnlineUsers.map((user) => <OnlineUserItem key={user._id} user={user} />)}
        </ListOnlineUser>
      </SimpleBarReact>
    </OnlineUserContainer>
  );
}

const OnlineUserItem = ({ user }) => {
  return (
    <OnlineUserItemContainer to={`/profile/${user._id}`}>
      <OUAvatarWrapper>
        <OUAvatar loading="lazy" src={user.avatar} alt="OU-avatar" online={user.online} />
      </OUAvatarWrapper>
      <OUName online={user.online}>@{user.name}</OUName>
      {user.online && <span />}
    </OnlineUserItemContainer>
  );
};

const OnlineUserLoading = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px" }}>
      <CustomSkeleton animation="wave" variant="circular" width={36} height={36} />
      <CustomSkeleton animation="wave" variant="text" width={Math.random() * 100 + 80} height={12} />
    </Box>
  );
};
