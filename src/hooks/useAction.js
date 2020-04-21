import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useAction = types => {
  const { type } = types();
  const dispatch = useDispatch();
  return useCallback((payload = {}) => dispatch({ type, payload }), [
    dispatch,
    type,
  ]);
};

export default useAction;
