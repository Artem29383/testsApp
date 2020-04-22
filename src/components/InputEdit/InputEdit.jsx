import React, { memo } from 'react';
import PropTypes from 'prop-types';
import S from './InputEdit.styled';

const InputEdit = ({
  value,
  label,
  focus,
  isError,
  type,
  checkMark,
  error,
  onHandler,
  onBlur,
  onKeyDown,
}) => (
  <>
    <S.Group>
      <S.InputField
        value={value}
        onChange={onHandler}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        placeholder=" "
        type={type}
        autoFocus={focus}
      />
      <S.Bar isError={isError} />
      {label && <S.Label>{label}</S.Label>}
      {checkMark && <S.Close onTouchEnd={onBlur} onClick={onBlur} />}
    </S.Group>
    {isError && <S.Error>{error}</S.Error>}
  </>
);

InputEdit.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  focus: PropTypes.bool,
  isError: PropTypes.bool,
  type: PropTypes.string,
  checkMark: PropTypes.bool,
  error: PropTypes.string,
  onKeyDown: PropTypes.func,
  onHandler: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

InputEdit.defaultProps = {
  focus: false,
  type: 'text',
  checkMark: false,
};

export default memo(InputEdit);
