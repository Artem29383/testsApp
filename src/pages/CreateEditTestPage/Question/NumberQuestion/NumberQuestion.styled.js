import styled from 'styled-components';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

export default {
  Wrap: styled.div`
    padding: 0 50px 0 40px;
    width: 100%;
  `,
  Answer: styled.div`
    color: ${colors.olsoGray};
    font-size: 24px;
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    @media ${device.tabletM} {
      font-size: 16px;
    }
  `,
};
