import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import { testResult } from 'utils/testResult';
import useSelector from 'hooks/useSelector';
import {
  getAllUserAnsweredEntitiesSel,
  getAllUserAnsweredIdSel,
  getEntitiesQuestionsSel,
  getIdsQuestionsSel,
  getQuestSelector,
  getUserAnswerSel,
} from 'models/passTest/selectors';
import useAction from 'hooks/useAction';
import { pushAnswer, setErrorMessage } from 'models/passTest/reducer';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import routes from 'constants/routes';
import Portal from 'components/Portal';
import useToggle from 'hooks/useToggle';
import S from './PassingTestFooter.styled';

const PassingTestFooter = ({ questIndex, setQuestIndex }) => {
  const ids = useSelector(getIdsQuestionsSel);
  const [showResult, setShowResult] = useToggle(false);
  const userResCurrentQuest = useSelector(getUserAnswerSel);
  const setError = useAction(setErrorMessage);
  const pushAns = useAction(pushAnswer);
  const currentQuest = useSelector(getQuestSelector)(questIndex);
  const correctAnswersForTest = useSelector(getEntitiesQuestionsSel);
  const answeredQuestsIds = useSelector(getAllUserAnsweredIdSel);
  const answeredQuestsEntities = useSelector(getAllUserAnsweredEntitiesSel);
  const [result, setResult] = useState(0);

  const getResult = () => {
    const counterCorrectAnswers = testResult(
      correctAnswersForTest,
      answeredQuestsIds,
      answeredQuestsEntities
    );
    setResult(counterCorrectAnswers);
    setShowResult(true);
  };

  const answerHandler = () => {
    if (userResCurrentQuest.length === 0) {
      if (!currentQuest.isValid) {
        setError('Выберите хотя бы один ответ');
      }
    } else {
      const userQuestAnswer = {
        id: ids[questIndex],
        userAnswer: userResCurrentQuest,
      };
      pushAns({
        questId: ids[questIndex],
        userQuestAnswer,
        type: currentQuest.type,
        isValid: true,
      });
      if (questIndex + 1 !== ids.length) {
        setQuestIndex(questIndex + 1);
      }
    }
  };

  return (
    <>
      <S.QuestFooter>
        <ButtonRipple onClickHandler={answerHandler}>Ответить</ButtonRipple>
        <ButtonRipple className="red" onClickHandler={getResult}>
          Завершить тест
        </ButtonRipple>
      </S.QuestFooter>
      <Portal id="modal">
        <ModalOverlay
          isFooter
          toggle={setShowResult}
          isOpen={showResult}
          headerText="Результаты теста"
          link="К списку тестов"
          linkPath={routes.tests}
          isClosable={false}
        >
          <S.Answer>Правильных ответов: {result}</S.Answer>
          <S.Answer>Всего вопросов: {ids.length}</S.Answer>
        </ModalOverlay>
      </Portal>
    </>
  );
};

PassingTestFooter.propTypes = {
  questIndex: PropTypes.number,
  setQuestIndex: PropTypes.func,
};

export default PassingTestFooter;
