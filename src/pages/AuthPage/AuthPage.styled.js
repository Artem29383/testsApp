import styled from 'styled-components';
import { colors } from 'styles/constants';
import theme from '../../styles/theme';

export default {
  AuthForm: styled.form`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: ${theme.border.google};
    max-width: 350px;
    width: 100%;
    height: auto;
    border-radius: ${theme.radius.google};
  `,
  WrapInput: styled.div`
    width: 100%;
    padding: 0 40px;
    margin: 25px 0;
  `,
  Error: styled.div`
    margin-top: 10px;
    color: ${colors.blazeOrange};
    font-size: 16px;
    text-align: center;
  `,
};
