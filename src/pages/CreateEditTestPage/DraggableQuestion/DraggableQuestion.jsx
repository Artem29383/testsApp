import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Question from 'pages/CreateEditTestPage/Question/Question';

const DraggableQuestion = ({ id, index, quest }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => <Question quest={quest} id={id} provided={provided} />}
    </Draggable>
  );
};

DraggableQuestion.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  quest: PropTypes.object,
};

export default DraggableQuestion;
