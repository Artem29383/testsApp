import React, { useEffect } from 'react';
import Loader from 'components/Loader';
import CreateEditTestPage from 'pages/CreateEditTestPage';
import useAction from 'hooks/useAction';
import { useParams } from 'react-router-dom';
import { getTest, setLoad } from 'models/test/reducer';
import useSelector from 'hooks/useSelector';
import { getLoadSelector } from 'models/test/selectors';
import useFetchingError from 'hooks/useFetchingError';
import ButtonRipple from 'components/ButtonRipple';
import S from './EditTestPage.styled';

const EditTestPage = () => {
  const { error, resetError, idError } = useFetchingError();
  const fetchTest = useAction(getTest);
  const setLoading = useAction(setLoad);
  const isLoad = useSelector(getLoadSelector);
  const editId = useParams().id;
  const fetchTestById = () => {
    setLoading(true);
    resetError();
    fetchTest(editId);
  };

  useEffect(() => {
    fetchTestById();
  }, []);

  if (isLoad) return <Loader />;
  if (error && idError === 'fetchTest')
    return (
      <S.Error>
        <ButtonRipple onClickHandler={fetchTestById}>Повторить</ButtonRipple>
      </S.Error>
    );
  return <CreateEditTestPage />;
};

export default EditTestPage;
