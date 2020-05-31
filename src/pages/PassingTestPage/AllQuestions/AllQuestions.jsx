import React, { memo } from 'react';
import PropTypes from 'prop-types';
import QuestItem from 'pages/PassingTestPage/AllQuestions/QuestItem';

const AllQuestions = ({ questId, ids, onQuestChange }) =>
  ids.map((id, i) => (
    <QuestItem
      key={id}
      answerId={id}
      questId={questId}
      index={i}
      onQuestChange={onQuestChange}
    />
  ));

AllQuestions.propTypes = {
  questId: PropTypes.string,
  ids: PropTypes.array,
  onQuestChange: PropTypes.func,
};

export default memo(AllQuestions);
