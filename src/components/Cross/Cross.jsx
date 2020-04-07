import React, { memo } from 'react';
import PropTypes from 'prop-types';
import S from './Cross.styled';

const Cross = ({ color, rotate, top, left, right, bottom, clickHandler }) => {
  return (
    <S.Div
      rotate={rotate}
      top={top}
      right={right}
      left={left}
      bottom={bottom}
      onClick={clickHandler}
    >
      <S.line1 color={color} />
      <S.line2 color={color} />
    </S.Div>
  );
};

Cross.propTypes = {
  color: PropTypes.string,
  rotate: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  clickHandler: PropTypes.func,
};

Cross.defaultProps = {
  color: 'white',
  rotate: '0deg',
  top: null,
  bottom: null,
  right: null,
  left: null,
};

export default memo(Cross);
