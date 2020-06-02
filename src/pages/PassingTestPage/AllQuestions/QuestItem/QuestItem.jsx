import React, { useCallback } from 'react';
import useSelector from 'hooks/useSelector';
import PropTypes from 'prop-types';
import { entitiesQuestionsSelector } from 'models/passTest/selectors';
import S from './QuestItem.styled';

const QuestItem = ({ answerId, questId, index, onQuestChange }) => {
  const questions = useSelector(entitiesQuestionsSelector);
  const handleQuestionClick = useCallback(() => {
    onQuestChange(index);
  }, [index]);

  return (
    <S.AllQuestItem
      className={questId === answerId && 'active'}
      isComplete={!questions[answerId].isValid}
      type={questions[answerId].type}
      onClick={handleQuestionClick}
    >
      {questions[answerId].questName}
    </S.AllQuestItem>
  );
};
QuestItem.propTypes = {
  answerId: PropTypes.string,
  questId: PropTypes.string,
  index: PropTypes.number,
  onQuestChange: PropTypes.func,
};
export default QuestItem;
