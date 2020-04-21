import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import Cross from 'components/Cross';
import useModal from 'hooks/useModal';
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
  isOpen,
  isClosable,
  negativeClickHandler,
  onClickHandler,
}) => {
  useModal(toggle, isOpen);

  return (
    <S.OverlayM unmountOnExit in={isOpen} timeout={100}>
      <S.BackDrop onClick={toggle} />
      <S.ModalWindow appear in={isOpen} timeout={100}>
        <S.ModalHeader>
          {isClosable && (
            <Cross
              rotate="45deg"
              right="20px"
              position="absolute"
              clickHandler={toggle}
            />
          )}
          <S.Title>{headerText}</S.Title>
        </S.ModalHeader>
        {children}
        {isFooter && (
          <S.ModalFooter>
            {negativeBtn && (
              <ButtonRipple onClickHandler={toggle} className="red">
                {negativeBtn}
              </ButtonRipple>
            )}
            {negativeClickHandler && (
              <ButtonRipple onClickHandler={onClickHandler} className="red">
                {negativeClickHandler}
              </ButtonRipple>
            )}
            {positiveBtn && (
              <ButtonRipple onClickHandler={toggle}>{positiveBtn}</ButtonRipple>
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
  isClosable: PropTypes.bool,
  negativeClickHandler: PropTypes.string,
  onClickHandler: PropTypes.func,
};

ModalOverlay.defaultProps = {
  isFooter: false,
  isClosable: true,
  linkPath: '/',
  negativeClickHandler: '',
  headerText: 'just modal window',
};

export default memo(ModalOverlay);
