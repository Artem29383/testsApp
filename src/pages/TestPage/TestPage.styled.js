import styled from 'styled-components';

export default {
  Content: styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 80px);
  `,
  BtnPos: styled.div`
    width: 50px;
    height: 50px;
    bottom: 50px;
    right: 50px;
    position: fixed;
  `,
  Error: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
