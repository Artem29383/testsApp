import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

export default {
  Nav: styled.div`
    width: 100%;
    height: 80px;
    background-color: ${colors.dodjerBlue};
    display: flex;

    @media ${device.tabletM} {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      transition: transform 0.2s linear;
      transform: ${({ isShow }) =>
        isShow ? 'translateY(0)' : 'translateY(-80px)'};
    }
  `,
  NavList: styled.div`
    @media ${device.tabletM} {
      position: fixed;
      top: 80px;
      left: 0;
      z-index: 1000;
      transform: ${({ isShow }) =>
        isShow ? 'translateX(0)' : 'translateX(-200%)'};
      width: 100%;
      display: block;
      transition: transform 0.2s ease-in-out;
    }
  `,
  NavUl: styled.ul`
    display: flex;
    height: 100%;

    @media ${device.tabletM} {
      justify-content: center;
      padding: 20px 0;
      background-color: rgba(174, 127, 181, 0.75);
    }
  `,
  NavItem: styled.li`
    height: 100%;
    display: flex;
    align-items: center;

    &.right {
      margin-left: auto;
      margin-right: 50px;
    }

    &.left {
      margin-left: 50px;

      @media ${device.tabletM} {
        margin-left: 0;
      }

      @media ${device.mobileM} {
        & button {
          font-size: 14px;
        }
      }
    }

    &.padding {
      margin-left: 20px;

      @media ${device.mobileM} {
        & button {
          font-size: 14px;
        }
      }
    }
  `,
  Link: styled(NavLink)`
    text-decoration: none;
  `,
  Burger: styled.div`
    display: none;
    width: 37px;
    height: 30px;
    position: relative;
    cursor: pointer;
    top: 50%;
    left: 50px;
    transform: translateY(-50%);

    & span {
      background-color: ${colors.white};
    }

    @media ${device.tabletM} {
      display: block;
    }
  `,
  Line1: styled.span`
    width: 100%;
    position: absolute;
    height: 4px;
    top: 0;
    transform-origin: left center;
    transition: transform 0.2s linear;
    transform: ${({ isOpen }) => isOpen && 'rotate(45deg)'};
  `,
  Line2: styled.span`
    width: 100%;
    position: absolute;
    height: 4px;
    top: 50%;
    transition: transform 0.2s linear;
    transform: ${({ isOpen }) =>
      isOpen ? 'translateY(-50%) scale(0)' : 'translateY(-50%)'};
  `,
  Line3: styled.span`
    width: 100%;
    position: absolute;
    height: 4px;
    bottom: 0;
    transform-origin: left center;
    transition: transform 0.2s linear;
    transform: ${({ isOpen }) => isOpen && 'rotate(-45deg)'};
  `,
};
