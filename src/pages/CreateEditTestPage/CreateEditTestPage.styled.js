import styled from 'styled-components';
import { device } from 'constants/device';

export default {
  PageTest: styled.div`
    width: 100%;

    @media ${device.tablet} {
      padding: 0 20px;
    }
  `,
  Content: styled.div`
    height: auto;
    margin: 0 auto;
    max-width: 600px;
    padding-bottom: 120px;
  `,
  DragZone: styled.div``,
};
