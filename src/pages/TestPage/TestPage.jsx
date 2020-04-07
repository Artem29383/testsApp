import React, { useEffect } from 'react';
import ButtonRipple from 'components/ButtonRipple';
import Table from 'pages/TestPage/Table';
import useAction from 'hooks/useAction';
import { setLoading } from 'models/tests/reducer';
import Loader from 'components/Loader';
import useSelector from 'hooks/useSelector';
import {
  getDenormalizedDataSelector,
  getLoadingSelector,
} from 'models/tests/selectors';
import { GET_TESTS } from 'models/tests/actions';
import { getIsAdminSelector } from 'models/user/selectors';
import useToggle from 'hooks/useToggle';
import ModalOverlay from 'components/ModalOverlay';
import routes from 'constants/routes';
import Cross from 'components/Cross';
import Portal from 'components/Portal';
import S from './TestPage.styled';

const TestPage = () => {
  const setLoad = useAction(setLoading);
  const getTests = useAction(GET_TESTS);
  const isLoading = useSelector(getLoadingSelector);
  const { tests } = useSelector(getDenormalizedDataSelector)('tests');
  const isAdmin = useSelector(getIsAdminSelector);
  const [showModal, setShowModal] = useToggle(false);
  useEffect(() => {
    setLoad(true);
    getTests();
  }, []);

  return (
    <S.Content>
      {isLoading ? <Loader /> : <Table tests={tests} />}
      {isAdmin && (
        <S.BtnPos>
          <ButtonRipple onClickHandler={setShowModal} className="circle">
            <Cross top="50%" left="50%" />
          </ButtonRipple>
        </S.BtnPos>
      )}
      {showModal && (
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
      )}
    </S.Content>
  );
};

export default TestPage;
