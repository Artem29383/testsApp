import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import Portal from 'components/Portal';
import nanoid from 'nanoid';
import useAction from 'hooks/useAction';
import {
  createTest,
  pushQuestion,
  removeTestById,
  setQuestError,
  setValidQuestion,
  updateTestById,
} from 'models/test/reducer';
import { checkValidationTest } from 'utils/checkValidationTest';
import useSelector from 'hooks/useSelector';
import {
  getCreatedDataSelector,
  getQuestionsIdsSelector,
  getQuestionsSelector,
  getTestNameSelector,
} from 'models/test/selectors';
import { useParams } from 'react-router-dom';
import useToggle from 'hooks/useToggle';
import Loader from 'components/Loader';
import { colors } from 'styles/constants';
import useFetchingError from 'hooks/useFetchingError';
import S from './FooterTest.styled';

const FooterTest = ({ scrollPageToBottomTest }) => {
  const testName = useSelector(getTestNameSelector);
  const editId = useParams().id;
  const pushQuest = useAction(pushQuestion);
  const setValidQuest = useAction(setValidQuestion);
  const setInvalidQuest = useAction(setQuestError);
  const deployTest = useAction(createTest);
  const updateThisTest = useAction(updateTestById);
  const created = useSelector(getCreatedDataSelector);
  const [uniqId, setUniqId] = useState(nanoid());
  const deleteThisTest = useAction(removeTestById);
  const [isValidTest, setIsValidTest] = useState(false);
  const questionsIds = useSelector(getQuestionsIdsSelector);
  const questionsEntities = useSelector(getQuestionsSelector);
  const [showModalSave, setShowModalSave] = useToggle(false);
  const {
    load,
    setIsLoading,
    error,
    resetError,
    action,
    setAction,
  } = useFetchingError();
  const saveTestAndCreate = () => {
    const isValid = checkValidationTest(
      questionsEntities,
      questionsIds,
      setValidQuest,
      setInvalidQuest
    );
    if (isValid && questionsIds.length !== 0) {
      resetError('');
      setAction('save');
      setIsLoading();
      setIsValidTest(true);
    }
  };

  useEffect(() => {
    scrollPageToBottomTest.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, [uniqId]);

  useEffect(() => {
    if (error && load) {
      setIsLoading();
    }
  }, [error]);

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
      setIsValidTest(false);
    }
  }, [isValidTest]);

  const removeThisTest = () => {
    resetError('');
    setAction('remove');
    setIsLoading();
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
          load={load}
          action={action}
          error={error}
          onClickHandler={saveTestAndCreate}
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
          <ButtonRipple
            className="red"
            onClickHandler={removeThisTest}
            isLoader
          >
            {/* eslint-disable-next-line no-nested-ternary */}
            {load && action === 'remove' ? (
              <Loader width="35" height="35" color={colors.white} />
            ) : error && action === 'remove' ? (
              'Повторить'
            ) : (
              'Удалить тест'
            )}
          </ButtonRipple>
        )}
      </S.FooterTest>
    </>
  );
};

FooterTest.propTypes = {
  scrollPageToBottomTest: PropTypes.any,
};

export default memo(FooterTest);
