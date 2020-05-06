import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'components/Radio/Radio.styled';
import LinesEllipsis from 'react-lines-ellipsis';

const Radio = ({ isChecked, label, id, onChange }) => {
  const handleChange = useCallback(() => {
    onChange(id);
  }, [id, onChange]);

  return (
    <Label className={isChecked && 'checked'}>
      <Input type="radio" onChange={handleChange} onTouchEnd={handleChange} />
      <LinesEllipsis maxLine="7" text={label} />
    </Label>
  );
};

Radio.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Radio;
