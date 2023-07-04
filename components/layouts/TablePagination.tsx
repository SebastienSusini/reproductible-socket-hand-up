import { useEffect, useState } from 'react';

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';

interface Props {
  pageChangeHandler: (pageNo: number) => void;
  numOfPage: number;
}

const TablePagination = ({ pageChangeHandler, numOfPage }: Props) => {
  // State variable to hold the current page. This value is
  // passed to the callback provided by the parent
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoNext, setCanGoNext] = useState<boolean>(true);

  const nOfPages = numOfPage;
  // const pagesArr = [...new Array(nOfPages)];

  // Onclick handlers for the butons
  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (pageNo: number) => setCurrentPage(pageNo);

  useEffect(() => {
    pageChangeHandler(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCanGoNext(nOfPages + 1 !== currentPage + 1);
    setCanGoBack(currentPage !== 0);
  }, [nOfPages, currentPage]);

  return (
    <>
      {nOfPages >= 1 ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 py-1">
            <span className="flex items-center gap-1 text-xs text-skyblue-500">
              <div>Page</div>
              <strong>
                {currentPage + 1} of {nOfPages + 1}
              </strong>
            </span>
          </div>
          <div className="flex items-center text-xs">
            <button
              className="rounded-l border px-3 py-2 text-skyblue-500"
              onClick={() => onPageSelect(0)}
              disabled={!canGoBack}
            >
              <ChevronDoubleLeftIcon className="h-4 w-4 text-skyblue-500" />
            </button>
            <button
              className="border-y px-3 py-2 text-skyblue-500"
              onClick={onPrevPage}
              disabled={!canGoBack}
            >
              <ChevronLeftIcon className="h-4 w-4 text-skyblue-500" />
            </button>
            <button
              className="border px-3 py-2 text-skyblue-500"
              onClick={onNextPage}
              disabled={!canGoNext}
            >
              <ChevronRightIcon className="h-4 w-4 text-skyblue-500" />
            </button>
            <button
              className="rounded-r border-y border-r px-3 py-2 text-skyblue-500"
              onClick={() => onPageSelect(nOfPages)}
              disabled={!canGoNext}
            >
              <ChevronDoubleRightIcon className="h-4 w-4 text-skyblue-500" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TablePagination;
