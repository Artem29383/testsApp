import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Radio from 'components/Radio';
import useAction from 'hooks/useAction';
import { setStatusValid, toggleChecked } from 'models/passTest/reducer';
import S from './RadioAnswer.styled';

const RadioAnswer = ({ questId, answers, ids, entities }) => {
  const setRadio = useAction(toggleChecked);
  const setValid = useAction(setStatusValid);

  const handleChange = useCallback(
    id => {
      setRadio({
        questId,
        radioId: id,
      });
      setValid(questId);
    },
    [setRadio, setValid]
  );

  return ids.map(id => (
    <S.Radio key={id}>
      <Radio
        id={entities[id].id}
        label={entities[id].value}
        isChecked={answers.answer[0] === id}
        onHandleChange={handleChange}
      />
    </S.Radio>
  ));
};

RadioAnswer.propTypes = {
  questId: PropTypes.string,
  answers: PropTypes.object,
  entities: PropTypes.object,
  ids: PropTypes.array,
};

export default RadioAnswer;
