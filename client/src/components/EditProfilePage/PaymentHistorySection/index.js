import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import {
  DownloadButton,
  NameUser,
  PaymentDetail,
  PaymentHistoryContainer,
  PaymentItemContainer,
  PaymentPhotoWrapper,
  Photo,
} from "./PaymentHistoryElements";
import * as api from "api";
import { authState$ } from "redux/selectors";
import { useSelector } from "react-redux";
import moment from "moment";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const { currentUser } = useSelector(authState$);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const res = await api.PaymentAPI.getPayments();
        setPayments(res.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getPayments();
  }, []);
  if (!payments.length) return null;

  return (
    <>
      <PaymentHistoryContainer>
        {payments.map((payment) => (
          <PaymentItem
            key={payment._id}
            type={currentUser._id === payment.posterId._id ? "received" : "payment"}
            payment={payment}
          />
        ))}
      </PaymentHistoryContainer>
    </>
  );
}

const PaymentItem = ({ type, payment }) => {
  return (
    <PaymentItemContainer>
      <PaymentPhotoWrapper>
        <Photo src={payment.postId.image.url} alt="photo" />
      </PaymentPhotoWrapper>
      <PaymentDetail type={type}>
        <NameUser
          to={
            type === "received"
              ? `/profile/${payment.userId._id}`
              : `/profile/${payment.posterId._id}`
          }
        >
          @{type === "received" ? payment.userId.name : payment.posterId.name}
        </NameUser>
        <div className="payment-type">{type}</div>
        <div className="payment-price">${payment.price}</div>
        <div className="payment-date">{moment(payment.createdAt).format("ll")}</div>
      </PaymentDetail>

      <DownloadButton>
        <Icon icon="fluent:arrow-download-16-filled" />
      </DownloadButton>
    </PaymentItemContainer>
  );
};
