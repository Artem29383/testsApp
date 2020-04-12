import styled from 'styled-components';
import { device } from 'constants/device';
import { colors } from 'styles/constants';
import theme from 'styles/theme';

export default {
  WrapInput: styled.div`
    width: 100%;
    padding: ${({ padding }) => padding};

    @media ${device.tabletM} {
      padding: 0 25px;
    }
  `,
  QuestFormHeader: styled.div`
    max-height: 80px;
    height: 100%;
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    position: relative;

    @media ${device.tabletM} {
      flex-wrap: wrap;
      max-height: 100%;
    }
  `,
  QuestFormHeaderTitle: styled.div`
    width: 48%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${device.tabletM} {
      margin: 15px 0;
      width: 100%;
    }
  `,
  QuestNameDiv: styled.div`
    font-size: 18px;
    color: ${colors.olsoGray};
    padding-left: 13px;
    line-height: 2.7;
    cursor: pointer;
    border-radius: ${theme.radius.google};
    border: ${theme.border.google};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
};
