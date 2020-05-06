import React from 'react';
import useSelector from 'hooks/useSelector';
import PropTypes from 'prop-types';
import { entitiesQuestionsSelector } from 'models/passTest/selectors';
import S from './QuestItem.styled';

const QuestItem = ({ answerId, questId, index, onQuestChange }) => {
  const questions = useSelector(entitiesQuestionsSelector);

  const onQuestClick = () => {
    onQuestChange(index);
  };

  return (
    <S.AllQuestItem
      onClick={onQuestClick}
      isComplete={!questions[answerId].isValid}
      className={questId === answerId && 'active'}
      type={questions[answerId].type}
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
