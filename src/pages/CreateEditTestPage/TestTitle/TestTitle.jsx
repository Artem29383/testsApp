import React, { useState } from 'react';
import Input from 'components/Input';
import useAction from 'hooks/useAction';
import { setTestName } from 'models/test/reducer';
import { useSelector } from 'hooks/index';
import { getTestNameSelector } from 'models/test/selectors';
import S from './TestTitle.styled';

const TestTitle = () => {
  const [edit, setEdit] = useState(false);
  const testName = useSelector(getTestNameSelector);
  const [testTitle, setTestTitle] = useState(testName);
  const acceptTestName = useAction(setTestName);

  const editStartHandler = () => {
    setEdit(true);
  };

  const editChangeHandler = e => {
    setTestTitle(e.currentTarget.value);
  };

  const editStopBlur = () => {
    if (testTitle.trim()) {
      setEdit(false);
      acceptTestName(testTitle);
    }
  };

  const editStopKey = e => {
    if (e.key === 'Escape') {
      setEdit(false);
      setTestTitle(testName);
    }
    if (e.key === 'Enter' && testTitle.trim()) {
      setEdit(false);
      acceptTestName(testTitle);
    }
  };

  return (
    <S.TestForm>
      <S.WrapInput padding="25px 100px 25px 100px">
        {edit ? (
          <Input
            label="Название теста"
            focus
            value={testTitle}
            onChange={editChangeHandler}
            blur={editStopBlur}
            keyHandler={editStopKey}
          />
        ) : (
          <S.QuestNameDiv onClick={editStartHandler}>
            {testTitle}
          </S.QuestNameDiv>
        )}
      </S.WrapInput>
    </S.TestForm>
  );
};

export default TestTitle;
