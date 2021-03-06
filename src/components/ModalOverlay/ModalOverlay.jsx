import React from 'react';
import PropTypes from 'prop-types';
import ButtonRipple from 'components/ButtonRipple';
import Cross from 'components/Cross';
import useModal from 'hooks/useModal';
import Loader from 'components/Loader';
import { colors } from 'styles/constants';
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
  load,
  error,
  action,
}) => {
  useModal(toggle, isOpen, isClosable);
  return (
    <S.OverlayM unmountOnExit in={isOpen} timeout={100}>
      {isClosable && <S.BackDrop onClick={toggle} />}
      <S.ModalWindow appear in={isOpen} timeout={100}>
        <S.ModalHeader>
          {isClosable && (
            <Cross
              rotate="45deg"
              right="20px"
              position="absolute"
              onClickHandler={toggle}
            />
          )}
          <S.Title>{headerText}</S.Title>
        </S.ModalHeader>
        {children}
        {isFooter && (
          <S.ModalFooter>
            {negativeBtn && (
              <ButtonRipple onClick={toggle} className="red">
                {negativeBtn}
              </ButtonRipple>
            )}
            {negativeClickHandler && (
              <>
                {load && action === 'save' ? (
                  <ButtonRipple
                    className="red"
                    isLoader
                    onClick={onClickHandler}
                  >
                    <Loader height="35" width="35" color={colors.white} />
                  </ButtonRipple>
                ) : (
                  <ButtonRipple
                    onClick={onClickHandler}
                    className="red"
                    isLoader
                  >
                    {error && action === 'save'
                      ? 'Повторить'
                      : negativeClickHandler}
                  </ButtonRipple>
                )}
              </>
            )}
            {positiveBtn && (
              <ButtonRipple onClick={toggle}>{positiveBtn}</ButtonRipple>
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
  load: PropTypes.bool,
  error: PropTypes.string,
  action: PropTypes.string,
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

export default ModalOverlay;
