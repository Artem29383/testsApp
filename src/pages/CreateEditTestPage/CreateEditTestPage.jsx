import React, { useEffect, useRef, useState } from 'react';
import nanoid from 'nanoid';
import useSelector from 'hooks/useSelector';
import {
  getQuestionsIdsSelector,
  getQuestionsSelector,
} from 'models/test/selectors';
import useAction from 'hooks/useAction';
import { deleteTest } from 'models/test/reducer';
import FooterTest from 'pages/CreateEditTestPage/FooterTest';
import TestTitle from 'pages/CreateEditTestPage/TestTitle';
import DraggableQuestion from 'pages/CreateEditTestPage/DraggableQuestion';
import S from './CreateEditTestPage.styled';

const CreateEditTestPage = () => {
  const questionsIds = useSelector(getQuestionsIdsSelector);
  const scrollPageToBottomTest = useRef(null);
  const [uniqId, setUniqId] = useState(nanoid());
  const removeTest = useAction(deleteTest);
  const questionsEntities = useSelector(getQuestionsSelector);

  useEffect(() => {
    return () => removeTest();
  }, []);

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
        <DraggableQuestion
          questionsIds={questionsIds}
          questionsEntities={questionsEntities}
        />
        <FooterTest setUniqId={setUniqId} uniqId={uniqId} />
      </S.Content>
    </S.PageTest>
  );
};

export default CreateEditTestPage;
