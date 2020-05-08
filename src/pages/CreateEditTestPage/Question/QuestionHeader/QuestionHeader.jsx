import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input/Input';
import Cross from 'components/Cross/Cross';
import useAction from 'hooks/useAction';
import { removeQuest, setQuestName } from 'models/test/reducer';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import Portal from 'components/Portal';
import useToggle from 'hooks/useToggle';
import DropDownContainer from 'pages/CreateEditTestPage/Question/QuestionHeader/DropDownContainer';
import S from './QuestionHeader.styled';

const QuestionHeader = ({ setValue, id, value, questName }) => {
  const setQuestionName = useAction(setQuestName);
  const deleteQuest = useAction(removeQuest);
  const [showModal, setShowModal] = useToggle(false);
  const removeQuestion = () => {
    deleteQuest(id);
  };
  const setQuestionNameHandler = useCallback(
    e => {
      setQuestionName({ id, questionName: e.currentTarget.value });
    },
    [questName]
  );

  return (
    <>
      <Portal id="modal">
        <ModalOverlay
          toggle={setShowModal}
          isOpen={showModal}
          isFooter
          positiveBtn="Отмена"
          negativeClickHandler="Удалить"
          headerText="Удалить вопрос?"
          onClickHandler={removeQuestion}
        />
      </Portal>
      <S.QuestFormHeader>
        <S.QuestFormHeaderTitle>
          <S.WrapInput padding="0 20px 0 20px">
            <Input
              label="Вопрос"
              onChange={setQuestionNameHandler}
              value={questName}
            />
          </S.WrapInput>
        </S.QuestFormHeaderTitle>
        <S.QuestFormHeaderTitle>
          <DropDownContainer value={value} setValue={setValue} />
        </S.QuestFormHeaderTitle>
        <Cross
          color="#80868b"
          position="absolute"
          top="-15px"
          right="25px"
          rotate="135deg"
          hover
          onClickHandler={setShowModal}
        />
      </S.QuestFormHeader>
    </>
  );
};

QuestionHeader.propTypes = {
  setValue: PropTypes.func,
  id: PropTypes.string,
  questName: PropTypes.string,
  value: PropTypes.string,
};

export default QuestionHeader;
