import styled, { keyframes } from 'styled-components';
import { colors } from 'styles/constants';
/* stylelint-disable */

const keyFrames = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

export const LoaderComponent = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;

  &:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${colors.mandy};
    border-color: ${colors.mandy} transparent ${colors.mandy} transparent;
    animation: ${keyFrames} 1.2s linear infinite;
  }
`;
/* stylelint-enable */
