import styled from 'styled-components';
import theme from 'styles/theme';
import { NavLink } from 'react-router-dom';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

export default {
  ThText: styled.td`
    font-size: 15px;
    color: inherit;
    line-height: 1.4;
    position: relative;
    vertical-align: middle;
    font-family: Light, serif;
    padding-top: 16px;
    padding-bottom: 16px;

    @media ${device.tabletM} {
      display: block;
      width: 100%;

      &::before {
        content: attr(data-label);
        position: absolute;
        left: 10%;

        @media ${device.mobileL} {
          position: static;
          display: block;
          text-align: center;
          margin-bottom: 10px;
          background-color: ${colors.alto};
        }
      }
    }

    &.red {
      color: ${colors.blazeOrange};
    }
  `,
  ThDiv: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    cursor: default;
    justify-content: center;
    align-content: center;
  `,
  Text: styled.span`
    cursor: pointer;
    word-break: break-all;
    max-width: 250px;

    @media ${device.tabletM} {
      margin: 0 30px 0 auto;
      max-width: 200px;
    }

    @media ${device.mobileL} {
      margin: 0 auto;
    }
  `,
  Input: styled.input`
    width: 100px;
    left: 50%;
    top: 50%;
    font-size: 15px;
    transform: translate(-50%, -50%);
    position: absolute;
    color: ${colors.gray};
    padding-left: 10px;
    border-radius: ${theme.radius.google};
    border: ${theme.border.google};

    &:nth-child(2n) {
      color: ${colors.scorpion};
    }
  `,
  Link: styled(NavLink)`
    text-decoration: none;
    color: inherit;
  `,
};
