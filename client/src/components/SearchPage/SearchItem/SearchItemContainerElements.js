import styled from "styled-components";

export const SearchItemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
`;

export const OverLay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: all 0.1s ease;
  cursor: pointer;

  ${SearchItemContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

export const WatchButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 700;
  color: #fefefe;
  white-space: nowrap;
  user-select: none;
  transition: all 0.2s ease;

  ${SearchItemContainer}:hover & {
    transform: translate(-50%, -50%) scale(1);
  }
`;
