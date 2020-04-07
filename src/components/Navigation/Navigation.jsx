import React, { memo } from 'react';
import ButtonRipple from 'components/ButtonRipple';
import useAction from 'hooks/useAction';
import { logoutUser } from 'models/user/reducer';
import { setTests } from 'models/tests/reducer';
import S from './Navigation.styled';

const Navigation = () => {
  const resetTests = useAction(setTests);
  const logout = useAction(logoutUser);

  const logoutClick = () => {
    localStorage.removeItem('user');
    resetTests({
      entities: [],
      ids: [],
    });
    logout();
  };

  return (
    <S.Nav>
      <S.NavItem className="right">
        <ButtonRipple onClickHandler={logoutClick} className="red">
          Выйти
        </ButtonRipple>
      </S.NavItem>
    </S.Nav>
  );
};

export default memo(Navigation);
