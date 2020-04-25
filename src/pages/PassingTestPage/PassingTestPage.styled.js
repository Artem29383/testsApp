import styled from 'styled-components';
import theme from 'styles/theme';
import { colors } from 'styles/constants';

export default {
  Content: styled.div`
    width: 100%;
    min-height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Form: styled.div`
    max-width: 800px;
    width: 100%;
    overflow: hidden;
    box-shadow: ${theme.shadows.lg};
    border-radius: ${theme.radius.google};
  `,
  Header: styled.div`
    height: 80px;
    width: 100%;
    color: ${colors.white};
    background-color: ${colors.dodjerBlue};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  HeaderTitle: styled.div`
    font-size: 36px;
  `,
  AllQuestions: styled.div`
    width: 35%;
    height: 100%;
    padding: 0 25px;
    box-shadow: -5px 0 5px -3px rgba(0, 0, 0, 0.75);
  `,
  PassQuest: styled.div`
    width: 65%;
    height: 100%;
    position: relative;
  `,
  QuestTitle: styled.div`
    font-size: 36px;
    word-break: break-all;
    padding: 15px 20px 20px 25px;
  `,
  QuestBody: styled.div`
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 230px;
    padding: 10px 0 20px 25px;
    box-shadow: inset 0 0 17px -3px rgba(0, 0, 0, 0.75);

    &::-webkit-scrollbar {
      width: 5px;
      margin-left: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${colors.gray};
      outline: 1px solid ${colors.olsoGray};
    }
  `,
  QuestFooter: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px 50px 20px 50px;
    position: absolute;
    bottom: 10px;
  `,
  Body: styled.div`
    width: 100%;
    height: 450px;
    display: flex;
    background-color: ${colors.windSand};
  `,
  AllQuestTitle: styled.div`
    width: 100%;
    font-size: 36px;
    color: ${colors.black};
    text-align: center;
    padding: 15px 10px 10px 10px;
  `,
  AllQuestList: styled.ul`
    width: 100%;
    height: 350px;
    overflow-y: auto;
    font-size: 28px;
    padding: 0 5px 0 0;

    &::-webkit-scrollbar {
      width: 5px;
      margin-left: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${colors.gray};
      outline: 1px solid ${colors.olsoGray};
    }
  `,
  Error: styled.div`
    color: ${colors.vermillion};
    font-size: 28px;
    padding: 20px 0 0 10px;
  `,
  Answer: styled.div`
    font-size: 36px;
    color: ${colors.dodjerBlue};
    text-align: center;
    padding: 10px 0;
  `,
};
