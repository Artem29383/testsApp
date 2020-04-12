import styled from 'styled-components';
import { device } from 'constants/device';

export default {
  FooterTest: styled.div`
    display: flex;
    justify-content: space-around;
    padding: ${({ editId }) => (editId ? '0px' : '0 85px 0 85px')};

    button {
      @media ${device.w630} {
        font-size: 14px;
        padding: 0 14px;
      }
    }

    @media ${device.tabletM} {
      display: grid;
      grid-template-columns: 200px;
      grid-gap: 15px;
    }
  `,
};
