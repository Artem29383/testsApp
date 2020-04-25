import React from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import {
  getEntitiesQuestionsSel,
  getIdsQuestionsSel,
} from 'models/passTest/selectors';
import S from './AllQuestions.styled';

const AllQuestions = ({ getQuestIndex, questId }) => {
  const ids = useSelector(getIdsQuestionsSel);
  const questions = useSelector(getEntitiesQuestionsSel);
  return ids.map((q, i) => (
    <S.AllQuestItem
      onClick={getQuestIndex}
      key={q}
      id={i}
      isComplete={questions[q].isValid}
      className={questId === q && 'active'}
      type={questions[q].type}
    >
      {questions[q].questName}
    </S.AllQuestItem>
  ));
};

AllQuestions.propTypes = {
  getQuestIndex: PropTypes.func,
  questId: PropTypes.string,
};

export default AllQuestions;
