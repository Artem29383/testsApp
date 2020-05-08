import React, { memo } from 'react';
import PropTypes from 'prop-types';
import QuestItem from 'pages/PassingTestPage/AllQuestions/QuestItem';

const AllQuestions = ({ questId, onQuestChange, ids }) =>
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
  onQuestChange: PropTypes.func,
  ids: PropTypes.array,
};

export default memo(AllQuestions);
