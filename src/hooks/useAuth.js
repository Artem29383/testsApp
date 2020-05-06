import { useEffect } from 'react';
import { getAuth, userNameSelector } from 'models/user/selectors';
import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';
import { loginUserSuccess } from 'models/user/reducer';

const useAuth = () => {
  const isAuth = useSelector(getAuth);
  const name = useSelector(userNameSelector);
  const login = useAction(loginUserSuccess);
  useEffect(() => {
    if (isAuth) {
      login({ isAuth, name });
    }
  }, [isAuth]);

  return isAuth;
};

export default useAuth;
