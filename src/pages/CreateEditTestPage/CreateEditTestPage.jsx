import React, { useEffect, useRef } from 'react';
import routes from 'constants/routes';
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
                  <Question
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
        <FooterTest scrollPageToBottomTest={scrollPageToBottomTest} />
      </S.Content>
    </S.PageTest>
  );
};

export default CreateEditTestPage;
