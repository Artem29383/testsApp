import React from 'react';
import PropTypes from 'prop-types';
import S, { InputField, Label } from './Input.styled';

const Input = ({
  label,
  value,
  register,
  name,
  type,
  focus,
  errors,
  className,
  onChange,
  onKeyHandler,
  onBlur,
}) => (
  <>
    <S.Group className={className}>
      <InputField
        placeholder=" "
        value={value}
        onChange={onChange}
        ref={register}
        name={name}
        type={type}
        autoFocus={focus}
        onKeyDown={onKeyHandler}
        onBlur={onBlur}
      />
      <Label>{label}</Label>
    </S.Group>
    {errors && <S.Error>{errors.message}</S.Error>}
  </>
);

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  register: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  focus: PropTypes.bool,
  errors: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyHandler: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  focus: false,
};

export default Input;
