import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import S from './TableSearch.styled';

const TableSearch = ({ value, label, onChange }) => {
  return (
    <S.InputWrap>
      <Input
        className="noText"
        value={value}
        label={label}
        onChange={onChange}
      />
    </S.InputWrap>
  );
};

export default memo(TableSearch);
TableSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};
