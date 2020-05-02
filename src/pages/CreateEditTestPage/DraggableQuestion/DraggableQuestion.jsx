import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import S from 'pages/CreateEditTestPage/CreateEditTestPage.styled';
import useAction from 'hooks/useAction';
import {
  setDragAndDropArrayAnswers,
  setDragAndDropArrayQuests,
} from 'models/test/reducer';
import Question from 'pages/CreateEditTestPage/Question/Question';

const DraggableQuestion = ({ questionsIds, questionsEntities }) => {
  const setDndIds = useAction(setDragAndDropArrayQuests);
  const setDNDNewIds = useAction(setDragAndDropArrayAnswers);

  const questions = questionsIds.map((id, index) => (
    <Question key={id} id={id} index={index} quest={questionsEntities[id]} />
  ));

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId !== source.droppableId) return;

    if (destination.droppableId === 'questDrop') {
      const copyIds = [...questionsIds];
      copyIds.splice(source.index, 1);
      copyIds.splice(destination.index, 0, draggableId);
      setDndIds(copyIds);
    } else {
      const quests = questionsEntities[source.droppableId];
      const copyIds = [...quests.answer.ids];
      copyIds.splice(source.index, 1);
      copyIds.splice(destination.index, 0, draggableId);
      setDNDNewIds({ id: destination.droppableId, ids: copyIds });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="questDrop" type="questItem">
        {provided => (
          <S.DragZone ref={provided.innerRef} {...provided.droppableProps}>
            {questions}
            {provided.placeholder}
          </S.DragZone>
        )}
      </Droppable>
    </DragDropContext>
  );
};

DraggableQuestion.propTypes = {
  questionsIds: PropTypes.array,
  questionsEntities: PropTypes.object,
};

export default DraggableQuestion;
