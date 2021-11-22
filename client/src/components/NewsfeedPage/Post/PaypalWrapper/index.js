import React from "react";
import Paypal from "../Paypal";
import { PaypalContainer } from "./PaypalWrapperElements";
import { useLocation } from "react-router-dom";

const PaypalWrapper = () => {
  const { state } = useLocation();
  return (
    <PaypalContainer>
      <Paypal post={state.post} />
    </PaypalContainer>
  );
};

export default PaypalWrapper;
