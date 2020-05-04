import React, { useEffect, useRef, useCallback } from 'react';
import routes from 'constants/routes';
import useSelector from 'hooks/useSelector';
import { getQuestionsIdsSelector } from 'models/test/selectors';
import useAction from 'hooks/useAction';
import {
  deleteTest,
  setDragAndDropArrayAnswers,
  setDragAndDropArrayQuests,
} from 'models/test/reducer';
import FooterTest from 'pages/CreateEditTestPage/FooterTest';
import TestTitle from 'pages/CreateEditTestPage/TestTitle';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Question from 'pages/CreateEditTestPage/Question';
import { getIsInit } from 'models/tests/selectors';
import { Redirect } from 'react-router-dom';
import S from './CreateEditTestPage.styled';

const CreateEditTestPage = () => {
  const questionsIds = useSelector(getQuestionsIdsSelector);
  const scrollPageToBottomTest = useRef(null);
  const removeTest = useAction(deleteTest);
  const testsIsInit = useSelector(getIsInit);
  const setDndIds = useAction(setDragAndDropArrayQuests);
  const setDNDNewIds = useAction(setDragAndDropArrayAnswers);

  useEffect(() => {
    return () => removeTest();
  }, []);

  const onDragEnd = useCallback(
    result => {
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
        setDNDNewIds({
          questId: source.droppableId,
          id: destination.index,
          removeIndex: source.index,
          pasteDraggableId: draggableId,
        });
      }
    },
    [questionsIds, setDNDNewIds, setDndIds]
  );

  if (!testsIsInit) return <Redirect to={routes.testPage} />;

  return (
    <S.PageTest>
      <S.Content ref={scrollPageToBottomTest}>
        <TestTitle />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questDrop" type="questItem">
            {provided => (
              <S.DragZone ref={provided.innerRef} {...provided.droppableProps}>
                {questionsIds.map((id, index) => (
                  <Question id={id} key={id} index={index} />
                ))}
                {provided.placeholder}
              </S.DragZone>
            )}
          </Droppable>
        </DragDropContext>
        <FooterTest scrollPageToBottomTest={scrollPageToBottomTest} />
      </S.Content>
    </S.PageTest>
  );
};

export default CreateEditTestPage;
