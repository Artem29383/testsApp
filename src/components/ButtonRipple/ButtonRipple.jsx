import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import S from './ButtonRipple.styled';

const ButtonRipple = ({ children, className, onClick, isLoader }) => {
  const btnRef = useRef();
  let width;
  let height;
  if (isLoader) {
    if (btnRef.current) {
      const figure = btnRef.current.getBoundingClientRect();
      width = Math.ceil(figure.width);
      height = Math.ceil(figure.height);
    }
  }
  return (
    <S.Button
      ref={btnRef}
      className={className}
      onClick={onClick}
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
  onClick: PropTypes.func,
};

export default memo(ButtonRipple);
