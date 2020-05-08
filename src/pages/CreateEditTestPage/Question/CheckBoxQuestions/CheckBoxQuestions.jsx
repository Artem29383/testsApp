import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import CheckBoxButton from 'pages/CreateEditTestPage/Question/CheckBoxQuestions/CheckBoxButton';
import S from './CheckBoxQuestions.styled';

const CheckBoxQuestions = ({ id, quest, errorMsg }) => {
  const { ids } = quest;
  const checkBoxVariable = ids.map((qId, index) => {
    return (
      <CheckBoxButton
        index={index}
        key={qId}
        questionId={id}
        id={quest.entities[qId].id}
        checkBoxObject={quest.entities[qId]}
        errorMsg={errorMsg}
        ids={ids}
      />
    );
  });

  return (
    <Droppable droppableId={id} type={id}>
      {provided => (
        <S.DragZone ref={provided.innerRef} {...provided.droppableProps}>
          {checkBoxVariable}
          {provided.placeholder}
        </S.DragZone>
      )}
    </Droppable>
  );
};

export default CheckBoxQuestions;
CheckBoxQuestions.propTypes = {
  id: PropTypes.string,
  quest: PropTypes.object,
  errorMsg: PropTypes.string,
};
