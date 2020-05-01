import React, { useEffect, useRef, useState } from 'react';
import Question from 'pages/CreateEditTestPage/Question';
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
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import FooterTest from 'pages/CreateEditTestPage/FooterTest';
import TestTitle from 'pages/CreateEditTestPage/TestTitle';
import S from './CreateEditTestPage.styled';

const CreateEditTestPage = () => {
  const questionsIds = useSelector(getQuestionsIdsSelector);
  const scrollPageToBottomTest = useRef(null);
  const [uniqId, setUniqId] = useState(nanoid());
  const removeTest = useAction(deleteTest);
  const setDndIds = useAction(setDragAndDropArrayQuests);
  const questionsEntities = useSelector(getQuestionsSelector);
  const setDNDNewIds = useAction(setDragAndDropArrayAnswers);
  useEffect(() => {
    return () => removeTest();
  }, []);

  useEffect(() => {
    scrollPageToBottomTest.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, [uniqId]);

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

  const questions = questionsIds.map((id, index) => (
    <Question key={id} id={id} index={index} quest={questionsEntities[id]} />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.PageTest>
        <S.Content ref={scrollPageToBottomTest}>
          <TestTitle />
          <Droppable droppableId="questDrop" type="questItem">
            {provided => (
              <S.DragZone ref={provided.innerRef} {...provided.droppableProps}>
                {questions}
                {provided.placeholder}
              </S.DragZone>
            )}
          </Droppable>
          <FooterTest setUniqId={setUniqId} uniqId={uniqId} />
        </S.Content>
      </S.PageTest>
    </DragDropContext>
  );
};

export default CreateEditTestPage;
