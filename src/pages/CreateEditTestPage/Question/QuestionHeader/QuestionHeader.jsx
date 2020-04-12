import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input/Input';
import DropDown from 'components/DropDown';
import { questionVariable } from 'styles/constants';
import Cross from 'components/Cross/Cross';
import useAction from 'hooks/useAction';
import { removeQuest, setQuestName } from 'models/test/reducer';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import Portal from 'components/Portal';
import useToggle from 'hooks/useToggle';
import S from './QuestionHeader.styled';

const QuestionHeader = ({ quest, setValue, id, value }) => {
  const setQuestionName = useAction(setQuestName);
  const [edit, setEdit] = useState(false);
  const deleteQuest = useAction(removeQuest);
  const [showModal, setShowModal] = useToggle(false);
  const [questionName, questionSetName] = useState(quest.questName);

  const startEdit = () => {
    setEdit(true);
  };

  const removeQuestion = () => {
    deleteQuest(id);
  };

  const stopEditHandlerBlur = () => {
    if (questionName.trim()) {
      setEdit(false);
      setQuestionName({ id, questionName });
    }
  };

  const stopEditHandlerKey = e => {
    if (e.key === 'Escape') {
      setEdit(false);
      questionSetName(quest.questName);
    }
    if (e.key === 'Enter' && questionName.trim()) {
      setEdit(false);
      setQuestionName({ id, questionName });
    }
  };

  const setQuestionNameHandler = e => {
    questionSetName(e.currentTarget.value);
  };

  return (
    <>
      <Portal id="modal">
        <ModalOverlay
          toggle={setShowModal}
          isOpen={showModal}
          isFooter
          positiveBtn="Отмена"
          negativeBtn="Удалить"
          headerText="Удалить вопрос?"
          clickHandler={removeQuestion}
        />
      </Portal>
      <S.QuestFormHeader>
        <S.QuestFormHeaderTitle>
          <S.WrapInput padding="0 20px 0 20px">
            {edit ? (
              <Input
                label="Вопрос"
                onChange={setQuestionNameHandler}
                value={questionName}
                blur={stopEditHandlerBlur}
                keyHandler={stopEditHandlerKey}
                focus
              />
            ) : (
              <S.QuestNameDiv onClick={startEdit}>
                {questionName}
              </S.QuestNameDiv>
            )}
          </S.WrapInput>
        </S.QuestFormHeaderTitle>
        <S.QuestFormHeaderTitle>
          <S.WrapInput padding="0 25px 0 25px">
            <DropDown
              options={[
                questionVariable.one,
                questionVariable.some,
                questionVariable.number,
              ]}
              value={value}
              setValue={setValue}
            />
          </S.WrapInput>
        </S.QuestFormHeaderTitle>
        <Cross
          color="#80868b"
          position="absolute"
          top="-15px"
          right="25px"
          rotate="135deg"
          hover
          clickHandler={setShowModal}
        />
      </S.QuestFormHeader>
    </>
  );
};

QuestionHeader.propTypes = {
  quest: PropTypes.object,
  setValue: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string,
};

export default QuestionHeader;
