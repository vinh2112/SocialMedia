import React, { useRef, useEffect } from "react";
import {
  PaypalContainer,
  PaypalWrapper,
  PaypalInfo,
  PaypalItem,
  PaypalButton,
  Header,
} from "./PaypalElement";
import { useHistory } from "react-router-dom";
import { PaymentAPI } from "api";
import { saveAs } from "file-saver";

const Paypal = ({ post }) => {
  const history = useHistory();
  const paypal = useRef();
  // const value = post.price*0.95
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "abc",
                amount: {
                  currency_code: "USD",
                  value: post.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          //   await actions.order.capture();
          // const token = await PaymentAPI.getPaypalToken()
          const value = post.price * 0.95;
          PaymentAPI.payout({
            sender_batch_header: {},
            items: [
              {
                recipient_type: "EMAIL",
                amount: {
                  currency: "USD",
                  value: value,
                },
                recipent_wallet: "PAYPAL",
                receiver: "sb-r6ghe8860325@personal.example.com",
              },
              {
                recipient_type: "PAYPAL_ID",
                amount: {
                  currency: "USD",
                  value: value,
                },
                recipent_wallet: "PAYPAL",
                receiver: "6M32LLPZYL7EQ", //post.userId.CreditCard
              },
            ],
          });
          PaymentAPI.createPayment({
            postId: post._id,
            postBody: {
              price: post.price,
              isSuccess: true,
              posterId: post.userId,
            },
          });
          saveAs(post.image.url, `${post.image.public_id}.png`);
          history.push("/");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
    // const getProfileUser = async() =>{
    //   const user = await UserAPI.getProfileUser(post.)
    // }
    // const user = UserAPI.getProfileUser(post.UserId);
    // console.log(user)
  }, [post, history]);
  return (
    <>
      <PaypalContainer>
        <PaypalWrapper>
          <Header>Checkout section</Header>
          <PaypalInfo>
            <PaypalItem>Price:</PaypalItem>
            <PaypalItem>${post.price}</PaypalItem>
          </PaypalInfo>
          <PaypalInfo>
            <PaypalItem>Author:</PaypalItem>
            <PaypalItem>{post.userId.email}</PaypalItem>
          </PaypalInfo>
          <PaypalButton ref={paypal}></PaypalButton>
        </PaypalWrapper>
      </PaypalContainer>
    </>
  );
};

export default Paypal;
