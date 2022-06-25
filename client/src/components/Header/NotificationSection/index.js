import { SocketContext } from "context/socketContext";
import React, { useContext, useEffect } from "react";
import {
  ListNotification,
  NotificationContainer,
  NotificationItemContainer,
  NotifyAvatar,
  NotifyAvatarWrapper,
  NotifyContent,
  NotifyText,
  NotifyTime,
  NotifyWrapper,
} from "./NotificationSectionElements";
import * as api from "api";
import * as actions from "redux/actions";
import moment from "moment";
import { useDispatch } from "react-redux";

export default function NotificationSection({ isOpen, notifications, userId }) {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("getNotification", async () => {
      await api.NotificationAPI.fetchNotifications().then((res) =>
        dispatch(actions.fetchNotifications.fetchNotificationsSuccess(res.data))
      );
    });
  }, [socket, dispatch]);
  return (
    <NotificationContainer isOpen={isOpen}>
      <div className="notify-title">Notification</div>
      <ListNotification>
        {notifications.map((noti) => (
          <NotificationItem key={noti._id} notification={noti} userId={userId} />
        ))}
      </ListNotification>
    </NotificationContainer>
  );
}

const NotificationItem = ({ notification, userId }) => {
  const displaySenders = (senders) => {
    const { length } = senders;

    if (length > 1) {
      if (length === 2) {
        return <span className="notify-sender">{senders[0].fullName || senders[0].name} and 1 person </span>;
      } else {
        return (
          <span className="notify-sender">
            {senders[0].fullName || senders[0].name} and {length} people
          </span>
        );
      }
    }

    return <span className="notify-sender">{senders[0].fullName || senders[0].name} </span>;
  };

  return (
    <NotificationItemContainer>
      <NotifyWrapper to={notification.targetLink}>
        <NotifyAvatarWrapper>
          <NotifyAvatar src={notification.senders[0].avatar} alt="notify-avatar" />
        </NotifyAvatarWrapper>

        <NotifyContent>
          <NotifyText seen={notification.seen.some((id) => id === userId)}>
            {displaySenders(notification.senders)}
            {notification.content}
          </NotifyText>

          <NotifyTime seen={notification.seen.some((id) => id === userId)}>{moment(notification.updatedAt).fromNow()}</NotifyTime>
        </NotifyContent>
      </NotifyWrapper>
    </NotificationItemContainer>
  );
};
