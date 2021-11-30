import React from "react";
import { useLocation } from "react-router-dom";
import Paypal from "components/NewsfeedPage/Post/Paypal";

const PaypalPage = () => {
  const { state } = useLocation();
  return <Paypal post={state.post} />;
};
export default PaypalPage;
