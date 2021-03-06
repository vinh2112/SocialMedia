import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import {
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
import LoadingSection from "components/LoadingSection";
import { IconButton, Typography } from "@mui/material";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const { currentUser } = useSelector(authState$);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const res = await api.PaymentAPI.getPayments();
        setPayments(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    getPayments();
  }, []);

  return (
    <>
      <PaymentHistoryContainer>
        {isLoading ? (
          <LoadingSection />
        ) : payments.length ? (
          payments.map((payment) => (
            <PaymentItem
              key={payment._id}
              type={currentUser._id === payment.posterId._id ? "received" : "payment"}
              payment={payment}
            />
          ))
        ) : (
          <Typography sx={{ color: "text.secondary" }} variant="h6" align="center">
            There are no payments
          </Typography>
        )}
      </PaymentHistoryContainer>
    </>
  );
}

const PaymentItem = ({ type, payment }) => {
  return (
    <PaymentItemContainer>
      <PaymentPhotoWrapper to={`/post/${payment.postId._id}`}>
        <Photo src={payment.postId.image.url} alt="photo" />
      </PaymentPhotoWrapper>
      <PaymentDetail type={type}>
        <NameUser to={type === "received" ? `/profile/${payment.userId._id}` : `/profile/${payment.posterId._id}`}>
          @{type === "received" ? payment.userId.name : payment.posterId.name}
        </NameUser>
        <div className="payment-type">{type}</div>
        <div className="payment-price">${payment.price}</div>
        <div className="payment-date">{moment(payment.createdAt).format("ll")}</div>
      </PaymentDetail>

      <IconButton aria-label="download">
        <Icon icon="fluent:arrow-download-16-filled" />
      </IconButton>
    </PaymentItemContainer>
  );
};
