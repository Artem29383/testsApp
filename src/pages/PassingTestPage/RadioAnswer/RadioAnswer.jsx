import React from 'react';
import PropTypes from 'prop-types';
import Radio from 'components/Radio';
import useAction from 'hooks/useAction';
import { setStatusValid, toggleChecked } from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import {
  getAnswerQuestSel,
  getEntitiesQuestionsSel,
} from 'models/passTest/selectors';
import nanoid from 'nanoid';
import S from './RadioAnswer.styled';

const RadioAnswer = ({ questId }) => {
  const questions = useSelector(getEntitiesQuestionsSel);
  const answers = useSelector(getAnswerQuestSel, questId) || { answer: [] };
  const nameRadio = nanoid();
  const setRadio = useAction(toggleChecked);
  const setValid = useAction(setStatusValid);

  const setAnswerRadio = e => {
    setRadio({
      questId,
      radioId: e.currentTarget.id,
    });
    setValid(questId);
  };

  return questions[questId].answer.ids.map(id => (
    <S.Radio key={id}>
      <Radio
        id={questions[questId].answer.entities[id].id}
        label={questions[questId].answer.entities[id].value}
        name={nameRadio}
        isChecked={answers.answer[0] === id}
        onChangeHandler={setAnswerRadio}
      />
    </S.Radio>
  ));
};

RadioAnswer.propTypes = {
  questId: PropTypes.string,
};

export default RadioAnswer;
