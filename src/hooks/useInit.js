import useSelector from 'hooks/useSelector';
import { getInit } from 'models/user/selectors';
import { useEffect } from 'react';
import useAction from 'hooks/useAction';
import { checkAuthUser } from 'models/user/reducer';

const useInit = () => {
  const isInit = useSelector(getInit);
  const checkUser = useAction(checkAuthUser);
  useEffect(() => {
    if (!isInit) {
      checkUser();
    }
  }, []);
  return isInit;
};

export default useInit;
