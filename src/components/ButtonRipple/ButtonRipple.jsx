import React from 'react';
import PropTypes from 'prop-types';
import S from './ButtonRipple.styled';

const ButtonRipple = ({ children, className, clickHandler }) => (
  <S.Button className={className} onClick={clickHandler}>
    {children}
  </S.Button>
);

export default ButtonRipple;

ButtonRipple.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  clickHandler: PropTypes.func,
};
