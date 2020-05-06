import { createGlobalStyle } from 'styled-components';
import { colors } from 'styles/constants';
/* stylelint-disable */

export const GlobalStyles = createGlobalStyle`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
    height: 100%;
    width: 100%;
  }

  a:active,
   a:focus {
    outline: none;
  }
  
  input, textarea {outline:none;}
  input:active, textarea:active {outline:none;}
  :focus {outline:none;}
  textarea {resize:none;}
  textarea {resize:vertical;}
  textarea {resize:horizontal;}
  
  ol,
  ul {
    list-style: none;
  }
  
  blockquote,
  q {
    quotes: none;
  }
  
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  body.no-scroll {
    overflow: hidden;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }

  
  html {
    font-size: 55px;
    width: 100%;
    height: 100%;
  }
  
  body {
    margin: 0;
    min-height: 100%;
    width: 100%;
    height: 100%;
    overflow: visible;
    color: #000;
    background-color: ${colors.white};
    
    &.modal {
      overflow: hidden;
      height: 100vh;
    }
  }
  
  #root {
    height: 100%;
  }
 
`;
/* stylelint-enable */
