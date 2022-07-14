import React, { useContext } from "react";
import {
  PackageItemButton,
  PayButton,
  PayButtonContainer,
  PayContainer,
  PayInformation,
  PayMethod,
  PayPackage,
} from "./PayElements";
import { Icon } from "@iconify/react";
import Momo from "assets/images/Momo.png";
import Paypal from "assets/images/Paypal.png";
import VNPAY from "assets/images/VNPAY.png";
import ZaloPay from "assets/images/ZaloPay.png";
import { ThemeContext } from "context/themeContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { AuthAPI, MomoAPI, UserAPI } from "api";
import { useDispatch } from "react-redux";
import * as reduxActions from "redux/actions";
import { useHistory, useLocation } from "react-router-dom";

const ewallets = [
  {
    id: 1,
    name: "Paypal",
    type: "paypal",
    image: Paypal,
  },
  {
    id: 2,
    name: "Momo",
    type: "momo",
    image: Momo,
  },
  {
    id: 3,
    name: "ZaloPay",
    type: "zalopay",
    image: ZaloPay,
  },
  {
    id: 4,
    name: "VnPay",
    type: "vnpay",
    image: VNPAY,
  },
];

const packages = [
  {
    id: 1,
    name: "$5",
    price: 5,
  },
  {
    id: 2,
    name: "$10",
    price: 10,
  },
  {
    id: 3,
    name: "$20",
    price: 20,
  },
  {
    id: 4,
    name: "$50",
    price: 50,
  },
  {
    id: 5,
    name: "$100",
    price: 100,
  },
];

const PaySection = () => {
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [ewallet, setEwallet] = React.useState("paypal");
  const dispatch = useDispatch();
  const history = useHistory();

  const search = useLocation().search;
  const query = new URLSearchParams(search).toString();

  React.useEffect(() => {
    const confirmMomoPayment = async () => {
      if (query) {
        await MomoAPI.confirmMomoPayment(query).then(async (res) => {
          if (res.data.isSuccess) {
            dispatch(
              reduxActions.toast.showToast({
                message: "Your order is completed",
                type: "success",
              })
            );

            const res = await UserAPI.updateUser({ wallet: new URLSearchParams(search).get("amount") / 23000 });
            if (res.status === 200) {
              const newUser = await AuthAPI.getUserInfo();
              dispatch(reduxActions.getCurrentUser(newUser.data));
              dispatch(
                reduxActions.toast.showToast({
                  message: "Please check your wallet",
                  type: "success",
                })
              );
              history.push("/");
            }
          }
        });
      }
    };

    confirmMomoPayment();
  }, [query, dispatch, history, search]);

  const handleChangeEWallet = (ewallet) => {
    setEwallet(ewallet);
  };

  const onApprove = async (data, actions) => {
    try {
      let wallet = packages.find((item) => item.id === selectedPackage).price;

      const res = await UserAPI.updateUser({ wallet });
      if (res.status === 200) {
        const newUser = await AuthAPI.getUserInfo();
        dispatch(reduxActions.getCurrentUser(newUser.data));
        dispatch(
          reduxActions.toast.showToast({
            message: "Please check your wallet",
            type: "success",
          })
        );
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
    return actions.order.capture();
  };

  const handleMomoCheckout = async () => {
    await MomoAPI.getPayUrl({
      url: window.location.href,
      price: packages.find((item) => item.id === selectedPackage).price,
    }).then((res) => {
      window.location.href = res.data;
    });
  };

  return (
    <PayContainer>
      <PayInformation className="pay__container">
        <div className="pay-information__title">Information</div>
        <div className="pay-information__info">
          <div className="pay-information__item">
            <span>ID: </span> 1234567489
          </div>
          <div className="pay-information__item">
            <span>Name: </span> Vương Quốc Vinh
          </div>
          <div className="pay-information__item">
            <span>Wallet: </span> $1234
          </div>
        </div>
      </PayInformation>

      <PayPackage className="pay__container">
        <div className="pay-package__title">Select Package</div>
        <div className="pay-package__packages">
          {packages.map((item) => (
            <label className="pay-package__item" key={item.id} onChange={() => setSelectedPackage(item.id)}>
              {item.name}
              <input hidden type="radio" name="package" />
              <PackageItemButton className="pay-package__button" isShow={selectedPackage === item.id ? true : false}>
                {item.id === selectedPackage ? <Icon icon="ep:select" /> : <Icon icon="fluent:select-all-off-24-regular" />}
              </PackageItemButton>
            </label>
          ))}
        </div>
      </PayPackage>

      {selectedPackage && (
        <>
          <PayMethod className="pay__container">
            <div className="pay-method__title">Select Payment Method</div>
            <div className="pay-method__methods">
              {ewallets.map((item) => (
                <label className="pay-method__item" key={item.id} onChange={() => handleChangeEWallet(item.type)}>
                  <input hidden type="radio" name="ewallet" defaultChecked={item.type === "paypal" ? true : false} />
                  <span className="method__item-selected">
                    <Icon icon="ep:select" />
                  </span>
                  <img src={item.image} alt="" />
                  <div className="method__item-name">{item.name}</div>
                </label>
              ))}
            </div>
          </PayMethod>

          <PayButton className="pay__container">
            {ewallet === "paypal" ? (
              <PaypalCheckoutButton packageItem={packages.find((item) => item.id === selectedPackage)} onApprove={onApprove} />
            ) : ewallet === "momo" ? (
              <PayButtonContainer className="momo" variant="contained" fullWidth onClick={handleMomoCheckout}>
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
          </PayButton>
        </>
      )}
    </PayContainer>
  );
};

const PaypalCheckoutButton = ({ packageItem, onApprove }) => {
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
              description: `Buy ${packageItem.name} package`,
              amount: {
                value: packageItem.price,
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PaySection;
