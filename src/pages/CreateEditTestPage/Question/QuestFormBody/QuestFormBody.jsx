import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { questionVariable } from 'styles/constants';
import RadioQuestions from 'pages/CreateEditTestPage/Question/RadioQuestions';
import NumberQuestion from 'pages/CreateEditTestPage/Question/NumberQuestion';
import CheckBoxQuestions from 'pages/CreateEditTestPage/Question/CheckBoxQuestions';
import S from './QuestFormBody.styled';

const QuestFormBody = ({ questType, quest, id, errorMsg }) => {
  return (
    <S.QuestFormBody>
      {questType === questionVariable.one && (
        <RadioQuestions id={id} quest={quest} errorMsg={errorMsg} />
      )}
      {questType === questionVariable.number && (
        <NumberQuestion id={id} quest={quest} errorMsg={errorMsg} />
      )}
      {questType === questionVariable.some && (
        <CheckBoxQuestions id={id} quest={quest} errorMsg={errorMsg} />
      )}
      <S.WrapInput>
        <S.Error>{errorMsg}</S.Error>
      </S.WrapInput>
    </S.QuestFormBody>
  );
};

QuestFormBody.propTypes = {
  questType: PropTypes.string,
  id: PropTypes.string,
  quest: PropTypes.object,
  errorMsg: PropTypes.string,
};

export default memo(QuestFormBody);
