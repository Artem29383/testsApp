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

  &:after {
    content: ' ';
    display: block;
    width: ${({ width }) => (width ? `${width}px` : '64px')};
    height: ${({ height }) => (height ? `${height}px` : '64px')};
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${colors.mandy};
    border-color: ${({ color }) =>
      color
        ? `${color} transparent ${color} transparent;`
        : `${colors.mandy} transparent ${colors.mandy} transparent;`};
    animation: ${keyFrames} 1.2s linear infinite;
  }
`;
/* stylelint-enable */
