import { Icon } from "@iconify/react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { AuthAPI, MomoAPI, PaymentAPI, PostAPI } from "api";
import LoadingSection from "components/LoadingSection";
import { ThemeContext } from "context/themeContext";
import { saveAs } from "file-saver";
import Momo from "images/Momo.png";
import Paypal from "images/Paypal.png";
import VNPAY from "images/VNPAY.png";
import ZaloPay from "images/ZaloPay.png";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as actions from "redux/actions";
import { authState$ } from "redux/selectors";
import {
  BottomSection,
  EWalletContainer,
  OrderContainer,
  PayButtonContainer,
  PaymentContainer,
  PaymentLeftSide,
  PaymentOptionContainer,
  PaymentRightSide,
  TopSection,
  UserBlockContainer,
} from "./PaypalElement";

const PaySection = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentType, setPaymentType] = useState(1);
  const [ewallet, setEwallet] = useState("paypal");
  const { currentUser } = useSelector(authState$);
  const dispatch = useDispatch();
  const history = useHistory();

  const search = useLocation().search;
  const query = new URLSearchParams(search).toString();

  useEffect(() => {
    const confirmMomoPayment = async () => {
      if (query) {
        setLoading(true);
        await MomoAPI.confirmMomoPayment(query).then((res) => {
          if (res.data.isSuccess) {
            dispatch(
              actions.toast.showToast({
                message: "Your order is completed",
                type: "success",
              })
            );
            setIsSuccess(res.data.isSuccess);
          }
        });

        await PaymentAPI.createPayment({
          postId: post._id,
          postBody: {
            price: post.price,
            isSuccess: true,
            posterId: post.userId,
            type: 2,
          },
        });

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    confirmMomoPayment();
  }, [query, dispatch, post]);

  const handlePaymentType = (type) => {
    setPaymentType(type);

    if (type === 1) {
      setEwallet("paypal");
    }
  };

  const handleChangeEWallet = (ewallet) => {
    setEwallet(ewallet);
  };

  const handleApprove = React.useCallback(async () => {
    setLoading(true);
    await PaymentAPI.createPayment({
      postId: post._id,
      postBody: {
        price: post.price,
        isSuccess: true,
        posterId: post.userId,
        type: paymentType,
      },
    });

    if (paymentType === 1) {
      await AuthAPI.getUserInfo().then((res) => {
        dispatch(actions.getCurrentUser(res.data));
      });
    }

    setIsSuccess(true);

    dispatch(
      actions.toast.showToast({
        message: "Your order is completed",
        type: "success",
      })
    );

    setLoading(false);
  }, [post, paymentType, dispatch]);

  const handleMomoCheckout = async () => {
    setLoading(true);
    await MomoAPI.getPayUrl({ postId: post._id, price: post.price }).then((res) => {
      window.location.href = res.data;
    });
  };

  const handleDownload = async () => {
    await PostAPI.downloadPost(post._id).then((res) => {
      saveAs(res.data.url, `${res.data.public_id}.png`);
      history.push("/");
    });
  };

  return (
    <>
      <PaymentContainer>
        <PaymentLeftSide>
          <TopSection>
            <img src={post.image.watermark} alt="payment" />
          </TopSection>

          <BottomSection>
            <div className="payment__options">
              <PaymentOptionItem
                name="payment__option"
                value={1}
                onChange={handlePaymentType}
                checked={true}
              >
                <div className="payment__option-content_title">Photoos Wallet</div>
                <div
                  className={`payment__option-content_body ${
                    currentUser && currentUser.wallet > 0 ? "green" : "red"
                  }`}
                >
                  ${currentUser && currentUser.wallet}
                </div>
              </PaymentOptionItem>

              <PaymentOptionItem name="payment__option" value={2} onChange={handlePaymentType}>
                <div className="payment__option-content_title">E-Wallet</div>
                <div className="payment__option-content_body">(Paypal, Momo, ZaloPay,...)</div>
              </PaymentOptionItem>
            </div>

            {paymentType === 2 && (
              <>
                <span className="divider" />
                <div className="payment__options-list_Ewallet">
                  <EWalletItem
                    backgroundImage={Paypal}
                    name="ewallet-option"
                    value="paypal"
                    onChange={handleChangeEWallet}
                    checked={true}
                  />
                  <EWalletItem
                    backgroundImage={Momo}
                    name="ewallet-option"
                    value="momo"
                    onChange={handleChangeEWallet}
                  />
                  <EWalletItem
                    backgroundImage={ZaloPay}
                    name="ewallet-option"
                    value="zalopay"
                    onChange={handleChangeEWallet}
                  />
                  <EWalletItem
                    backgroundImage={VNPAY}
                    name="ewallet-option"
                    value="vnpay"
                    onChange={handleChangeEWallet}
                  />
                </div>
              </>
            )}
          </BottomSection>
        </PaymentLeftSide>
        <PaymentRightSide>
          <OrderContainer>
            <div className="order-title">Your Order</div>

            <div className="order__detail">
              <div className="order__detail-item">
                <div className="order__detail-item_title">Author</div>
                <UserBlock user={post.userId} />
              </div>

              <div className="order__detail-item">
                <div className="order__detail-item_title">You</div>
                {currentUser && <UserBlock user={currentUser} />}
              </div>

              <div className="order__detail-item flex">
                <div className="order__detail-item_title">Method</div>
                <div className="order__detail-item_subTitle">
                  {paymentType === 1 ? "Photoos Wallet" : "E-wallet"}
                </div>
              </div>

              <div className="order__detail-item flex">
                <div className="order__detail-item_title">Price</div>
                <div className="order__detail-price">${post.price}</div>
              </div>
            </div>

            <span className="order__detail-line" />

            {loading ? (
              <div>
                <LoadingSection />
              </div>
            ) : isSuccess ? (
              <PayButtonContainer
                onClick={handleDownload}
                className="download"
                variant="contained"
                startIcon={<Icon icon="fluent:arrow-download-16-filled" />}
                fullWidth
              >
                Download
              </PayButtonContainer>
            ) : paymentType === 1 ? (
              <PayButtonContainer onClick={handleApprove} variant="contained" fullWidth>
                Check out
              </PayButtonContainer>
            ) : ewallet === "paypal" ? (
              <PaypalCheckoutButton post={post} handleAppove={handleApprove} />
            ) : ewallet === "momo" ? (
              <PayButtonContainer
                onClick={handleMomoCheckout}
                className="momo"
                variant="contained"
                fullWidth
              >
                Check out
              </PayButtonContainer>
            ) : ewallet === "zalopay" ? (
              <PayButtonContainer className="zalopay" variant="contained" fullWidth>
                Check out
              </PayButtonContainer>
            ) : (
              ewallet === "vnpay" && (
                <PayButtonContainer className="vnpay" variant="contained" fullWidth>
                  Check out
                </PayButtonContainer>
              )
            )}
          </OrderContainer>
        </PaymentRightSide>
      </PaymentContainer>
    </>
  );
};

const UserBlock = ({ user }) => {
  return (
    <UserBlockContainer>
      <img src={user.avatar} alt="avatar" />
      <div className="user__block-info">
        <div className="user__block-info_name">{user?.fullName}</div>
        <div className="user__block-info_nickname">@{user.name}</div>
      </div>
    </UserBlockContainer>
  );
};

const PaymentOptionItem = (props) => {
  return (
    <PaymentOptionContainer onChange={() => props.onChange(props.value)}>
      <input type="radio" hidden name={props.name} defaultChecked={props.checked} />
      <div className="payment__option-radio" />
      <div className="payment__option-content">{props.children}</div>
    </PaymentOptionContainer>
  );
};

const EWalletItem = (props) => {
  return (
    <EWalletContainer
      style={{ backgroundImage: `url(${props.backgroundImage})` }}
      onChange={() => props.onChange(props.value)}
    >
      <input type="radio" hidden name={props.name} defaultChecked={props.checked} />
      <span className="overlay" />
    </EWalletContainer>
  );
};

const PaypalCheckoutButton = ({ post, handleAppove, setLoading }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <PayPalButtons
      style={{
        color: theme === "light" ? "black" : "white",
        layout: "horizontal",
        height: 40,
        tagline: false,
        padding: 0,
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: `Buy ${post.userId.fullName}'s photo`,
              amount: {
                value: post.price,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        await actions.order.capture();
        handleAppove();
      }}
    />
  );
};

export default PaySection;
