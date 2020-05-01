import React from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import { getIdsQuestionsSel } from 'models/passTest/selectors';
import QuestItem from 'pages/PassingTestPage/AllQuestions/QuestItem';

const AllQuestions = ({ questId, onQuestChange }) => {
  const ids = useSelector(getIdsQuestionsSel);

  return ids.map((id, i) => (
    <QuestItem
      key={id}
      answerId={id}
      questId={questId}
      index={i}
      onQuestChange={onQuestChange}
    />
  ));
};

AllQuestions.propTypes = {
  questId: PropTypes.string,
  onQuestChange: PropTypes.func,
};

export default AllQuestions;
