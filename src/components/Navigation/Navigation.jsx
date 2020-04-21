import React, { useCallback, useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import ButtonRipple from 'components/ButtonRipple';
import routes from 'constants/routes';
import useAction from 'hooks/useAction';
import { logoutUser } from 'models/user/reducer';
import { setTests } from 'models/tests/reducer';
import { useToggle } from 'hooks/index';
import S from './Navigation.styled';

const Navigation = () => {
  const resetTests = useAction(setTests);
  const logout = useAction(logoutUser);
  const [showHeader, setShowHeader] = useState(true);
  const [scroll, setScroll] = useState(0);
  const headerHeight = useRef();
  const [showNav, setShowNav] = useToggle(false);

  const logoutClick = () => {
    localStorage.removeItem('user');
    resetTests({
      entities: [],
      ids: [],
    });
    logout();
  };

  const checkScroll = useCallback(
    throttle(() => {
      if (
        window.pageYOffset > scroll + 50 &&
        window.pageYOffset > headerHeight.current.clientHeight
      ) {
        if (showNav) {
          setShowNav(false);
        }
        setShowHeader(false);
        setScroll(window.pageYOffset);
      } else if (window.pageYOffset < scroll) {
        setShowHeader(true);
        setScroll(window.pageYOffset);
      }
    }, 300)
  );

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [checkScroll]);

  return (
    <S.Nav ref={headerHeight} isShow={showHeader}>
      <S.NavList isShow={showNav}>
        <S.NavUl>
          <S.NavItem className="padding">
            <S.Link to={routes.testPage}>
              <ButtonRipple className="green" onClickHandler={setShowNav}>
                Тесты
              </ButtonRipple>
            </S.Link>
          </S.NavItem>
        </S.NavUl>
      </S.NavList>
      <S.Burger onClick={setShowNav}>
        <S.Line1 isOpen={showNav} />
        <S.Line2 isOpen={showNav} />
        <S.Line3 isOpen={showNav} />
      </S.Burger>
      <S.NavItem className="right">
        <ButtonRipple onClickHandler={logoutClick} className="red">
          Выйти
        </ButtonRipple>
      </S.NavItem>
    </S.Nav>
  );
};

export default Navigation;
