import React, { useEffect, useState, memo } from 'react';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import RadioQuestions from 'pages/CreateEditTestPage/Question/RadioQuestions';
import NumberQuestion from 'pages/CreateEditTestPage/Question/NumberQuestion';
import CheckBoxQuestions from 'pages/CreateEditTestPage/Question/CheckBoxQuestions';
import useAction from 'hooks/useAction';
import {
  setInitialRadioOrCheckBox,
  setNumericAnswer,
} from 'models/test/reducer';
import { questionVariable } from 'styles/constants';
import QuestionHeader from 'pages/CreateEditTestPage/Question/QuestionHeader';
import QuestionFooter from 'pages/CreateEditTestPage/Question/QuestionFooter';
import { Draggable } from 'react-beautiful-dnd';
import useSelector from 'hooks/useSelector';
import {
  getQuestionErrorMsg,
  getQuestionType,
  getQuestionValid,
} from 'models/test/selectors';
import S from './Question.styled';

const Question = ({ id, index }) => {
  const type = useSelector(getQuestionType, id);
  const errorMsg = useSelector(getQuestionErrorMsg, id);
  const isValid = useSelector(getQuestionValid, id);
  const [value, setValue] = useState(type || questionVariable.one);
  const [temp, setTemp] = useState(type);
  const [questType, setQuestType] = useState(value);
  const setInitAnswer = useAction(setInitialRadioOrCheckBox);
  const setNumeric = useAction(setNumericAnswer);

  useEffect(() => {
    if (!isValid || value !== temp) {
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
    <Draggable draggableId={id} index={index}>
      {provided => (
        <S.QuestionForm
          isValid={errorMsg}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <S.QuestionContent>
            <QuestionHeader setValue={setValue} id={id} value={value} />
            <S.QuestFormBody>
              {questType === questionVariable.one && <RadioQuestions id={id} />}
              {questType === questionVariable.number && (
                <NumberQuestion id={id} />
              )}
              {questType === questionVariable.some && (
                <CheckBoxQuestions id={id} />
              )}
              <S.WrapInput>
                <S.Error>{errorMsg}</S.Error>
              </S.WrapInput>
            </S.QuestFormBody>
            {questType !== questionVariable.number && (
              <QuestionFooter id={id} />
            )}
          </S.QuestionContent>
        </S.QuestionForm>
      )}
    </Draggable>
  );
};

export default memo(Question);
Question.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
};
