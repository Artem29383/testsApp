import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import { testResult } from 'utils/testResult';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import routes from 'constants/routes';
import Portal from 'components/Portal';
import useToggle from 'hooks/useToggle';
import useAction from 'hooks/useAction';
import { setStatusInvalid } from 'models/passTest/reducer';
import S from './PassingTestFooter.styled';

const PassingTestFooter = ({ questions, ids, userAnswers }) => {
  const [showResult, setShowResult] = useToggle(false);
  const [result, setResult] = useState(0);
  const setInvalidQuest = useAction(setStatusInvalid);

  const handleCalculateResultClick = () => {
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
        <ButtonRipple className="red" onClick={handleCalculateResultClick}>
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
  questions: PropTypes.object,
  ids: PropTypes.array,
  userAnswers: PropTypes.object,
};

export default PassingTestFooter;
