import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import TableFields from 'pages/TestPage/Table/TableFields';
import { useSelector } from 'hooks/index';
import { useHistory } from 'react-router-dom';
import { normalized } from 'utils/normalized';
import useAction from 'hooks/useAction';
import { setTests } from 'models/tests/reducer';
import { getFilteredSelector } from 'models/tests/selectors';
import routes from 'constants/routes';
import queryString from 'query-string';
import { chunks } from 'utils/chunks';
import Paginate from 'components/Paginate';
import TableSearch from 'pages/TestPage/Table/TableSearch';
import { sortByData } from 'utils/sortByData';
import S from './Table.styled';

const Table = ({ testIds, tests, isAdmin }) => {
  const history = useHistory();
  const searchStr = queryString.parse(history.location.search).search || '';
  const [sort, setSort] = useState('asc');
  const setSortTests = useAction(setTests);
  const [value, setValue] = useState(searchStr);
  const filteredArray = useSelector(getFilteredSelector, value);
  const [currentPage, setCurrentPage] = useState(0);
  const elemCountsOnPage = 5;
  const [chunksArray, setChunksArray] = useState([]);
  const [currentChunk, setCurrentChunk] = useState([]);
  const [chunksArrayLength, setChunksArrayLength] = useState(0);

  useEffect(() => {
    setChunksArray(filteredArray);
    setCurrentPage(0);
  }, [filteredArray]);

  useEffect(() => {
    if (testIds.length === filteredArray.length) {
      const chunk = chunks(filteredArray, elemCountsOnPage);
      setCurrentChunk(chunk[currentPage] || []);
      setChunksArrayLength(chunk.length);
    } else {
      setCurrentChunk(filteredArray);
      setChunksArrayLength(0);
    }
  }, [currentPage, chunksArray]);

  const sortData = useCallback((sortCol, sortType) => {
    const displayData = sortByData(tests, sortCol, sortType);
    const dataNormalized = normalized(displayData, 'tests');
    setSort(sortType);
    setSortTests({
      entities: dataNormalized.entities.tests,
      ids: dataNormalized.result,
    });
  }, []);

  const sortClick = useCallback(() => {
    const sortType = sort === 'asc' ? 'desc' : 'asc';
    sortData('created', sortType);
  }, [sort]);

  useEffect(() => {
    if (searchStr) {
      setValue(searchStr);
    }
  }, []);

  const handleChange = useCallback(
    e => {
      const str = e.currentTarget.value;
      setValue(str);
      history.push(`${routes.testPage}/?search=${str.toLowerCase()}`);
    },
    [value]
  );

  useEffect(() => {
    if (!value.trim()) {
      history.push(routes.testPage);
    }
  }, [value]);

  useEffect(() => {
    sortData('created', 'asc');
  }, [testIds.length]);

  const tableList = currentChunk.map(t => (
    <TableFields key={tests[t].id} id={tests[t].id} />
  ));

  return (
    <>
      <TableSearch value={value} onChange={handleChange} label="Найти тест" />
      <S.DivTable>
        <S.TableWrap>
          <S.Table>
            <S.Thead>
              <tr>
                <S.Th>Название теста</S.Th>
                <S.Th className="pointer" onClick={sortClick}>
                  Дата создания {sort === 'asc' ? '▼' : '▲'}
                </S.Th>
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
      {chunksArrayLength > 1 ? (
        <Paginate
          currentPage={currentPage + 1}
          chunkArrayLength={chunksArrayLength}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  );
};

Table.propTypes = {
  testIds: PropTypes.array,
  tests: PropTypes.any,
  isAdmin: PropTypes.bool,
};

export default Table;
