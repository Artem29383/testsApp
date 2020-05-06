import styled from 'styled-components';
import { colors } from 'styles/constants';

export default {
  QuestFooter: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px 50px 20px 50px;
    position: absolute;
    bottom: 10px;
  `,
  Answer: styled.div`
    font-size: 36px;
    color: ${colors.dodjerBlue};
    text-align: center;
    padding: 10px 0;
  `,
};
