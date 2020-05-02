import React, { useEffect, useRef, useState } from 'react';
import nanoid from 'nanoid';
import useSelector from 'hooks/useSelector';
import {
  getQuestionsIdsSelector,
  getQuestionsSelector,
} from 'models/test/selectors';
import useAction from 'hooks/useAction';
import {
  deleteTest,
  setDragAndDropArrayAnswers,
  setDragAndDropArrayQuests,
} from 'models/test/reducer';
import FooterTest from 'pages/CreateEditTestPage/FooterTest';
import TestTitle from 'pages/CreateEditTestPage/TestTitle';
import DraggableQuestion from 'pages/CreateEditTestPage/DraggableQuestion';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import S from './CreateEditTestPage.styled';

const CreateEditTestPage = () => {
  const questionsIds = useSelector(getQuestionsIdsSelector);
  const scrollPageToBottomTest = useRef(null);
  const [uniqId, setUniqId] = useState(nanoid());
  const removeTest = useAction(deleteTest);
  const questionsEntities = useSelector(getQuestionsSelector);
  const setDndIds = useAction(setDragAndDropArrayQuests);
  const setDNDNewIds = useAction(setDragAndDropArrayAnswers);

  useEffect(() => {
    return () => removeTest();
  }, []);

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

  useEffect(() => {
    scrollPageToBottomTest.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, [uniqId]);

  return (
    <S.PageTest>
      <S.Content ref={scrollPageToBottomTest}>
        <TestTitle />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questDrop" type="questItem">
            {provided => (
              <S.DragZone ref={provided.innerRef} {...provided.droppableProps}>
                {questionsIds.map((id, index) => (
                  <DraggableQuestion
                    id={id}
                    key={id}
                    quest={questionsEntities[id]}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </S.DragZone>
            )}
          </Droppable>
        </DragDropContext>
        <FooterTest setUniqId={setUniqId} uniqId={uniqId} />
      </S.Content>
    </S.PageTest>
  );
};

export default CreateEditTestPage;
