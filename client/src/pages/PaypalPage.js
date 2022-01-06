import React from "react";
import { useLocation } from "react-router-dom";
import Paypal from "components/NewsfeedPage/Post/Paypal";
import Header from "components/Header";

const PaypalPage = () => {
  const { state } = useLocation();
  return (
    <>
      <Header />
      <Paypal post={state.post} />
    </>
  );
};
export default PaypalPage;
