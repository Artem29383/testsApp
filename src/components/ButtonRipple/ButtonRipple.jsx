import React from 'react';
import PropTypes from 'prop-types';
import S from './ButtonRipple.styled';

const ButtonRipple = ({ children, className, onClickHandler }) => (
  <S.Button className={className} onClick={onClickHandler}>
    {children}
  </S.Button>
);

export default ButtonRipple;

ButtonRipple.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  onClickHandler: PropTypes.func,
};
