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

const QuestionHeader = ({ id, value, questName, onChange }) => {
  const setQuestionName = useAction(setQuestName);
  const deleteQuest = useAction(removeQuest);
  const [showModal, setShowModal] = useToggle(false);
  const onQuestionRemove = useCallback(() => {
    deleteQuest(id);
  }, [deleteQuest]);
  const onChangeQuestionName = useCallback(
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
          onClickHandler={onQuestionRemove}
        />
      </Portal>
      <S.QuestFormHeader>
        <S.QuestFormHeaderTitle>
          <S.WrapInput padding="0 20px 0 20px">
            <Input
              label="Вопрос"
              onChange={onChangeQuestionName}
              value={questName}
            />
          </S.WrapInput>
        </S.QuestFormHeaderTitle>
        <S.QuestFormHeaderTitle>
          <DropDownContainer value={value} onChange={onChange} />
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
  id: PropTypes.string,
  questName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default QuestionHeader;
