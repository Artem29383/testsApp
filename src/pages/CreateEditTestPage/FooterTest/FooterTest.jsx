import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';
import Portal from 'components/Portal';
import nanoid from 'nanoid';
import useAction from 'hooks/useAction';
import {
  createTest,
  setQuestError,
  setValidQuestion,
  updateTestById,
} from 'models/test/reducer';
import { checkValidationTest } from 'utils/checkValidationTest';
import useSelector from 'hooks/useSelector';
import {
  createdDataSelector,
  questionsIdsSelector,
  questionsSelector,
  testNameSelector,
} from 'models/test/selectors';
import { useParams } from 'react-router-dom';
import useToggle from 'hooks/useToggle';
import useFetchingError from 'hooks/useFetchingError';
import FooterButtons from 'pages/CreateEditTestPage/FooterTest/FooterButtons';
import S from './FooterTest.styled';

const FooterTest = ({ scrollPageToBottomTest }) => {
  const testName = useSelector(testNameSelector);
  const editId = useParams().id;
  const setValidQuest = useAction(setValidQuestion);
  const setInvalidQuest = useAction(setQuestError);
  const deployTest = useAction(createTest);
  const updateThisTest = useAction(updateTestById);
  const created = useSelector(createdDataSelector);
  const [isValidTest, setIsValidTest] = useState(false);
  const questionsIds = useSelector(questionsIdsSelector);
  const questionsEntities = useSelector(questionsSelector);
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
    if (error && load) {
      setIsLoading();
    }
  }, [error]);

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
        <FooterButtons
          error={error}
          action={action}
          load={load}
          editId={editId}
          resetError={resetError}
          scrollPageToBottomTest={scrollPageToBottomTest}
          setAction={setAction}
          setIsLoading={setIsLoading}
          setShowModalSave={setShowModalSave}
        />
      </S.FooterTest>
    </>
  );
};

FooterTest.propTypes = {
  scrollPageToBottomTest: PropTypes.any,
};

export default FooterTest;
