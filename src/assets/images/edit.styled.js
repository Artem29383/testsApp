import styled from 'styled-components';
import { colors } from 'styles/constants';

export default {
  Icon: styled.svg`
    width: 30px;
    height: 30px;
    fill: ${colors.gray};
    margin-left: auto;
    cursor: pointer;

    &:hover {
      fill: ${colors.blazeOrange};
    }
  `,
};
