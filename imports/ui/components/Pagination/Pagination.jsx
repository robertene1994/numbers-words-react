import { Container, Pagination as BPagination } from 'react-bootstrap';

import './Pagination.css';

// default number of displayed items per page
export const defaultItemsPerPage = 30;

/**
 * Component to paginate the data of the application.
 *
 * @param {Number} itemsCount The total number of items.
 * @param {Number} currentPage The current page number.
 * @param {Function} setCurrentPage The callback function that updates the current page number.
 */
const Pagination = ({ itemsCount, currentPage, setCurrentPage }) => {
  const pagesCount = Math.ceil(itemsCount / defaultItemsPerPage);
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  let isPageNumberOutOfRange;
  const pages = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - currentPage) <= 2;

    if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
      isPageNumberOutOfRange = false;
      return (
        <BPagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </BPagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <BPagination.Ellipsis key={pageNumber} className='pagination-ellipsis' />;
    }

    return null;
  });

  /**
   * Function that changes the current page.
   *
   * @param {Number} number The new current page value.
   */
  const changePage = (number) => {
    if (currentPage !== number) {
      setCurrentPage(number);
    }
  };

  /**
   * Function that is executed when the user selects a page number.
   *
   * @param {Number} pageNumber The selected page number value.
   */
  const onPageNumberClick = (pageNumber) => {
    changePage(pageNumber);
  };

  /**
   * Callback function that is executed when the user goes to the previous page.
   */
  const onPreviousPageClick = () => {
    changePage((currentPage) => currentPage - 1);
  };

  /**
   * Callback function that is executed when the user goes to the next page.
   */
  const onNextPageClick = () => {
    changePage((currentPage) => currentPage + 1);
  };

  return (
    <>
      <Container fluid className='py-4'>
        <BPagination className='m-0 justify-content-md-center'>
          <BPagination.Prev onClick={onPreviousPageClick} disabled={isCurrentPageFirst} />
          {pages}
          <BPagination.Next onClick={onNextPageClick} disabled={isCurrentPageLast} />
        </BPagination>
      </Container>
    </>
  );
};

export default Pagination;
