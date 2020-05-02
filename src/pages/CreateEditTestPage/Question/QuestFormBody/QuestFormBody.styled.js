import styled from 'styled-components';
import { device } from 'constants/device';
import theme from 'styles/theme';

export default {
  QuestFormBody: styled.div`
    width: 100%;
    height: 100%;
    padding-left: 10px;
  `,
  Error: styled.div`
    color: ${theme.error.main};
    font-size: 24px;
    text-align: center;
  `,
  WrapInput: styled.div`
    width: 100%;
    padding: ${({ padding }) => padding};

    @media ${device.tabletM} {
      padding: 0 25px;
    }
  `,
};
