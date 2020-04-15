import React, { useEffect, useRef, useState } from 'react';
import Question from 'pages/CreateEditTestPage/Question';
import nanoid from 'nanoid';
import useSelector from 'hooks/useSelector';
import { getQuestionsIdsSelector } from 'models/test/selectors';
import useAction from 'hooks/useAction';
import { deleteTest, setDragAndDropArrayQuests } from 'models/test/reducer';
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
      // eslint-disable-next-line consistent-return
      return false;
    }

    if (destination.droppableId !== source.droppableId) return;

    const copyIds = [...questionsIds];
    copyIds.splice(source.index, 1);
    copyIds.splice(destination.index, 0, draggableId);
    setDndIds(copyIds);
  };

  const questions = questionsIds.map((id, index) => (
    <Question key={id} id={id} index={index} />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.PageTest>
        <S.Content ref={scrollPageToBottomTest}>
          <TestTitle />
          <Droppable droppableId="12345">
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
