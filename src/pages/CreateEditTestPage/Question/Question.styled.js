import styled from 'styled-components';
import theme from 'styles/theme';

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
  QuestionContent: styled.div``,
};
