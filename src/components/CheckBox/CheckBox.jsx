import React, { memo, useCallback } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import PropTypes from 'prop-types';
import { Input, Label, Span } from 'components/CheckBox/CheckBox.styled';

const CheckBox = ({ isChecked, label, id, onChange }) => {
  const handleChange = useCallback(() => {
    onChange(id);
  }, [id, onChange]);

  return (
    <Label className={isChecked && 'checked'}>
      <Input
        type="checkbox"
        onChange={handleChange}
        onTouchEnd={handleChange}
      />
      <LinesEllipsis maxLine="7" text={label} />
      <Span />
    </Label>
  );
};

CheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default memo(CheckBox);
