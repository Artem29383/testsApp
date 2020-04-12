import React, { memo } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import PropTypes from 'prop-types';
import S, { Label, Span } from 'components/CheckBox/CheckBox.styled';

const CheckBox = ({ id, isChecked, changeHandler, label }) => (
  <>
    <S.Input
      type="checkbox"
      id={id}
      onChange={changeHandler}
      checked={isChecked}
      value={label}
    />
    <Label htmlFor={id} id={id} onTouchEnd={changeHandler}>
      <LinesEllipsis maxLine="7" text={label} />
      <Span />
    </Label>
  </>
);

CheckBox.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.bool,
  changeHandler: PropTypes.func,
  label: PropTypes.string,
};

export default memo(CheckBox);
