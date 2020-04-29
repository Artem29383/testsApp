import React, { useState } from 'react';
import ButtonRipple from 'components/ButtonRipple';
import { testResult } from 'utils/testResult';
import useSelector from 'hooks/useSelector';
import {
  getAnswersQuest,
  getEntitiesQuestionsSel,
  getIdsQuestionsSel,
} from 'models/passTest/selectors';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import routes from 'constants/routes';
import Portal from 'components/Portal';
import useToggle from 'hooks/useToggle';
import useAction from 'hooks/useAction';
import { setStatusInvalid } from 'models/passTest/reducer';
import S from './PassingTestFooter.styled';

const PassingTestFooter = () => {
  const questions = useSelector(getEntitiesQuestionsSel);
  const ids = useSelector(getIdsQuestionsSel);
  const userAnswers = useSelector(getAnswersQuest);
  const [showResult, setShowResult] = useToggle(false);
  const [result, setResult] = useState(0);
  const setInvalidQuest = useAction(setStatusInvalid);

  const getResult = () => {
    const resultOfChecking = testResult(questions, ids, userAnswers);
    if (typeof resultOfChecking === 'object') {
      setInvalidQuest(resultOfChecking);
    } else {
      setResult(resultOfChecking);
      setShowResult(true);
    }
  };

  return (
    <>
      <S.QuestFooter>
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

export default PassingTestFooter;
