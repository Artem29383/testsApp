import styled from 'styled-components';
import { colors } from 'styles/constants';

export default {
  Button: styled.button`
    border: none;
    border-radius: 2px;
    padding: 0 18px;
    line-height: 2.5;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
    display: block;
    color: ${colors.white};
    background-color: ${colors.dodjerBlue};
    box-shadow: 0 0 4px ${colors.dustyGray};
    background-position: center;
    transition: background 0.8s;

    &.circle {
      border-radius: 50%;
      height: 100%;
      width: 100%;
      line-height: 0;
    }

    &:hover {
      background: ${colors.pictonBlue}
        radial-gradient(circle, transparent 1%, ${colors.pictonBlue} 1%)
        center/15000%;
    }

    &.green {
      background-color: ${colors.cornHarvest};

      &:hover {
        background: ${colors.crete}
          radial-gradient(circle, transparent 1%, ${colors.crete} 1%)
          center/15000%;
      }

      &:active {
        background-color: ${colors.bitter};
        background-size: 100%;
        transition: background 0s;
      }
    }

    &.red {
      background-color: ${colors.vermillion};

      &:hover {
        background: ${colors.blazeOrange}
          radial-gradient(circle, transparent 1%, ${colors.blazeOrange} 1%)
          center/15000%;
      }

      &:active {
        background-color: ${colors.bitter};
        background-size: 100%;
        transition: background 0s;
      }
    }

    &:active {
      background-color: ${colors.malibu};
      background-size: 100%;
      transition: background 0s;
    }

    &.center {
      margin: 0 auto;
    }
  `,
};
