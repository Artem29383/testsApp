import styled from 'styled-components';
import { device } from 'constants/device';

export default {
  InputWrap: styled.div`
    width: 100%;
    padding: 50px 300px 0 300px;

    @media ${device.laptop} {
      padding: 50px 150px 0 150px;
    }

    @media ${device.tablet} {
      padding: 50px 50px 0 50px;
    }
  `,
};
