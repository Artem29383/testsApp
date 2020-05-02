import React, { useEffect, useState, memo } from 'react';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';
import useAction from 'hooks/useAction';
import {
  setInitialRadioOrCheckBox,
  setNumericAnswer,
} from 'models/test/reducer';
import { questionVariable } from 'styles/constants';
import QuestionHeader from 'pages/CreateEditTestPage/Question/QuestionHeader';
import QuestionFooter from 'pages/CreateEditTestPage/Question/QuestionFooter';
import QuestFormBody from 'pages/CreateEditTestPage/Question/QuestFormBody';
import { Draggable } from 'react-beautiful-dnd';
import S from './Question.styled';

const Question = ({ id, quest, index }) => {
  const { type, errorMsg, isValid } = quest;
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
          isValid={quest.errorMsg}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <S.QuestionContent>
            <QuestionHeader
              setValue={setValue}
              id={id}
              value={value}
              questName={quest.questName}
            />
            <QuestFormBody
              quest={quest.answer}
              errorMsg={errorMsg}
              id={id}
              questType={type}
            />
            {questType !== questionVariable.number && (
              <QuestionFooter
                id={id}
                ids={quest.answer.ids}
                errorMsg={quest.errorMsg}
              />
            )}
          </S.QuestionContent>
        </S.QuestionForm>
      )}
    </Draggable>
  );
};

Question.propTypes = {
  id: PropTypes.string,
  quest: PropTypes.object,
  index: PropTypes.number,
};

export default memo(Question);
