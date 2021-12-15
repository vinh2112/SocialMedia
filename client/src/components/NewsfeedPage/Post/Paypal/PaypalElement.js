import styled from "styled-components";

export const PaypalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  background: #212121;
`;
export const PaypalWrapper = styled.div`
  display: flex;
  position: absolute;
  top:50%;
  left: 50%;
  transition: top 0.1s ease-in-out 0.1s;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 400px;
  height: auto;
  border-radius: 8px;
  padding: 5px 10px;
  flex-direction: column;
  min-height:320px;
  @media screen and (max-width: 450px) {
    width:auto;
    margin:0 10px;
  }
`

export const PaypalInfo = styled.div`
  display:flex;
  justify-content:space-between;
  padding:10px 5px; 

`
export const PaypalItem = styled.div`
  font-size:18px;
  color:black;
  @media screen and (max-width: 450px) {
    font-size:15px;
  }
`
export const PaypalButton = styled.div`
`

export const Header = styled.div`
  margin: 30px 20px;
  color:black;
  font-size:25px;
  display:flex;
  justify-content:center;
`
