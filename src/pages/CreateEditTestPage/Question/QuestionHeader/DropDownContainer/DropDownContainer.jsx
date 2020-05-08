import React, { memo } from 'react';
import PropTypes from 'prop-types';
import DropDown from 'components/DropDown';
import { questionVariable } from 'styles/constants';
import S from './DropDownContainer.styled';

const DropDownContainer = ({ value, setValue }) => (
  <S.WrapInput padding="0 25px 0 25px">
    <DropDown
      options={[
        questionVariable.one,
        questionVariable.some,
        questionVariable.number,
      ]}
      value={value}
      setValue={setValue}
    />
  </S.WrapInput>
);

DropDownContainer.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default memo(DropDownContainer);
