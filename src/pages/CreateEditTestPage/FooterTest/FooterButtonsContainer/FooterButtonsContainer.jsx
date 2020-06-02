import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import useAction from 'hooks/useAction';
import { pushQuestion, removeTestById } from 'models/test/reducer';
import FooterButtons from 'pages/CreateEditTestPage/FooterTest/FooterButtonsContainer/FooterButtons';

const FooterButtonsContainer = ({
  editId,
  load,
  action,
  error,
  setIsLoading,
  setAction,
  resetError,
  setShowModalSave,
  scrollPageToBottomTest,
}) => {
  const deleteThisTest = useAction(removeTestById);
  const pushQuest = useAction(pushQuestion);
  const [uniqId, setUniqId] = useState(nanoid());

  useEffect(() => {
    scrollPageToBottomTest.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, [uniqId]);

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

  const onRemoveTestClick = useCallback(() => {
    resetError('');
    setAction('remove');
    setIsLoading();
    deleteThisTest(editId);
  }, [deleteThisTest]);

  const onModalSaveHandler = useCallback(() => {
    setShowModalSave(true);
  }, [setShowModalSave]);

  const onAddNewQuestion = useCallback(() => {
    pushQuest({
      id: uniqId,
      questName: 'Ваш вопрос',
      answer: { entities: [], ids: [] },
    });
    setUniqId(nanoid());
  }, [uniqId]);

  return (
    <FooterButtons
      isLoad={load}
      action={action}
      editId={editId}
      error={error}
      onAddNewQuestion={onAddNewQuestion}
      onModalSaveHandler={onModalSaveHandler}
      onRemoveTestClick={onRemoveTestClick}
    />
  );
};

FooterButtonsContainer.propTypes = {
  editId: PropTypes.string,
  load: PropTypes.bool,
  action: PropTypes.string,
  error: PropTypes.string,
  setIsLoading: PropTypes.func,
  setAction: PropTypes.func,
  resetError: PropTypes.func,
  setShowModalSave: PropTypes.func,
  scrollPageToBottomTest: PropTypes.any,
};

export default FooterButtonsContainer;
