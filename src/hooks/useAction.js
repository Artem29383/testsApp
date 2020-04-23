import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useAction = ({ type }) => {
  const dispatch = useDispatch();
  return useCallback((payload = {}) => dispatch({ type, payload }), [
    dispatch,
    type,
  ]);
};

export default useAction;
