import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import Portal from 'components/Portal';
import nanoid from 'nanoid';
import useAction from 'hooks/useAction';
import {
  pushQuestion,
  setQuestError,
  setValidQuestion,
} from 'models/test/reducer';
import { checkValidationTest } from 'utils/checkValidationTest';
import { DELETE_TEST, DEPLOY_TEST, UPDATE_TEST } from 'models/test/action';
import useSelector from 'hooks/useSelector';
import {
  getCreatedDataSelector,
  getQuestionsIdsSelector,
  getQuestionsSelector,
  getTestNameSelector,
} from 'models/test/selectors';
import { useParams } from 'react-router-dom';
import useToggle from 'hooks/useToggle';
import S from './FooterTest.styled';

const FooterTest = ({ setUniqId, uniqId }) => {
  const testName = useSelector(getTestNameSelector);
  const editId = useParams().id;
  const pushQuest = useAction(pushQuestion);
  const setValidQuest = useAction(setValidQuestion);
  const setInvalidQuest = useAction(setQuestError);
  const deployTest = useAction(DEPLOY_TEST);
  const updateThisTest = useAction(UPDATE_TEST);
  const created = useSelector(getCreatedDataSelector);
  const deleteThisTest = useAction(DELETE_TEST);
  const [isValidTest, setIsValidTest] = useState(false);
  const questionsIds = useSelector(getQuestionsIdsSelector);
  const questionsEntities = useSelector(getQuestionsSelector);
  const [showModalSave, setShowModalSave] = useToggle(false);

  const saveTestAndDeploy = () => {
    const isValid = checkValidationTest(
      questionsEntities,
      questionsIds,
      setValidQuest,
      setInvalidQuest
    );
    if (isValid && questionsIds.length !== 0) {
      setIsValidTest(true);
    }
  };

  useEffect(() => {
    if (!editId) {
      pushQuest({
        id: uniqId,
        questName: 'Ваш вопрос',
        answer: { entities: [], ids: [] },
      });
      setUniqId(nanoid());
    }
  }, []);

  useEffect(() => {
    if (isValidTest) {
      if (!editId) {
        const date = new Date();
        const now = `${date.getDate()}.${date.getMonth() +
          1}.${date.getFullYear()}`;
        const test = {
          id: nanoid(),
          testName,
          created: now,
          questions: {
            entities: questionsEntities,
            ids: questionsIds,
          },
        };
        deployTest(test);
      } else {
        const test = {
          id: editId,
          testName,
          entities: questionsEntities,
          ids: questionsIds,
          created,
        };
        updateThisTest(test);
      }
    }
  }, [isValidTest]);

  const removeThisTest = () => {
    deleteThisTest(editId);
  };

  const modalSaveHandler = () => {
    setShowModalSave(true);
  };

  const addNewQuestion = () => {
    pushQuest({
      id: uniqId,
      questName: 'Ваш вопрос',
      answer: { entities: [], ids: [] },
    });
    setUniqId(nanoid());
  };

  return (
    <>
      <Portal id="modal">
        <ModalOverlay
          toggle={setShowModalSave}
          isOpen={showModalSave}
          isFooter
          positiveBtn="Отмена"
          negativeClickHandler="Сохранить"
          headerText="Сохранить тест?"
          onClickHandler={saveTestAndDeploy}
        />
      </Portal>
      <S.FooterTest editId={editId}>
        <ButtonRipple onClickHandler={addNewQuestion}>
          Добавить вопрос
        </ButtonRipple>
        <ButtonRipple className="green" onClickHandler={modalSaveHandler}>
          {editId ? 'Обновить тест' : 'Сохранить Тест'}
        </ButtonRipple>
        {editId && (
          <ButtonRipple className="red" onClickHandler={removeThisTest}>
            Удалить тест
          </ButtonRipple>
        )}
      </S.FooterTest>
    </>
  );
};

FooterTest.propTypes = {
  setUniqId: PropTypes.func,
  uniqId: PropTypes.string,
};

export default FooterTest;
