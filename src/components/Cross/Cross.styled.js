import styled from 'styled-components';

export default {
  Div: styled.div`
    width: 25px;
    top: ${({ top }) => `${top};`};
    left: ${({ left }) => `${left};`};
    right: ${({ right }) => `${right};`};
    bottom: ${({ bottom }) => `${bottom};`};
    transform: ${({ rotate }) => `translate(-50%, -50%) rotate(${rotate});`};
    height: 25px;
    position: absolute;
    cursor: pointer;
  `,
  line1: styled.span`
    top: 50%;
    left: 50%;
    height: 4px;
    width: 100%;
    position: absolute;
    transform: translate(-50%, -50%) rotate(90deg);
    background-color: ${({ color }) => `${color}`};
  `,
  line2: styled.span`
    top: 50%;
    left: 50%;
    height: 4px;
    width: 100%;
    transform: translate(-50%, -50%);
    background-color: ${({ color }) => `${color}`};
    position: absolute;
  `,
};
