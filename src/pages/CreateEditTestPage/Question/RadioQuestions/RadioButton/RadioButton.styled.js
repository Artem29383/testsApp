import styled from 'styled-components';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

export default {
  Radio: styled.div`
    width: auto;
    font-size: 24px;
    color: ${colors.olsoGray};
    padding: ${({ edit }) =>
      edit ? '10px 50px 10px 10px' : '10px 50px 10px 55px'};
    display: flex;
    align-items: center;

    @media ${device.tabletM} {
      font-size: 16px;
      padding: ${({ edit }) =>
        edit ? '10px 50px 10px 10px' : '10px 30px 10px 55px'};
    }
  `,
};
