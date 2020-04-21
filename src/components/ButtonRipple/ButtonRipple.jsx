import React from 'react';
import PropTypes from 'prop-types';
import S from './ButtonRipple.styled';

const ButtonRipple = ({ children, className, onClickHandler }) => (
  <S.Button className={className} onClick={onClickHandler}>
    {children}
  </S.Button>
);

ButtonRipple.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  onClickHandler: PropTypes.func,
};

export default ButtonRipple;
