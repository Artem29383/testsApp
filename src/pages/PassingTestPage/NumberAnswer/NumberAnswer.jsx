import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import InputEdit from 'components/InputEdit';
import useAction from 'hooks/useAction';
import { setNumericAnswer, setStatusValid } from 'models/passTest/reducer';
import S from './NumberAnswer.styled';

const NumberAnswer = ({ questId, numberId, answers }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');
  const setNumberAnswer = useAction(setNumericAnswer);
  const setValid = useAction(setStatusValid);

  const handleStartEditClick = useCallback(() => {
    setEdit(true);
    setValue(answers.answer[0] || '');
    setValid(questId);
  }, [edit, value]);

  const handleInputChange = useCallback(
    e => {
      setValue(e.currentTarget.value);
    },
    [value]
  );
  const handleStopEditKey = useCallback(
    e => {
      if (e.key === 'Escape') {
        setEdit(false);
        setValue(answers.answer[0]);
      }
      if (e.key === 'Enter' && value.trim()) {
        setEdit(false);
        setNumberAnswer({
          questId,
          value,
          numberId,
        });
      }
    },
    [edit, value]
  );

  const handleStopEditBlur = useCallback(() => {
    if (value.trim()) {
      setEdit(false);
      setNumberAnswer({
        questId,
        value,
        numberId,
      });
    }
  }, [edit, value]);

  return (
    <S.NumberDiv>
      {edit ? (
        <InputEdit
          label="Численный ответ"
          focus
          type="number"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleStopEditKey}
          onBlur={handleStopEditBlur}
        />
      ) : (
        <S.Answer onClick={handleStartEditClick}>
          Введите ответ: {answers?.answer[0]}
        </S.Answer>
      )}
    </S.NumberDiv>
  );
};

NumberAnswer.propTypes = {
  questId: PropTypes.string,
  numberId: PropTypes.string,
  answers: PropTypes.object,
};

export default NumberAnswer;
