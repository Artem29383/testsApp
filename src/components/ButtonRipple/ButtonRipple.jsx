import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import S from './ButtonRipple.styled';

const ButtonRipple = ({ children, className, onClickHandler, isLoader }) => {
  const btnRef = useRef();
  let width;
  let height;
  if (isLoader) {
    if (btnRef.current) {
      width = btnRef.current.offsetWidth;
      height = btnRef.current.offsetHeight;
    }
  }
  return (
    <S.Button
      ref={btnRef}
      className={className}
      onClick={onClickHandler}
      width={width}
      height={height}
    >
      {children}
    </S.Button>
  );
};

ButtonRipple.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  isLoader: PropTypes.bool,
  onClickHandler: PropTypes.func,
};

export default ButtonRipple;
