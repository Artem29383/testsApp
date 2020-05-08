import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import RadioButton from 'pages/CreateEditTestPage/Question/RadioQuestions/RadioButton';
import S from './RadioQuestions.styled';

const RadioQuestions = ({ id, quest, errorMsg }) => {
  const { entities, ids } = quest;

  const radioBtns = ids.map((qId, index) => (
    <RadioButton
      key={entities[qId].id}
      questionId={id}
      index={index}
      id={entities[qId].id}
      ids={ids}
      radioObject={entities[qId]}
      errorMsg={errorMsg}
    />
  ));

  return (
    <Droppable droppableId={id} type={id}>
      {provided => (
        <S.DragZone ref={provided.innerRef} {...provided.droppableProps}>
          {radioBtns}
          {provided.placeholder}
        </S.DragZone>
      )}
    </Droppable>
  );
};
export default RadioQuestions;
RadioQuestions.propTypes = {
  id: PropTypes.string,
  quest: PropTypes.object,
  errorMsg: PropTypes.string,
};
