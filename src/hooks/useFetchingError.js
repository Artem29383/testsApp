import { useState, useCallback } from 'react';
import useSelector from 'hooks/useSelector';
import { fetchErrorSelector } from 'models/user/selectors';
import useAction from 'hooks/useAction';
import { setError } from 'models/user/reducer';
import { useToggle } from 'hooks/index';

const useFetchingError = () => {
  const [isLoading, setIsLoading] = useToggle(false);
  const [action, setAction] = useState('');
  const error = useSelector(fetchErrorSelector);
  const resetError = useAction(setError);

  const reset = useCallback(() => {
    resetError('');
  }, []);

  return {
    load: isLoading,
    setIsLoading,
    error: error.message,
    idError: error.idError,
    resetError: reset,
    action,
    setAction,
  };
};

export default useFetchingError;
