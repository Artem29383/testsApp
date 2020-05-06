import React from 'react';
import PropTypes from 'prop-types';
import Field from 'pages/TestPage/Table/TableFields/Field';
import routes from 'constants/routes';
import edit from 'assets/images/edit.svg';
import Edit from 'assets/images/edit.styled';
import { colors } from 'styles/constants';
import { adminStatusSelector } from 'models/user/selectors';
import useSelector from 'hooks/useSelector';
import S from './TableFields.styled';

const TableFields = ({ id }) => {
  const isAdmin = useSelector(adminStatusSelector);
  const fields = [
    ['testName', 'Название теста'],
    ['created', 'Дата создания'],
  ].map(f => {
    return <Field key={f[0]} id={id} f={f[0]} label={f[1]} />;
  });

  return (
    <S.TrText>
      {fields}
      {isAdmin && (
        <S.ThText data-label="Редактирование" className={colors.blazeOrange}>
          <S.Link to={`${routes.testPage}/${id}${routes.edit}`}>
            <S.ThDiv>
              <S.Text data-id={id}>
                <Edit.Icon>
                  <use xlinkHref={`${edit}#edit`} />
                </Edit.Icon>
              </S.Text>
            </S.ThDiv>
          </S.Link>
        </S.ThText>
      )}
    </S.TrText>
  );
};

TableFields.propTypes = {
  id: PropTypes.string,
};

export default TableFields;
