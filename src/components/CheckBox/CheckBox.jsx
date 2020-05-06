import React, { memo } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import PropTypes from 'prop-types';
import { Input, Label, Span } from 'components/CheckBox/CheckBox.styled';

const CheckBox = ({ isChecked, label, id, onHandleChange }) => {
  return (
    <Label
      className={isChecked && 'checked'}
      onTouchEnd={() => onHandleChange(id)}
      onMouseUp={() => onHandleChange(id)}
    >
      <Input type="checkbox" />
      <LinesEllipsis maxLine="7" text={label} />
      <Span />
    </Label>
  );
};

CheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default memo(CheckBox);
