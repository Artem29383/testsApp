import React, { useEffect } from 'react';
import Loader from 'components/Loader';
import CreateEditTestPage from 'pages/CreateEditTestPage';
import useAction from 'hooks/useAction';
import { useParams } from 'react-router-dom';
import { getTest, setLoad } from 'models/test/reducer';
import useSelector from 'hooks/useSelector';
import { getLoadSelector } from 'models/test/selectors';

const EditTestPage = () => {
  const fetchTest = useAction(getTest);
  const setLoading = useAction(setLoad);
  const isLoad = useSelector(getLoadSelector);
  const editId = useParams().id;

  useEffect(() => {
    setLoading(true);
    fetchTest(editId);
  }, []);

  return isLoad ? <Loader /> : <CreateEditTestPage />;
};

export default EditTestPage;
