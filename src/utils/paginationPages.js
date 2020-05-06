export function paginate(totalPages, currentPage) {
  let startPage = 0;
  let endPage = 0;
  if (totalPages <= 10) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= 6) {
    startPage = 1;
    endPage = 10;
  } else if (currentPage + 4 >= totalPages) {
    startPage = totalPages - 9;
    endPage = totalPages;
  } else {
    startPage = currentPage - 5;
    endPage = currentPage + 4;
  }
  return [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);
}
