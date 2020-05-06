import styled from 'styled-components';
import { colors } from 'styles/constants';
import { device } from 'constants/device';

export const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

export const Label = styled.label`
  position: relative;
  cursor: pointer;
  max-width: 80%;
  word-break: break-all;
  transition: color 250ms ease;

  @media ${device.tabletM} {
    max-width: 70%;
    left: -10px;
  }

  &::before {
    position: absolute;
    left: -35px;
    content: '';
    background: ${colors.gallery};
    border-radius: 100%;
    border: 1px solid darken(${colors.gallery}, 25%);
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 1em;
    vertical-align: top;
    cursor: pointer;
    text-align: center;
    transition: background-color 250ms ease, box-shadow 250ms ease;
  }

  &.checked + ${Input} {
    color: ${colors.dodjerBlue};
  }

  &.checked::before {
    background-color: ${colors.pictonBlue};
    box-shadow: inset 0 0 0 4px ${colors.windSand};
  }
`;
