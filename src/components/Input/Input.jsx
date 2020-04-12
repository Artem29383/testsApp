import React from 'react';
import PropTypes from 'prop-types';
import S, { InputField, Label } from './Input.styled';

const Input = ({
  label,
  value,
  onChange,
  register,
  name,
  type,
  focus,
  keyHandler,
  errors,
  blur,
}) => (
  <>
    <S.Group>
      <InputField
        placeholder=" "
        value={value}
        onChange={onChange}
        ref={register}
        name={name}
        type={type}
        autoFocus={focus}
        onKeyDown={keyHandler}
        onBlur={blur}
      />
      <Label>{label}</Label>
    </S.Group>
    {errors && <S.Error>{errors.message}</S.Error>}
  </>
);

export default Input;

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  focus: PropTypes.bool,
  keyHandler: PropTypes.func,
  errors: PropTypes.object,
  blur: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  focus: false,
};
