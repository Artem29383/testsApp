import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import InputEdit from 'components/InputEdit';
import { setNumericAnswer } from 'models/test/reducer';
import useAction from 'hooks/useAction';
import { questionVariable } from 'styles/constants';
import S from './NumberQuestion.styled';

const NumberQuestion = ({ id, quest }) => {
  const { entities, ids } = quest;
  const numberId = ids[0];
  const [temp, setTemp] = useState('');
  const [value, setValue] = useState(entities[numberId].value);
  const [edit, setEdit] = useState(false);
  const setNumeric = useAction(setNumericAnswer);
  const handleValueChange = useCallback(
    e => {
      setValue(e.currentTarget.value);
    },
    [value]
  );
  const handleStartEditClick = useCallback(() => {
    setEdit(true);
    setTemp(value);
  }, [edit, temp]);

  const handleStopEditBlur = useCallback(() => {
    if (value.trim()) {
      setEdit(false);
      setNumeric({
        id,
        qId: numberId,
        value,
        isChecked: true,
        isValid: false,
        type: questionVariable.number,
      });
    }
  }, [edit, value, setNumeric]);

  const handleStopEditKey = useCallback(
    e => {
      if (value.trim()) {
        if (e.key === 'Escape') {
          setEdit(false);
          setValue(temp);
        }
        if (e.key === 'Enter') {
          setEdit(false);
          setNumeric({
            id,
            qId: numberId,
            value,
            isChecked: true,
            type: questionVariable.number,
            isValid: false,
            errorMsg: null,
          });
        }
      }
    },
    [edit, temp, setNumeric, value]
  );

  return (
    <S.Wrap>
      {edit ? (
        <InputEdit
          label="Правильный ответ"
          onHandler={handleValueChange}
          value={value}
          focus
          type="number"
          onBlur={handleStopEditBlur}
          onKeyDown={handleStopEditKey}
          checkMark
        />
      ) : (
        <S.Answer onClick={handleStartEditClick}>Ответ: {value}</S.Answer>
      )}
    </S.Wrap>
  );
};

export default NumberQuestion;
NumberQuestion.propTypes = {
  id: PropTypes.string,
  quest: PropTypes.object,
};
