import React, { memo, useCallback } from 'react';
import nanoid from 'nanoid';
import useAction from 'hooks/useAction';
import { pushAnswer } from 'models/test/reducer';
import PropTypes from 'prop-types';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import S from './QuestionFooter.styled';

const QuestionFooter = ({ id, ids, errorMsg }) => {
  const answerAdd = useAction(pushAnswer);
  const resetErrorChange = useCheckChangeQuest(id, errorMsg);

  const handleAddAnswerClick = useCallback(() => {
    const uniqId = nanoid();
    const answer = {
      id: uniqId,
      value: `Вариант ответа`,
      isChecked: false,
    };
    answerAdd({ id, qId: uniqId, answer });
    resetErrorChange(ids.length + 1);
  }, [ids]);

  return (
    <S.AddAnswer onClick={handleAddAnswerClick}>Добавить вариант</S.AddAnswer>
  );
};

QuestionFooter.propTypes = {
  id: PropTypes.string,
  ids: PropTypes.array,
  errorMsg: PropTypes.string,
};

export default memo(QuestionFooter);
