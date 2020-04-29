import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputEdit from 'components/InputEdit';
import useAction from 'hooks/useAction';
import { setNumericAnswer, setStatusValid } from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import { getAnswerQuestSel } from 'models/passTest/selectors';
import S from './NumberAnswer.styled';

const NumberAnswer = ({ questId, nId }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');
  const answers = useSelector(getAnswerQuestSel)(questId);
  const setNumberAnswer = useAction(setNumericAnswer);
  const setValid = useAction(setStatusValid);

  const startEdit = () => {
    setEdit(true);
    setValue(answers.answer[0] || '');
    setValid(questId);
  };

  const changeHandler = e => {
    setValue(e.currentTarget.value);
  };

  const stopEditKey = e => {
    if (e.key === 'Escape') {
      setEdit(false);
      setValue(answers.answer[0]);
    }
    if (e.key === 'Enter' && value.trim()) {
      setEdit(false);
      setNumberAnswer({
        qId: questId,
        value,
        nId,
      });
    }
  };

  const stopEditBlur = () => {
    if (value.trim()) {
      setEdit(false);
      setNumberAnswer({
        qId: questId,
        value,
        nId,
      });
    }
  };

  return (
    <S.NumberDiv>
      {edit ? (
        <InputEdit
          onHandler={changeHandler}
          label="Численный ответ"
          focus
          type="number"
          value={value}
          onKeyDown={stopEditKey}
          onBlur={stopEditBlur}
        />
      ) : (
        <S.Answer onClick={startEdit}>
          Введите ответ: {answers?.answer[0]}
        </S.Answer>
      )}
    </S.NumberDiv>
  );
};

NumberAnswer.propTypes = {
  questId: PropTypes.string,
  nId: PropTypes.string,
};

export default NumberAnswer;
