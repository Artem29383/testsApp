import styled from 'styled-components';
import theme from 'styles/theme';
import { device } from 'constants/device';

export default {
  QuestionForm: styled.div`
    width: 100%;
    padding: 20px 0;
    border-radius: ${theme.radius.google};
    border: ${({ isValid }) =>
      isValid ? theme.border.googleError : theme.border.google};
    margin: 25px 0;
    height: auto;
  `,
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
