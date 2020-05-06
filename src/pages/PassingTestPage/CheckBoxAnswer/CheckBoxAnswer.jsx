import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/CheckBox';
import useAction from 'hooks/useAction';
import { setStatusValid, toggleCheckBox } from 'models/passTest/reducer';
import S from './CheckBoxAnswer.styled';

const CheckBoxAnswer = ({ questId, answers, ids, entities }) => {
  const setCheckBox = useAction(toggleCheckBox);
  const setValid = useAction(setStatusValid);

  const handleChange = useCallback(
    id => {
      setCheckBox({
        questId,
        checkBoxId: id,
      });
      setValid(questId);
    },
    [setCheckBox, setValid]
  );

  return ids.map(id => {
    return (
      <S.CheckBox key={id}>
        <CheckBox
          label={entities[id].value}
          id={id}
          onHandleChange={handleChange}
          isChecked={!!answers.answer[id]}
        />
      </S.CheckBox>
    );
  });
};

CheckBoxAnswer.propTypes = {
  questId: PropTypes.string,
  answers: PropTypes.object,
  entities: PropTypes.object,
  ids: PropTypes.array,
};

export default CheckBoxAnswer;
