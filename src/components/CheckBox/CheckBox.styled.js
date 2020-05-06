import styled, { keyframes } from 'styled-components';
import { colors } from 'styles/constants';
import { device } from 'constants/device';
/* stylelint-disable */

const box = keyframes`
  0% {
    transform: translateY(-50%) scale(1);
  }
  
  40% {
    transform: translateY(-50%) scale(1.3,0.7);
  }
  
  55% {
    transform: translateY(-50%) scale(1);
  }
  
  70% {
    transform: translateY(-50%) scale(1.2,0.8);
  }
  
  80% {
    transform: translateY(-50%) scale(1);
  }
  
  90% {
    transform: translateY(-50%) scale(1.1,0.9);
  }
  
  100% {
    transform: translateY(-50%) scale(1);
  }
`;

// eslint-disable-next-line no-unused-vars
const check = keyframes`
  0% {
    transform: rotate(45deg) scale(1) translateY(-50%);
  }
  
  40% {
    transform: rotate(45deg) scale(1.3,0.7) translateY(-50%);
  }
  
  55% {
    transform: rotate(45deg) scale(1) translateY(-50%);
  }
  
  70% {
    transform: rotate(45deg) scale(1.2,0.8) translateY(-50%);
  }
  
  80% {
    transform: rotate(45deg) scale(1) translateY(-50%);
  }
  
  90% {
    transform: rotate(45deg) scale(1.1,0.9) translateY(-50%);
  }
  
  100% {
    transform: rotate(45deg) scale(1) translateY(-50%);
  }
`;

export const Span = styled.span`
  cursor: pointer;
  position: absolute;
  height: 14px;
  width: 18px;
  border-bottom: 4px solid ${colors.white};
  border-right: 4px solid ${colors.white};
  transform: rotate(45deg) scale(0) translateY(-50%);
  left: -42px;
  top: calc(50% - 4px);

  @media ${device.tabletM} {
    height: 10px;
    width: 14px;
    left: -29px;
  }
`;

export const Input = styled.input`
  cursor: pointer;
  opacity: 0;
  position: absolute;
`;

export const Label = styled.label`
  cursor: pointer;
  position: relative;
  word-break: break-all;
  max-width: 80%;

  @media ${device.tabletM} {
    max-width: 70%;
    left: -10px;
  }

  &::before {
    position: absolute;
    padding: 15px;
    border-radius: 3px;
    border: 2px solid ${colors.olsoGray};
    content: '';
    left: -45px;
    top: 50%;
    background-color: ${colors.gallery};
    transform: translateY(-50%);
    transition: border-color 0.7s ease, background-color 0.7s ease,
      color 0.7s ease;

    @media ${device.tabletM} {
      padding: 10px;
      left: -30px;
    }
  }

  &::after {
    position: absolute;
    padding: 8px;
    background-color: ${colors.dodjerBlue};
    content: '';
    top: 50%;
    transform: translateY(-50%) scale(0);
    left: -31px;

    @media ${device.tabletM} {
      left: -26px;
    }
  }

  &.checked + ${Input} {
    color: ${colors.dodjerBlue};
  }

  &.checked ${Span} {
    animation: ${check} 0.4s 0.3s ease forwards;
  }

  &.checked::before {
    border-color: ${colors.dodjerBlue};
    background-color: ${colors.dodjerBlue};
    animation: ${box} 0.7s ease forwards;
  }
`;

export default {
  CheckBox: styled.div`
    color: #80868b;
    padding: 10px 50px 10px 55px;
    display: flex;
    align-items: center;
  `,
};
/* stylelint-enable */
