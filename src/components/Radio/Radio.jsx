import React from 'react';
import PropTypes from 'prop-types';
import S, { Label } from 'components/Radio/Radio.styled';
import LinesEllipsis from 'react-lines-ellipsis';

const Radio = ({ id, name, isChecked, label, onChangeHandler }) => (
  <>
    <S.Input
      id={id}
      name={name}
      type="radio"
      checked={isChecked}
      value={label}
      onChange={onChangeHandler}
    />
    <Label htmlFor={id} id={id} onTouchEnd={onChangeHandler}>
      <LinesEllipsis maxLine="7" text={label} />
    </Label>
  </>
);

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  onChangeHandler: PropTypes.func,
};

export default Radio;
