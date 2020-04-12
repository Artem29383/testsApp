import styled from 'styled-components';
import { device } from 'constants/device';

export default {
  Content: styled.div`
    width: 100%;
    position: relative;
    height: 100%;

    @media ${device.tabletM} {
      padding-top: 80px;
    }
  `,
};
