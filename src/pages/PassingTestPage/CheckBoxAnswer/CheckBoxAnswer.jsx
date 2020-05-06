import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/CheckBox';
import useAction from 'hooks/useAction';
import { setStatusValid, toggleCheckBox } from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import { getEntitiesQuestionsSel } from 'models/passTest/selectors';
import S from './CheckBoxAnswer.styled';

const CheckBoxAnswer = ({ questId, answers }) => {
  const questions = useSelector(getEntitiesQuestionsSel);
  const setCheckBox = useAction(toggleCheckBox);
  const setValid = useAction(setStatusValid);

  const onCheckBoxChange = e => {
    setCheckBox({
      questId,
      checkBoxId: e.currentTarget.id,
    });
    setValid(questId);
  };

  return questions[questId].answer.ids.map(id => {
    return (
      <S.CheckBox key={id}>
        <CheckBox
          label={questions[questId].answer.entities[id].value}
          id={id}
          isChecked={!!answers.answer[id]}
          onChangeHandler={onCheckBoxChange}
        />
      </S.CheckBox>
    );
  });
};

CheckBoxAnswer.propTypes = {
  questId: PropTypes.string,
  answers: PropTypes.object,
};

export default CheckBoxAnswer;
