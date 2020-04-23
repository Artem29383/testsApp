import { useState } from 'react';
import useSelector from 'hooks/useSelector';
import { getErrorSel } from 'models/user/selectors';
import useAction from 'hooks/useAction';
import { setError } from 'models/user/reducer';
import { useToggle } from 'hooks/index';

const useFetchingError = () => {
  const [isLoading, setIsLoading] = useToggle(false);
  const [action, setAction] = useState('');
  const error = useSelector(getErrorSel);
  const resetError = useAction(setError);

  return {
    load: isLoading,
    setIsLoading,
    error: error.message,
    idError: error.idError,
    resetError,
    action,
    setAction,
  };
};

export default useFetchingError;
