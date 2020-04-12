import styled from 'styled-components';
import { device } from 'constants/device';
/* stylelint-disable */

export default {
  CheckBox: styled.div`
    font-size: 24px;
    color: #80868b;
    align-items: center;
    padding: ${({ edit }) =>
      edit ? '10px 50px 10px 10px' : '10px 50px 10px 55px'};
    display: flex;

    @media ${device.tabletM} {
      font-size: 16px;
      padding: ${({ edit }) =>
        edit ? '10px 50px 10px 10px' : '10px 30px 10px 55px'};
    }
  `,
};
