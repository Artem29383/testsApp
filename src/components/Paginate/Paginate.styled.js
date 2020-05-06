import styled from 'styled-components';
import { colors } from 'styles/constants';
import { device } from 'constants/device';
/* stylelint-disable */

export default {
  PaginateDiv: styled.div`
    width: 100%;
    padding: 0 0 20px 0;
  `,
  PaginateUl: styled.ul`
    display: flex;
    justify-content: center;
  `,
  PaginateLi: styled.li`
    padding: 6px 20px;
    font-size: 24px;
    margin-left: -1px;
    cursor: pointer;
    line-height: 1.42857143;
    color: ${colors.astral};
    text-decoration: none;
    background-color: ${colors.white};
    border: 1px solid ${colors.alto};
    transition: background-color 0.1s linear, border-color 0.1s linear,
      color 0.1s linear;

    &.active {
      color: ${colors.white};
      background-color: ${colors.astral};
      border-color: ${colors.astral};
    }

    &:hover {
      color: ${colors.white};
      background-color: ${colors.lavenderPurple};
      border-color: ${colors.astral};
    }

    @media ${device.mobileL} {
      padding: 3px 15px;
      font-size: 16px;
    }
  `,
};
/* stylelint-enable */
