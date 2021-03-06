import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import ButtonRipple from 'components/ButtonRipple';
import routes from 'constants/routes';
import useAction from 'hooks/useAction';
import { logOutUser } from 'models/user/reducer';
import { useToggle } from 'hooks/index';
import { setLoading } from 'models/tests/reducer';
import S from './Navigation.styled';

const Navigation = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [scroll, setScroll] = useState(0);
  const setLoad = useAction(setLoading);
  const headerHeight = useRef();
  const [showNav, setShowNav] = useToggle(false);
  const logOut = useAction(logOutUser);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const debouncedHandleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 1500);

  const logoutClick = useCallback(() => {
    setLoad(true);
    logOut();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

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
    }, 300),
    [scroll, showNav, showHeader]
  );

  useEffect(() => {
    if (windowSize < 550) {
      window.addEventListener('scroll', checkScroll);
    }
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [checkScroll, windowSize]);

  return (
    <S.Nav ref={headerHeight} isShow={showHeader}>
      <S.NavList isShow={showNav}>
        <S.NavUl>
          <S.NavItem className="padding">
            <S.Link to={routes.testPage}>
              <ButtonRipple className="green" onClick={setShowNav}>
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
        <ButtonRipple onClick={logoutClick} className="red">
          Выйти
        </ButtonRipple>
      </S.NavItem>
    </S.Nav>
  );
};

export default memo(Navigation);
