import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputEdit from 'components/InputEdit';
import { setNumericAnswer } from 'models/test/reducer';
import useAction from 'hooks/useAction';
import { questionVariable } from 'styles/constants';
import useSelector from 'hooks/useSelector';
import { getQuestionEntities, getQuestionIds } from 'models/test/selectors';
import S from './NumberQuestion.styled';

const NumberQuestion = ({ id }) => {
  const entities = useSelector(getQuestionEntities, id);
  const ids = useSelector(getQuestionIds, id);
  const numberId = ids[0];
  const [temp, setTemp] = useState('');
  const [value, setValue] = useState(entities[numberId].value);
  const [edit, setEdit] = useState(false);
  const setNumeric = useAction(setNumericAnswer);
  const setValueHandler = e => {
    setValue(e.currentTarget.value);
  };

  const startEdit = () => {
    setEdit(true);
    setTemp(value);
  };

  const endEditBlur = () => {
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
  };

  const endEditKey = e => {
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
  };

  return (
    <S.Wrap>
      {edit ? (
        <InputEdit
          label="Правильный ответ"
          onHandler={setValueHandler}
          value={value}
          focus
          type="number"
          onBlur={endEditBlur}
          onKeyDown={endEditKey}
          checkMark
        />
      ) : (
        <S.Answer onClick={startEdit}>Ответ: {value}</S.Answer>
      )}
    </S.Wrap>
  );
};

export default NumberQuestion;
NumberQuestion.propTypes = {
  id: PropTypes.string,
};
