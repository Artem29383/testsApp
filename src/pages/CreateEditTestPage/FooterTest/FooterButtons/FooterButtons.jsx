import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple/ButtonRipple';
import Loader from 'components/Loader/Loader';
import { colors } from 'styles/constants';
import nanoid from 'nanoid';
import useAction from 'hooks/useAction';
import { pushQuestion, removeTestById } from 'models/test/reducer';

const FooterButtons = ({
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
      <ButtonRipple onClickHandler={addNewQuestion}>
        Добавить вопрос
      </ButtonRipple>
      <ButtonRipple className="green" onClickHandler={modalSaveHandler}>
        {editId ? 'Обновить тест' : 'Сохранить Тест'}
      </ButtonRipple>
      {editId && (
        <ButtonRipple className="red" onClickHandler={removeThisTest} isLoader>
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
    </>
  );
};

FooterButtons.propTypes = {
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

export default memo(FooterButtons);
