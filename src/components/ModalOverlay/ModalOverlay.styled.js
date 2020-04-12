import styled from 'styled-components';
import transition from 'styled-transition-group';
import { NavLink } from 'react-router-dom';
import { colors } from 'styles/constants';
/* stylelint-disable */

export default {
  OverlayM: transition.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 1000;
    overflow: hidden;
    transition: background-color 200ms linear;
    
     &:enter {
        background-color: rgba(0,0,0,0.0);
      }
      
      &:enter-active {
        background-color: rgba(0,0,0,0.6);
      }
      
      &:exit {
        background-color: rgba(0,0,0,0.6);
      }
      
      &:exit-active {
        background-color: rgba(0,0,0,0);
      }
  `,
  ModalWindow: transition.div`
    width: 420px;
    height: auto;
    z-index: 1000;
    position: relative;
    min-height: 160px;
    transform: translateY(100px);
    background-color: ${colors.white}
    margin: 0 auto;
    transition: transform 200ms linear;
      
      &:appear {
        transform: translateY(-450px);
      }
      
      &:enter-active {
        transform: translateY(100px);
      }
      
      &:exit {
        transform: translateY(100px);
      }
      
      &:exit-active {
        transform: translateY(-450px);
      }
  `,
  ModalHeader: styled.div`
    min-height: 80px;
    position: relative;
    padding: 0 35px;
    background-color: ${colors.royalBlue};
    width: 100%;
    color: ${colors.white};
    font-size: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    line-height: 1.3;
  `,
  ModalInputWrap: styled.div`
    margin-top: 30px;
    width: 100%;
    padding: 0 40px;
  `,
  ModalFooter: styled.div`
    width: 60%;
    margin: 20px auto 10px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 10px;
  `,
  Message: styled.div`
    line-height: 2;
    color: ${colors.blazeOrange};
    font-size: 16px;
    text-align: center;

    &.green {
      color: ${colors.costaDelSol};
    }
  `,
  Link: styled(NavLink)`
    text-decoration: none;
  `,
  BackDrop: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `,
  Title: styled.div`
    width: 100%;
    text-align: center;
  `,
};
/* stylelint-enable */
