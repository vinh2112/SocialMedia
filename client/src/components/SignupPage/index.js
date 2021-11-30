import React, { useState } from "react";
import img from "../../images/img3.jpg";
import { Icon } from "@iconify/react";
import {
  SignupContainer,
  ImgWrapper,
  Img,
  InfoContainer,
  Txb,
  TxbWrapper,
  InfoTop,
  InfoBottom,
  ButtonSignup,
  LoginDiv,
  Signin,
  Headline,
  Subline,
  Description,
  ErrorWrapper,
} from "./SignupElements";

// import { ItemsWrapper } from "../HomePage/SigninForm/SigninElements";
import { UserAPI } from "api";
import { useHistory } from "react-router-dom";

const SignupSection = () => {
  const history = useHistory();
  const [hidden, setHidden] = useState(false);
  const isHidden = () => {
    setHidden(!hidden);
    console.log(hidden);
  };

  const [data, setData] = useState({
    email: "",
    fullname: "",
    password: "",
    repassword: "",
  });

  const [message, setMessage] = useState(null);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSignup = async () => {
    if (data.password !== data.repassword) {
      setMessage("Password must be the same");
    } else {
      const register = await UserAPI.register({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      if (register.response.status === 400) {
        setMessage(register.response.data.msg);
      } else {
        history.push("/home/signin");
      }
      console.log(register.response);
    }
  };
  return (
    <SignupContainer>
      {/* Video background */}
      <ImgWrapper>
        <Img src={img} type="image/jpg" />
      </ImgWrapper>

      {/* Form sign up */}
      <InfoContainer>
        {/* Top form */}
        <InfoTop>
          <Headline>SIGN UP</Headline>
          <Subline>HI!</Subline>
          <Description>Create your new account</Description>
        </InfoTop>
        {/* Bottom form */}
        <InfoBottom>
          {/* Email */}
          <TxbWrapper>
            <Txb
              id="user"
              placeholder=" "
              name="email"
              onChange={handleValueChange}
            ></Txb>
            <label htmlFor="user">Email</label>
          </TxbWrapper>

          {/* Full name */}
          <TxbWrapper>
            <Txb
              id="fName"
              placeholder=" "
              maxLength="50"
              name="fullname"
              onChange={handleValueChange}
            ></Txb>
            <label htmlFor="fNname">Full name</label>
          </TxbWrapper>

          {/* Password */}
          <TxbWrapper>
            <Txb
              id="pwd"
              placeholder=" "
              type={hidden ? "text" : "password"}
              name="password"
              onChange={handleValueChange}
            ></Txb>
            <label htmlFor="pwd">Password</label>
            <i onClick={isHidden} name="repwd" style={{ cursor: "pointer" }}>
              <Icon icon="dashicons:hidden" />
            </i>
          </TxbWrapper>

          {/* Repassword */}
          <TxbWrapper>
            <Txb
              id="repwd"
              placeholder=" "
              type={hidden ? "text" : "password"}
              name="repassword"
              onChange={handleValueChange}
            ></Txb>
            <label htmlFor="repwd">Verifying password</label>
            <i onClick={isHidden} name="repwd" style={{ cursor: "pointer" }}>
              <Icon icon="dashicons:hidden" />
            </i>
          </TxbWrapper>

          {message ? <ErrorWrapper>{message}</ErrorWrapper> : null}

          <ButtonSignup to="#" onClick={handleSignup}>
            Sign up
          </ButtonSignup>

          {/* Icons */}
          {/* <ItemsWrapper>
            <span
              className="iconify"
              data-icon="akar-icons:facebook-fill"
            ></span>
            <span className="iconify" data-icon="fa-brands:instagram"></span>
            <span
              className="iconify"
              data-icon="entypo-social:twitter-with-circle"
            ></span>
          </ItemsWrapper> */}

          <LoginDiv>
            Already have account ?<Signin to="/home">Sign in</Signin>
          </LoginDiv>
        </InfoBottom>
      </InfoContainer>
    </SignupContainer>
  );
};

export default SignupSection;
