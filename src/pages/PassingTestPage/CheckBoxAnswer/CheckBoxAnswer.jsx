import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/CheckBox';
import useAction from 'hooks/useAction';
import { setStatusValid, toggleCheckBox } from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import {
  getAnswerQuestSel,
  getEntitiesQuestionsSel,
} from 'models/passTest/selectors';
import S from './CheckBoxAnswer.styled';

const CheckBoxAnswer = ({ questId }) => {
  const questions = useSelector(getEntitiesQuestionsSel);
  const answers = useSelector(getAnswerQuestSel)(questId) || { answer: {} };
  const setCheckBox = useAction(toggleCheckBox);
  const setValid = useAction(setStatusValid);

  const checkBoxHandler = e => {
    setCheckBox({
      qId: questId,
      cId: e.currentTarget.id,
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
          onChangeHandler={checkBoxHandler}
        />
      </S.CheckBox>
    );
  });
};

CheckBoxAnswer.propTypes = {
  questId: PropTypes.string,
};

export default CheckBoxAnswer;
