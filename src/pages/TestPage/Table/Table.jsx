import React from 'react';
import PropTypes from 'prop-types';
import TableFields from 'pages/TestPage/Table/TableFields';
import { useSelector } from 'hooks/index';
import { getIsAdminSelector } from 'models/user/selectors';
import S from './Table.styled';

const Table = ({ tests }) => {
  const isAdmin = useSelector(getIsAdminSelector);
  const tableList = tests.map(t => <TableFields key={t.id} id={t.id} />);

  return (
    <S.DivTable>
      <S.TableWrap>
        <S.Table>
          <S.Thead>
            <tr>
              <S.Th>Название теста</S.Th>
              <S.Th>Дата создания</S.Th>
              {isAdmin && <S.Th>Редактирование</S.Th>}
            </tr>
          </S.Thead>
          <tbody>
            {tests.length !== 0 ? (
              tableList
            ) : (
              <S.TrText>
                <S.ThText>Пока нет ни одного теста</S.ThText>
              </S.TrText>
            )}
          </tbody>
        </S.Table>
      </S.TableWrap>
    </S.DivTable>
  );
};

Table.propTypes = {
  tests: PropTypes.array,
};

export default Table;
