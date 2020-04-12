import styled from 'styled-components';
import transition from 'styled-transition-group';
import theme from 'styles/theme';
import { colors } from 'styles/constants';
/* stylelint-disable */

export default {
  DropDownDiv: styled.div`
    width: 100%;
    position: relative;
    height: 50px;
    border: ${theme.border.google};
    cursor: pointer;
    font-size: 16px;
    color: ${colors.olsoGray};

    &.dictionary {
      max-width: 255px;
      margin: 20px auto 0 auto;
    }
  `,
  DefaultValueDiv: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
  `,
  DefaultValue: styled.div.attrs(({ x, y }) => ({
    style: {
      backgroundImage: `radial-gradient(circle at ${x}px ${y}px, transparent 1%, #fff 1%)`,
    },
  }))`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.white} left/15000%;
    transition: background 0.8s;

    &:active {
      background-color: ${colors.graySuit};
      background-size: 1%;
      transition: background 0s;
    }
  `,
  Triangle: styled.div.attrs(({ isAnim }) => ({
    style: {
      transform: `${isAnim ? 'rotate(180deg)' : 'rotate(0)'}`,
      transition: `transform 0.2s linear`,
    },
  }))`
    width: 0;
    margin-left: 10px;
    height: 0;
    border-style: solid;
    border-width: 10px 7.5px 0 7.5px;
    border-color: #80868b transparent transparent transparent;
  `,
  DropList: transition.div`
    right: -1px;
    left: -1px;
    top: 100%;
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    position: absolute;
    z-index: 100;
    
    &:enter {
        transform: translateY(-50px);
        opacity: 0;
      }
      
      &:enter-active {
        transform: translateY(0px);
        opacity: 1;
      }
      
      &:exit {
        transform: translateY(0px);
        opacity: 1;
      }
      
      &:exit-active {
        transform: translateY(-50px);
        opacity: 0;
      }
  `,
  Ul: styled.ul`
    width: 100%;
  `,
  Li: styled.li`
    display: flex;
    border-bottom: 1px solid ${colors.olsoGray};
    border-left: 1px solid ${colors.olsoGray};
    border-right: 1px solid ${colors.olsoGray};
    justify-content: center;
    align-items: center;
    height: 50px;
    background: ${colors.white} left/15000%;
    background-image: ${({ x, y }) =>
      `radial-gradient(circle at ${x}px ${y}px, transparent 1%, #fff 1%)`};
    transition: background 0.8s;

    &:active {
      background-color: ${colors.graySuit};
      background-size: 1%;
      transition: background 0s;
    }

    &:first-child {
      border-top: 1px solid ${colors.olsoGray};
    }
  `,
};
/* stylelint-enable */
