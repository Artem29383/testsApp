import React, { memo } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import PropTypes from 'prop-types';
import S, { Label, Span } from 'components/CheckBox/CheckBox.styled';

const CheckBox = ({ id, isChecked, label, onChangeHandler }) => (
  <>
    <S.Input
      type="checkbox"
      id={id}
      onChange={onChangeHandler}
      checked={isChecked}
      value={label}
    />
    <Label htmlFor={id} id={id} onTouchEnd={onChangeHandler}>
      <LinesEllipsis maxLine="7" text={label} />
      <Span />
    </Label>
  </>
);

CheckBox.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default memo(CheckBox);
