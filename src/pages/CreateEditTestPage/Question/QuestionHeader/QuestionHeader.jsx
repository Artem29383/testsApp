import React, { useCallback, useState, useEffect } from 'react';
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
import useSelector from 'hooks/useSelector';
import { getQuestSelector } from 'models/test/selectors';
import S from './QuestionHeader.styled';

const QuestionHeader = ({ setValue, id, value }) => {
  const quest = useSelector(getQuestSelector)(id);
  const setQuestionName = useAction(setQuestName);
  const [edit, setEdit] = useState(false);
  const deleteQuest = useAction(removeQuest);
  const [title, setTitle] = useState(quest.questName);
  const [temp, setTemp] = useState(title);
  const [showModal, setShowModal] = useToggle(false);
  const removeQuestion = () => {
    deleteQuest(id);
  };

  useEffect(() => {
    if (edit) {
      if (title === temp) {
        setQuestionName({ id, questionName: title });
        setEdit(false);
      } else {
        setTimeout(() => {
          setTemp(title);
        }, 500);
      }
    }
  }, [edit, temp]);

  const setQuestionNameHandler = useCallback(
    e => {
      setEdit(true);
      setTitle(e.currentTarget.value);
    },
    [title]
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
              value={title}
            />
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
          onClickHandler={setShowModal}
        />
      </S.QuestFormHeader>
    </>
  );
};

QuestionHeader.propTypes = {
  setValue: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string,
};

export default QuestionHeader;
