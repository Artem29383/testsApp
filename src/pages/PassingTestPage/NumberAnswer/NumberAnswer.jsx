import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputEdit from 'components/InputEdit';
import useAction from 'hooks/useAction';
import {
  setDataCurrentQuest,
  setDefaultAnswerNumeric,
  setErrorMessage,
  setNumericAnswer,
  setStatusInvalid,
  setUserTouchedNumAnswer,
} from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import {
  getAllUserAnsweredEntitiesSel,
  getAllUserAnsweredIdSel,
  getAnswerOptionsQuSel,
  getIdsAnswerOptionsQuSel,
} from 'models/passTest/selectors';
import S from './NumberAnswer.styled';

const NumberAnswer = ({ questId, questIndex, currentQuest }) => {
  const answerOptions = useSelector(getAnswerOptionsQuSel);
  const [idsAnswerOptions] = useSelector(getIdsAnswerOptionsQuSel);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');
  const setNumeric = useAction(setNumericAnswer);
  const setThisQuest = useAction(setDataCurrentQuest);
  const resetNumericAnswer = useAction(setDefaultAnswerNumeric);
  const setError = useAction(setErrorMessage);
  const answeredQuestsIds = useSelector(getAllUserAnsweredIdSel);
  const answeredQuestsEntities = useSelector(getAllUserAnsweredEntitiesSel);
  const setUserAnswerFromCache = useAction(setUserTouchedNumAnswer);
  const setInvalid = useAction(setStatusInvalid);

  useEffect(() => {
    setThisQuest({
      correctAnswer: [
        currentQuest.answer.entities[currentQuest.answer.ids[0]].value,
      ],
      entities: currentQuest.answer.entities,
      ids: currentQuest.answer.ids,
      questId,
      userAnswer: [],
    });
    resetNumericAnswer(currentQuest.answer.ids[0]);
    setError('');
    if (answeredQuestsIds.includes(questId)) {
      setUserAnswerFromCache({
        taskId: currentQuest.answer.ids[0],
        answers: answeredQuestsEntities[questId].userAnswer,
      });
    }
  }, [questIndex]);

  const startEdit = () => {
    setEdit(true);
    setValue(answerOptions[idsAnswerOptions].value);
    setError('');
  };

  const changeHandler = e => {
    setValue(e.currentTarget.value);
  };

  const stopEditBlur = () => {
    if (value.trim()) {
      if (currentQuest.isValid) {
        setInvalid(questId);
      }
      setNumeric({ taskId: currentQuest.answer.ids[0], value });
      setEdit(false);
    }
  };

  const stopEditKey = e => {
    if (e.key === 'Enter' && value.trim()) {
      if (currentQuest.isValid) {
        setInvalid(questId);
      }
      setNumeric({ taskId: currentQuest.answer.ids[0], value });
      setEdit(false);
    }
    if (e.key === 'Escape') {
      setValue(answerOptions[idsAnswerOptions].value);
      setEdit(false);
    }
  };

  return (
    <S.NumberDiv>
      {edit ? (
        <InputEdit
          label="Численный ответ"
          focus
          type="number"
          value={value}
          onHandler={changeHandler}
          onBlur={stopEditBlur}
          onKeyDown={stopEditKey}
        />
      ) : (
        <S.Answer onClick={startEdit}>
          Введите ответ:{' '}
          {answerOptions[idsAnswerOptions] &&
            answerOptions[idsAnswerOptions].value}
        </S.Answer>
      )}
    </S.NumberDiv>
  );
};

NumberAnswer.propTypes = {
  questId: PropTypes.string,
  questIndex: PropTypes.number,
  currentQuest: PropTypes.object,
};

export default NumberAnswer;
