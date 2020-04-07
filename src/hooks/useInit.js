import useSelector from 'hooks/useSelector';
import { getInit } from 'models/user/selectors';
import { useEffect } from 'react';
import useAction from 'hooks/useAction';
import { loginUserSuccess, setInit } from 'models/user/reducer';

const useInit = () => {
  const init = useSelector(getInit);
  const login = useAction(loginUserSuccess);
  const setInitApp = useAction(setInit);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      login(JSON.parse(localStorage.getItem('user')));
    }
    setInitApp(true);
  }, [init]);
  return init;
};

export default useInit;
