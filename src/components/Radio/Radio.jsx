import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'components/Radio/Radio.styled';
import LinesEllipsis from 'react-lines-ellipsis';

const Radio = ({ isChecked, label, id, onHandleChange }) => {
  return (
    <Label
      className={isChecked && 'checked'}
      onTouchEnd={() => onHandleChange(id)}
      onMouseUp={() => onHandleChange(id)}
    >
      <Input type="radio" />
      <LinesEllipsis maxLine="7" text={label} />
    </Label>
  );
};

Radio.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  onHandleChange: PropTypes.func.isRequired,
};

export default Radio;
