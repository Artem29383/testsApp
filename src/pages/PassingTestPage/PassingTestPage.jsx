import React, { useEffect, useState } from 'react';
import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';
import { useParams } from 'react-router-dom';
import {
  getErrorSel,
  getIdsQuestionsSel,
  getLoadSelector,
  getQuestSelector,
  getTestNameSelector,
} from 'models/passTest/selectors';
import Loader from 'components/Loader';
import RadioAnswer from 'pages/PassingTestPage/RadioAnswer/RadioAnswer';
import { questionVariable } from 'styles/constants';
import ButtonRipple from 'components/ButtonRipple';
import { getTestData, reset, setLoading } from 'models/passTest/reducer';
import NumberAnswer from 'pages/PassingTestPage/NumberAnswer';
import AllQuestions from 'pages/PassingTestPage/AllQuestions';
import CheckBoxAnswer from 'pages/PassingTestPage/CheckBoxAnswer';
import useFetchingError from 'hooks/useFetchingError';
import PassingTestFooter from 'pages/PassingTestPage/PassingTestFooter';
import S from './PassingTestPage.styled';

const PassingTestPage = () => {
  const { error, resetError, idError } = useFetchingError();
  const fetchTest = useAction(getTestData);
  const testId = useParams().id;
  const isLoad = useSelector(getLoadSelector);
  const setLoad = useAction(setLoading);
  const testName = useSelector(getTestNameSelector);
  const ids = useSelector(getIdsQuestionsSel);
  const [questIndex, setQuestIndex] = useState(0);
  const currentQuest = useSelector(getQuestSelector)(questIndex);
  const errorMessage = useSelector(getErrorSel);
  const resetTest = useAction(reset);

  const getQuestIndex = e => {
    setQuestIndex(Number(e.currentTarget.id));
  };

  const getTestDataPassing = () => {
    setLoad(true);
    resetError('');
    fetchTest(testId);
  };

  useEffect(() => {
    getTestDataPassing();
    return () => resetTest();
  }, []);

  if (isLoad) return <Loader />;
  if (error && idError === 'passingTest')
    return (
      <S.ErrorServer>
        <ButtonRipple onClickHandler={getTestDataPassing}>
          Повторить
        </ButtonRipple>
        <S.ErrorServerMessage>{error}</S.ErrorServerMessage>
      </S.ErrorServer>
    );
  return (
    <S.Content>
      <S.Form>
        <S.Header>
          <S.HeaderTitle>Название теста: {testName}</S.HeaderTitle>
        </S.Header>
        <S.Body>
          <S.PassQuest>
            <S.QuestTitle>Вопрос: {currentQuest.questName}</S.QuestTitle>
            <S.QuestBody>
              {currentQuest.type === questionVariable.one && (
                <RadioAnswer
                  questId={ids[questIndex]}
                  questIndex={questIndex}
                  currentQuest={currentQuest}
                />
              )}
              {currentQuest.type === questionVariable.number && (
                <NumberAnswer
                  questId={ids[questIndex]}
                  questIndex={questIndex}
                  currentQuest={currentQuest}
                />
              )}
              {currentQuest.type === questionVariable.some && (
                <CheckBoxAnswer
                  currentQuest={currentQuest}
                  questId={ids[questIndex]}
                  questIndex={questIndex}
                />
              )}
            </S.QuestBody>
            {errorMessage && <S.Error>{errorMessage}</S.Error>}
            <PassingTestFooter
              questIndex={questIndex}
              setQuestIndex={setQuestIndex}
            />
          </S.PassQuest>
          <S.AllQuestions>
            <S.AllQuestTitle>Вопросы</S.AllQuestTitle>
            <S.AllQuestList>
              <AllQuestions
                getQuestIndex={getQuestIndex}
                questId={ids[questIndex]}
              />
            </S.AllQuestList>
          </S.AllQuestions>
        </S.Body>
      </S.Form>
    </S.Content>
  );
};

export default PassingTestPage;
