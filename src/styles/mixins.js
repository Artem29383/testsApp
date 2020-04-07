const size = (width, height) => `
  width: ${width};
  height: ${height || width};
`;

const bg = (props = {}) => `
  background-image: url("${props.path || ''}");
  background-size: ${props.size || 'contain'};
  background-position: ${props.position || 'center'}
  background-repeat: ${props.repeat ? 'repeat' : 'no-repeat'};
`;

const shadow = color => `
  box-shadow: 0 0 0 100px ${color} inset;
`;

const center = (props = {}) => `
  position: ${props.position || 'absolute'};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${props.transform || ''};
`;

const centerX = (props = {}) => `
  position: ${props.position || 'absolute'};
  left: 50%;
  transform: translateX(-50%) ${props.transform || ''};
`;

const centerY = (props = {}) => `
  position: ${props.position || 'absolute'};
  top: 50%;
  transform: translateY(-50%) ${props.transform || ''};
`;

const centerIn = (x = true, y = true) => `
  display: flex;
  ${x ? 'justify-content: center;' : ''}
  ${y ? 'align-items: center' : ''}
`;

export default {
  size,
  bg,
  shadow,
  center,
  centerX,
  centerY,
  centerIn,
};
