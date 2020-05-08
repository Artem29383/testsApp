import styled from 'styled-components';
import { device } from 'constants/device';

export default {
  WrapInput: styled.div`
    width: 100%;
    padding: ${({ padding }) => padding};

    @media ${device.tabletM} {
      padding: 0 25px;
    }
  `,
};
