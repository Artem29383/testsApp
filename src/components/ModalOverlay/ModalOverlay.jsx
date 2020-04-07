import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import Cross from 'components/Cross';
import S from './ModalOverlay.styled';

const ModalOverlay = ({
  isOpen,
  toggle,
  children,
  isFooter,
  negativeBtn,
  positiveBtn,
  headerText,
  link,
  linkPath,
}) => {
  const hideWindow = e => {
    e.preventDefault();
    toggle();
  };

  const hideWindowHandlerKey = e => {
    if (e.key === 'Escape') {
      hideWindow(e);
    }
  };

  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', hideWindowHandlerKey);
    return () => {
      document.body.style.height = '100%';
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', hideWindowHandlerKey);
    };
  }, []);

  return (
    <S.OverlayM unmountOnExit in={isOpen} timeout={100}>
      <S.BackDrop onClick={hideWindow} />
      <S.ModalWindow appear in={isOpen} timeout={100}>
        <S.ModalHeader>
          <Cross rotate="45deg" right="20px" clickHandler={hideWindow} />
          {headerText}
        </S.ModalHeader>
        {children}
        {isFooter && (
          <S.ModalFooter>
            {negativeBtn && (
              <ButtonRipple className="red" onClickHandler={hideWindow}>
                {negativeBtn}
              </ButtonRipple>
            )}
            {positiveBtn && <ButtonRipple>{positiveBtn}</ButtonRipple>}
            {link && (
              <S.Link to={linkPath}>
                <ButtonRipple>{link}</ButtonRipple>
              </S.Link>
            )}
          </S.ModalFooter>
        )}
      </S.ModalWindow>
    </S.OverlayM>
  );
};

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node,
  isFooter: PropTypes.bool,
  negativeBtn: PropTypes.string,
  positiveBtn: PropTypes.string,
  headerText: PropTypes.string,
  link: PropTypes.string,
  linkPath: PropTypes.string,
};

ModalOverlay.defaultProps = {
  isFooter: false,
  linkPath: '/',
  headerText: 'just modal window',
};

export default memo(ModalOverlay);
