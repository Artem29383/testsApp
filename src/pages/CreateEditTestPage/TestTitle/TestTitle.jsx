import React, { memo } from 'react';
import Input from 'components/Input';
import useAction from 'hooks/useAction';
import { setTestName } from 'models/test/reducer';
import { useSelector } from 'hooks/index';
import { getTestNameSelector } from 'models/test/selectors';
import S from './TestTitle.styled';

const TestTitle = () => {
  const testName = useSelector(getTestNameSelector);
  const acceptTestName = useAction(setTestName);

  const editChangeHandler = e => {
    acceptTestName(e.currentTarget.value);
  };
  return (
    <S.TestForm>
      <S.WrapInput padding="25px 100px 25px 100px">
        <Input
          label="Название теста"
          value={testName}
          onChange={editChangeHandler}
        />
      </S.WrapInput>
    </S.TestForm>
  );
};

export default memo(TestTitle);
