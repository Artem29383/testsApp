import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'components/Radio/Radio.styled';
import LinesEllipsis from 'react-lines-ellipsis';

const Radio = ({ isChecked, label, id, onHandleChange }) => {
  return (
    <Label
      onTouchEnd={() => onHandleChange(id)}
      onClick={() => onHandleChange(id)}
      className={isChecked && 'checked'}
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
