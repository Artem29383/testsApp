import { colors } from 'styles/constants';

export default {
  font: {
    weight: {
      light: '300',
      normal: '400',
      bold: '600',
    },
  },
  error: {
    light: colors.sunglo,
    main: colors.pomegranate,
    dark: colors.persianRed,
    contrastText: colors.white,
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: 'rgba(0, 0, 0, 0.3) 0px 1px 8px 0px',
    lg: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    xl: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
  radius: {
    sm: '3px',
    md: '6px',
    google: '8px',
    lg: '12px',
  },
  border: {
    google: `1px solid ${colors.olsoGray}`,
    googleError: `2px solid ${colors.persianRed}`,
  },
};
