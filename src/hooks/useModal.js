import { useEffect } from 'react';

const useModal = (toggle, isOpen) => {
  const hideWindowHandlerKey = e => {
    if (e.key === 'Escape') {
      toggle();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal');
      document.addEventListener('keydown', hideWindowHandlerKey);
    }
    return () => {
      document.body.classList.remove('modal');
      document.removeEventListener('keydown', hideWindowHandlerKey);
    };
  }, [isOpen]);
};

export default useModal;
