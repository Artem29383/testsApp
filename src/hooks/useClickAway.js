import { useEffect, useState, useRef } from 'react';

export default function useClickAway() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const toggle = () => {
    setActive(!active);
  };
  const handleClick = e => {
    if (!ref.current.contains(e.target)) {
      setActive(false);
    }
  };
  useEffect(() => {
    if (active) document.addEventListener('mousedown', handleClick);
    else document.removeEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [active]);
  return { ref, active, setActive, toggle };
}
