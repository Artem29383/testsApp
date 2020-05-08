import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useClickAway from 'hooks/useClickAway';
import S from './DropDown.styled';

const DropDown = ({ options, value, setValue, className, label }) => {
  const { ref, active, toggle } = useClickAway();
  const [temp, setTemp] = useState(value);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const setCoords = e => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().top;
    setCoordinates({ x, y });
  };

  const dropClickHandler = e => {
    setCoords(e);
    toggle();
  };

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        toggle();
        setTimeout(() => {
          setValue(temp);
        }, 100);
      }, 100);
    }
  }, [temp]);

  const setValueDropDown = e => {
    setCoords(e);
    const valueOptions = e.target.textContent;
    setTemp(valueOptions);
  };

  const liList = options.map(li => {
    if (String(li) === value) {
      return null;
    }

    return (
      <S.Li key={li} onClick={setValueDropDown} {...coordinates}>
        {li}
      </S.Li>
    );
  });

  return (
    <S.DropDownDiv className={className} ref={ref}>
      <S.DefaultValueDiv>
        <S.DefaultValue onClick={dropClickHandler} {...coordinates}>
          {label} {value}
          <S.Triangle isAnim={active} />
        </S.DefaultValue>
      </S.DefaultValueDiv>
      <S.DropList unmountOnExit in={active} timeout={200}>
        <S.Ul>{liList}</S.Ul>
      </S.DropList>
    </S.DropDownDiv>
  );
};

DropDown.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default DropDown;
