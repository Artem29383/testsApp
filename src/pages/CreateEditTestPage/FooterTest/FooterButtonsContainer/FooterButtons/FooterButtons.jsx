import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple/ButtonRipple';
import Loader from 'components/Loader/Loader';
import { colors } from 'styles/constants';

const FooterButtons = ({
  editId,
  isLoad,
  action,
  onAddNewQuestion,
  onModalSaveHandler,
  onRemoveTestClick,
  error,
}) => {
  return (
    <>
      <ButtonRipple onClickHandler={onAddNewQuestion}>
        Добавить вопрос
      </ButtonRipple>
      <ButtonRipple className="green" onClickHandler={onModalSaveHandler}>
        {editId ? 'Обновить тест' : 'Сохранить Тест'}
      </ButtonRipple>
      {editId && (
        <>
          {isLoad && action === 'remove' ? (
            <ButtonRipple
              className="red"
              onClickHandler={onRemoveTestClick}
              isLoader
            >
              <Loader width="35" height="35" color={colors.white} />
            </ButtonRipple>
          ) : (
            <ButtonRipple
              className="red"
              onClickHandler={onRemoveTestClick}
              isLoader
            >
              {error && action === 'remove' ? 'Повторить' : 'Удалить тест'}
            </ButtonRipple>
          )}
        </>
      )}
    </>
  );
};

FooterButtons.propTypes = {
  editId: PropTypes.string,
  isLoad: PropTypes.bool,
  action: PropTypes.string,
  error: PropTypes.string,
  onAddNewQuestion: PropTypes.func,
  onModalSaveHandler: PropTypes.func,
  onRemoveTestClick: PropTypes.func,
};

export default memo(FooterButtons);
