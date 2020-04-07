import { useState, useCallback } from 'react';

export const useInput = initValue => {
  const [value, setValue] = useState(initValue);
  const changeHandler = useCallback(
    e => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  const reset = useCallback(() => setValue(''), [setValue]);

  return [value, changeHandler, reset];
};
