import React, { useEffect, useRef, useState } from 'react';
import Question from 'pages/CreateEditTestPage/Question';
import nanoid from 'nanoid';
import useSelector from 'hooks/useSelector';
import {
  getQuestionsIdsSelector,
  getQuestionsSelector,
} from 'models/test/selectors';
import useAction from 'hooks/useAction';
import { deleteTest, setDragAndDropArray } from 'models/test/reducer';
import { DragDropContext } from 'react-beautiful-dnd';
import FooterTest from 'pages/CreateEditTestPage/FooterTest';
import TestTitle from 'pages/CreateEditTestPage/TestTitle';
import S from './CreateEditTestPage.styled';

const CreateEditTestPage = () => {
  const questionsIds = useSelector(getQuestionsIdsSelector);
  const questionsEntities = useSelector(getQuestionsSelector);
  const scrollPageToBottomTest = useRef(null);
  const [uniqId, setUniqId] = useState(nanoid());
  const setDNDNewIds = useAction(setDragAndDropArray);
  const removeTest = useAction(deleteTest);

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
      // eslint-disable-next-line consistent-return
      return false;
    }

    if (destination.droppableId !== source.droppableId) return;

    const quest = questionsEntities[source.droppableId];
    const copyIds = [...quest.answer.ids];
    copyIds.splice(source.index, 1);
    copyIds.splice(destination.index, 0, draggableId);
    setDNDNewIds({ id: destination.droppableId, ids: copyIds });
  };

  useEffect(() => {
    scrollPageToBottomTest.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, [uniqId]);

  return (
    <S.PageTest>
      <DragDropContext onDragEnd={onDragEnd}>
        <S.Content ref={scrollPageToBottomTest}>
          <TestTitle />
          {questionsIds.map(id => (
            <Question key={id} id={id} />
          ))}
          <FooterTest setUniqId={setUniqId} uniqId={uniqId} />
        </S.Content>
      </DragDropContext>
    </S.PageTest>
  );
};

export default CreateEditTestPage;
