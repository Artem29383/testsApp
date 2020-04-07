import React from 'react';
import PropTypes from 'prop-types';
import Field from 'pages/TestPage/Table/TableFields/Field';
import useSelector from 'hooks/useSelector';
import { getIsAdminSelector } from 'models/user/selectors';
import routes from 'constants/routes';
import edit from 'assets/images/edit.svg';
import Edit from 'assets/images/edit.styled';
import { colors } from 'styles/constants';
import S from './TableFields.styled';

const TableFields = ({ id }) => {
  const isAdmin = useSelector(getIsAdminSelector);
  const fields = [
    ['name', 'Название теста'],
    ['created', 'Дата создания'],
  ].map(f => {
    return <Field key={f[0]} id={id} f={f[0]} label={f[1]} />;
  });

  return (
    <S.TrText>
      {fields}
      {isAdmin && (
        <S.ThText data-label="Редактирование" className={colors.blazeOrange}>
          <S.Link to={`${routes.edit}/${id}`}>
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
  id: PropTypes.number,
};

export default TableFields;
