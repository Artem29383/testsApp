import React, { useEffect, useState } from 'react';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import RadioQuestions from 'pages/CreateEditTestPage/Question/RadioQuestions';
import NumberQuestion from 'pages/CreateEditTestPage/Question/NumberQuestion';
import CheckBoxQuestions from 'pages/CreateEditTestPage/Question/CheckBoxQuestions';
import useSelector from 'hooks/useSelector';
import { getErrorMsgSelector, getQuestSelector } from 'models/test/selectors';
import useAction from 'hooks/useAction';
import {
  setInitialRadioOrCheckBox,
  setNumericAnswer,
} from 'models/test/reducer';
import { questionVariable } from 'styles/constants';
import QuestionHeader from 'pages/CreateEditTestPage/Question/QuestionHeader';
import QuestionFooter from 'pages/CreateEditTestPage/Question/QuestionFooter';
import S from './Question.styled';

const Question = ({ id }) => {
  const errorMsg = useSelector(getErrorMsgSelector)(id);
  const quest = useSelector(getQuestSelector)(id);
  const [value, setValue] = useState(quest.type || questionVariable.one);
  const [temp, setTemp] = useState(quest.type);
  const [questType, setQuestType] = useState(value);
  const nameRadio = nanoid();
  const setInitAnswer = useAction(setInitialRadioOrCheckBox);
  const setNumeric = useAction(setNumericAnswer);

  useEffect(() => {
    if (!quest.isValid || value !== temp) {
      setTemp(value);
      const uniqId = nanoid();
      if (value === questionVariable.one || value === questionVariable.some) {
        const answer = {
          id: uniqId,
          value: `Вариант ответа`,
          isChecked: false,
        };
        setInitAnswer({
          id,
          qId: uniqId,
          answer,
          type: value,
          isValid: false,
          errorMsg: null,
        });
      }
      if (value === questionVariable.number) {
        setNumeric({
          id,
          qId: uniqId,
          value: '0',
          isChecked: true,
          isValid: false,
          type: value,
        });
      }
      setQuestType(value);
    }
  }, [value]);

  return (
    <S.QuestionForm isValid={errorMsg}>
      <QuestionHeader quest={quest} setValue={setValue} id={id} value={value} />
      <S.QuestFormBody>
        {questType === questionVariable.one && (
          <RadioQuestions
            name={nameRadio}
            entities={quest.answer.entities}
            ids={quest.answer.ids}
            id={id}
          />
        )}
        {questType === questionVariable.number && (
          <NumberQuestion
            id={id}
            ids={quest.answer.ids}
            entities={quest.answer.entities}
            numberId={quest.answer.ids[0]}
          />
        )}
        {questType === questionVariable.some && (
          <CheckBoxQuestions
            entities={quest.answer.entities}
            ids={quest.answer.ids}
            id={id}
          />
        )}
        <S.WrapInput>
          <S.Error>{errorMsg}</S.Error>
        </S.WrapInput>
      </S.QuestFormBody>
      {questType !== questionVariable.number && (
        <QuestionFooter ids={quest.answer.ids} id={id} />
      )}
    </S.QuestionForm>
  );
};

export default Question;
Question.propTypes = {
  id: PropTypes.string,
};
