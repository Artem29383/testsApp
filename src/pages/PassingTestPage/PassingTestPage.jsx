import React, { useEffect, useState } from 'react';
import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';
import { useParams } from 'react-router-dom';
import { loadSelector, passingTestSelector } from 'models/passTest/selectors';
import Loader from 'components/Loader';
import RadioAnswer from 'pages/PassingTestPage/RadioAnswer/RadioAnswer';
import { questionVariable } from 'styles/constants';
import ButtonRipple from 'components/ButtonRipple';
import {
  getTestData,
  reset,
  setDataCurrentQuest,
  setLoading,
} from 'models/passTest/reducer';
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
  const state = useSelector(passingTestSelector);
  const isLoad = useSelector(loadSelector);
  const setLoad = useAction(setLoading);
  const { testName } = state;
  const { ids } = state.questions;
  const [questIndex, setQuestIndex] = useState(0);
  const currentQuest = state.questions.entities[ids[questIndex]];
  const { errorMessage } = state;
  const setThisQuest = useAction(setDataCurrentQuest);
  const resetTest = useAction(reset);

  useEffect(() => {
    if (currentQuest) {
      setThisQuest({
        id: ids[questIndex],
      });
    }
  }, [currentQuest]);

  const fetchTestDataPassing = () => {
    setLoad(true);
    resetError();
    fetchTest(testId);
  };

  useEffect(() => {
    fetchTestDataPassing();
    return () => resetTest();
  }, []);

  if (isLoad) return <Loader />;
  if (error && idError === 'passingTest')
    return (
      <S.ErrorServer>
        <ButtonRipple onClickHandler={fetchTestDataPassing}>
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
                  answers={state.answers[ids[questIndex]] || { answer: [] }}
                  ids={state.questions.entities[ids[questIndex]].answer.ids}
                  entities={
                    state.questions.entities[ids[questIndex]].answer.entities
                  }
                />
              )}
              {currentQuest.type === questionVariable.number && (
                <NumberAnswer
                  questId={ids[questIndex]}
                  numberId={currentQuest.answer.ids[0]}
                  answers={state.answers[ids[questIndex]]}
                />
              )}
              {currentQuest.type === questionVariable.some && (
                <CheckBoxAnswer
                  questions={state.questions.entities}
                  questId={ids[questIndex]}
                  answers={state.answers[ids[questIndex]] || { answer: [] }}
                  ids={state.questions.entities[ids[questIndex]].answer.ids}
                  entities={
                    state.questions.entities[ids[questIndex]].answer.entities
                  }
                />
              )}
            </S.QuestBody>
            {errorMessage && <S.Error>{errorMessage}</S.Error>}
            <PassingTestFooter
              questions={state.questions.entities}
              ids={ids}
              userAnswers={state.answers}
            />
          </S.PassQuest>
          <S.AllQuestions>
            <S.AllQuestTitle>Вопросы</S.AllQuestTitle>
            <S.AllQuestList>
              <AllQuestions
                questId={ids[questIndex]}
                onQuestChange={setQuestIndex}
                ids={ids}
              />
            </S.AllQuestList>
          </S.AllQuestions>
        </S.Body>
      </S.Form>
    </S.Content>
  );
};

export default PassingTestPage;
