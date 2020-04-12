import styled from 'styled-components';
import theme from 'styles/theme';
import { device } from 'constants/device';
import { colors } from 'styles/constants';

export default {
  TestForm: styled.div`
    margin: 50px 0;
    width: 100%;
    border-radius: ${theme.radius.google};
    box-shadow: 0 0 15px 1px rgba(117, 117, 117, 1);
  `,
  WrapInput: styled.div`
    width: 100%;
    padding: ${({ padding }) => padding};

    @media ${device.w630} {
      padding: 25px 50px 25px 50px;
    }
  `,
  QuestNameDiv: styled.div`
    font-size: 18px;
    color: ${colors.olsoGray};
    padding: 0 13px;
    word-break: break-all;
    line-height: 2.7;
    cursor: pointer;
    border-radius: ${theme.radius.google};
    border: ${theme.border.google};

    @media ${device.tabletM} {
      word-break: break-all;
      hyphens: auto;
      line-height: 1.7;
    }
  `,
};
