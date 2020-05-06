import React from 'react';
import PropTypes from 'prop-types';
import Radio from 'components/Radio';
import useAction from 'hooks/useAction';
import { setStatusValid, toggleChecked } from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import { getEntitiesQuestionsSel } from 'models/passTest/selectors';
import S from './RadioAnswer.styled';

const RadioAnswer = ({ questId, answers }) => {
  const questions = useSelector(getEntitiesQuestionsSel);
  const setRadio = useAction(toggleChecked);
  const setValid = useAction(setStatusValid);

  return questions[questId].answer.ids.map(id => (
    <S.Radio key={id}>
      <Radio
        questId={questId}
        id={questions[questId].answer.entities[id].id}
        label={questions[questId].answer.entities[id].value}
        isChecked={answers.answer[0] === id}
        setRadio={setRadio}
        setValid={setValid}
      />
    </S.Radio>
  ));
};

RadioAnswer.propTypes = {
  questId: PropTypes.string,
  answers: PropTypes.object,
};

export default RadioAnswer;
