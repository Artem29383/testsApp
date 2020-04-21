import React, { memo } from 'react';
import PropTypes from 'prop-types';
import S from './Cross.styled';

const Cross = ({
  color,
  rotate,
  onClickHandler,
  position,
  top,
  left,
  bottom,
  right,
  hover,
  margin,
  touched,
}) => {
  return (
    <S.Div
      rotate={rotate}
      onClick={onClickHandler}
      onTouchEnd={touched ? onClickHandler : undefined}
      position={position}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      hover={hover}
      margin={margin}
    >
      <S.line1 color={color} />
      <S.line2 color={color} />
    </S.Div>
  );
};

Cross.propTypes = {
  color: PropTypes.string,
  rotate: PropTypes.string,
  onClickHandler: PropTypes.func,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  position: PropTypes.string,
  hover: PropTypes.bool,
  margin: PropTypes.string,
  touched: PropTypes.bool,
};

Cross.defaultProps = {
  color: 'white',
  rotate: '0deg',
  top: null,
  bottom: null,
  right: null,
  left: null,
  position: 'static',
  hover: false,
  margin: null,
  touched: false,
};

export default memo(Cross);
