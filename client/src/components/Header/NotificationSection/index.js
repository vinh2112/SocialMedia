import React from "react";
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

export default function NotificationSection({ isOpen }) {
  return (
    <NotificationContainer isOpen={isOpen}>
      <div className="notify-title">Notification</div>
      <ListNotification>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </ListNotification>
    </NotificationContainer>
  );
}

const NotificationItem = () => {
  return (
    <NotificationItemContainer>
      <NotifyWrapper to="#">
        <NotifyAvatarWrapper>
          <NotifyAvatar
            src="https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg"
            alt="notify-avatar"
          />
        </NotifyAvatarWrapper>

        <NotifyContent>
          <NotifyText seen={false}>
            <span className="notify-sender">Vương Quốc Vinh</span> đã đăng trong DIỄN ĐÀN SINH VIÊN
            CÔNG NGHỆ THÔNG TIN - ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM
          </NotifyText>

          <NotifyTime seen={true}>3 hours ago</NotifyTime>
        </NotifyContent>
      </NotifyWrapper>
    </NotificationItemContainer>
  );
};
