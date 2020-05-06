import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'components/Radio/Radio.styled';
import LinesEllipsis from 'react-lines-ellipsis';

const Radio = ({ id, isChecked, label, setValid, setRadio, questId }) => {
  const changeHandler = () => {
    setRadio({
      questId,
      radioId: id,
    });
    setValid(questId);
  };

  return (
    <Label
      onTouchEnd={changeHandler}
      onClick={changeHandler}
      className={isChecked && 'checked'}
    >
      <Input type="radio" />
      <LinesEllipsis maxLine="7" text={label} />
    </Label>
  );
};

Radio.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  setValid: PropTypes.func,
  setRadio: PropTypes.func.isRequired,
  questId: PropTypes.string,
};

export default Radio;
