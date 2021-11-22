import React, { useRef, useEffect } from "react";
import { PaypalContainer } from "./PaypalElement";
import { useHistory } from "react-router-dom";
import { PaymentAPI } from "api";
import { saveAs } from "file-saver";

const Paypal = ({ post }) => {
  const history = useHistory();
  const paypal = useRef();
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
          PaymentAPI.createPayment({
            postId: post._id,
            postBody: {
              price: post.price,
              isSuccess: true,
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
  }, [post, history]);
  return <PaypalContainer ref={paypal}></PaypalContainer>;
};

export default Paypal;
