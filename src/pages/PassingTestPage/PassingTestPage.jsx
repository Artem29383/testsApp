import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAction from 'hooks/useAction';
import { getTestById, setLoading } from 'models/tests/reducer';
import useSelector from 'hooks/useSelector';
import {
  getCurrentTestSelector,
  getLoadingSelector,
} from 'models/tests/selectors';
import Loader from 'components/Loader';
import { getIsAdminSelector } from 'models/user/selectors';

const PassingTestPage = () => {
  const { id } = useParams();
  const isAdmin = useSelector(getIsAdminSelector);
  const setLoad = useAction(setLoading);
  const isLoading = useSelector(getLoadingSelector);
  const getCurrentTest = useAction(getTestById);
  const test = useSelector(getCurrentTestSelector);

  useEffect(() => {
    setLoad(true);
    getCurrentTest({ id, isAdmin });
  }, []);

  return isLoading ? <Loader /> : <h1>Название: {test.testName}</h1>;
};

export default PassingTestPage;
