import React, { useEffect } from 'react';
import ButtonRipple from 'components/ButtonRipple';
import Table from 'pages/TestPage/Table';
import useAction from 'hooks/useAction';
import { getAllTests, setLoading } from 'models/tests/reducer';
import Loader from 'components/Loader';
import useSelector from 'hooks/useSelector';
import { allTestsSelector } from 'models/tests/selectors';
import { adminStatusSelector } from 'models/user/selectors';
import useToggle from 'hooks/useToggle';
import ModalOverlay from 'components/ModalOverlay';
import routes from 'constants/routes';
import Cross from 'components/Cross';
import Portal from 'components/Portal';
import useFetchingError from 'hooks/useFetchingError';
import S from './TestPage.styled';

const TestPage = () => {
  const { error, resetError, idError } = useFetchingError();
  const setLoad = useAction(setLoading);
  const getTests = useAction(getAllTests);
  const state = useSelector(allTestsSelector);
  const { ids } = state.tests;
  const { isLoading } = state;
  const isAdmin = useSelector(adminStatusSelector);
  const [showModal, setShowModal] = useToggle(false);

  const fetchAllTests = () => {
    setLoad(true);
    resetError();
    getTests();
  };

  useEffect(() => {
    if (!ids.length) {
      fetchAllTests();
    }
  }, []);

  if (isLoading) return <Loader />;
  if (error && idError === 'getTests')
    return (
      <S.Error>
        <ButtonRipple onClickHandler={fetchAllTests}>Повторить</ButtonRipple>
      </S.Error>
    );
  return (
    <S.Content>
      <Table testIds={ids} isAdmin={isAdmin} tests={state.tests.entities} />
      {isAdmin && (
        <S.BtnPos>
          <ButtonRipple onClickHandler={setShowModal} className="circle">
            <Cross top="50%" left="50%" position="absolute" />
          </ButtonRipple>
        </S.BtnPos>
      )}
      <Portal id="modal">
        <ModalOverlay
          toggle={setShowModal}
          isOpen={showModal}
          isFooter
          negativeBtn="Отмена"
          link="Перейти"
          linkPath={routes.create}
          headerText="Перейти на страницу создания теста?"
        />
      </Portal>
    </S.Content>
  );
};

export default TestPage;
