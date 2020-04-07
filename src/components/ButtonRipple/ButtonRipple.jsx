import React, { memo } from 'react';
import PropTypes from 'prop-types';
import S from './ButtonRipple.styled';

const ButtonRipple = ({ children, className, onClickHandler }) => (
  <S.Button className={className} onClick={onClickHandler}>
    {children}
  </S.Button>
);

ButtonRipple.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClickHandler: PropTypes.func,
};

export default memo(ButtonRipple);
