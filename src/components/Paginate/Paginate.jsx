import React, { useEffect, useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { paginate } from 'utils/paginationPages';
import S from './Paginate.styled';

const Paginate = ({ currentPage, chunkArrayLength, setCurrentPage }) => {
  const [pagesArray, setPagesArray] = useState([]);
  useEffect(() => {
    setPagesArray(paginate(chunkArrayLength, currentPage));
  }, [currentPage, chunkArrayLength]);

  const handleFirstPageClick = useCallback(() => {
    setCurrentPage(0);
  }, [currentPage]);

  const handleLastPageClick = useCallback(() => {
    setCurrentPage(chunkArrayLength - 1);
  }, [currentPage]);

  const handlePrevPageClick = useCallback(() => {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 2);
    }
  }, [currentPage]);

  const handleNextPageClick = useCallback(() => {
    if (currentPage <= chunkArrayLength - 1) {
      setCurrentPage(currentPage);
    }
  }, [currentPage]);

  const handleChange = useCallback(
    e => {
      setCurrentPage(Number(e.currentTarget.innerText - 1));
    },
    [currentPage]
  );

  const pages = pagesArray.map(page => {
    return (
      <S.PaginateLi
        className={currentPage === page && 'active'}
        key={page}
        onClick={handleChange}
      >
        {page}
      </S.PaginateLi>
    );
  });
  return (
    <S.PaginateDiv>
      <S.PaginateUl>
        <S.PaginateLi onClick={handleFirstPageClick}>First</S.PaginateLi>
        <S.PaginateLi onClick={handlePrevPageClick}>{'<'}</S.PaginateLi>
        {pages}
        <S.PaginateLi onClick={handleNextPageClick}>{'>'}</S.PaginateLi>
        <S.PaginateLi onClick={handleLastPageClick}>Last</S.PaginateLi>
      </S.PaginateUl>
    </S.PaginateDiv>
  );
};

Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  chunkArrayLength: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default memo(Paginate);
