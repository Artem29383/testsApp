import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import Cross from 'components/Cross';
import S from './ModalOverlay.styled';

const ModalOverlay = ({
  toggle,
  children,
  isFooter,
  negativeBtn,
  positiveBtn,
  headerText,
  link,
  linkPath,
  // eslint-disable-next-line no-unused-vars
  clickHandler,
  isOpen,
  isClosable,
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
    if (isOpen) {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', hideWindowHandlerKey);
    }
    return () => {
      document.body.style.height = '100%';
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', hideWindowHandlerKey);
    };
  }, [isOpen]);

  return (
    <S.OverlayM unmountOnExit in={isOpen} timeout={100}>
      <S.BackDrop onClick={hideWindow} />
      <S.ModalWindow appear in={isOpen} timeout={100}>
        <S.ModalHeader>
          {isClosable && (
            <Cross
              rotate="45deg"
              right="20px"
              position="absolute"
              clickHandler={hideWindow}
            />
          )}
          <S.Title>{headerText}</S.Title>
        </S.ModalHeader>
        {children}
        {isFooter && (
          <S.ModalFooter>
            {negativeBtn && (
              <ButtonRipple
                clickHandler={e => {
                  hideWindow(e);
                  clickHandler();
                }}
                className="red"
              >
                {negativeBtn}
              </ButtonRipple>
            )}
            {positiveBtn && (
              <ButtonRipple clickHandler={hideWindow}>
                {positiveBtn}
              </ButtonRipple>
            )}
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
  clickHandler: PropTypes.func,
  isClosable: PropTypes.bool,
};

ModalOverlay.defaultProps = {
  isFooter: false,
  isClosable: true,
  linkPath: '/',
  headerText: 'just modal window',
};

export default memo(ModalOverlay);
