import React from 'react';
import nanoid from 'nanoid';
import useAction from 'hooks/useAction';
import { pushAnswer } from 'models/test/reducer';
import PropTypes from 'prop-types';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import useSelector from 'hooks/useSelector';
import { getQuestionIds } from 'models/test/selectors';
import S from './QuestionFooter.styled';

const QuestionFooter = ({ id }) => {
  const ids = useSelector(getQuestionIds, id);
  const answerAdd = useAction(pushAnswer);
  const resetErrorChange = useCheckChangeQuest(id);

  const addAnswer = () => {
    const uniqId = nanoid();
    const answer = {
      id: uniqId,
      value: `Вариант ответа`,
      isChecked: false,
    };
    answerAdd({ id, qId: uniqId, answer });
    resetErrorChange(ids.length + 1);
  };

  return <S.AddAnswer onClick={addAnswer}>Добавить вариант</S.AddAnswer>;
};

QuestionFooter.propTypes = {
  id: PropTypes.string,
};

export default QuestionFooter;
