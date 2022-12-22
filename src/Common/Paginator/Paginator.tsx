import React, { useState } from 'react';
import classes from 'src/Common/Paginator/Paginator.module.css';

export type PaginatorPropsType = {
  pageSize: number;
  totalUserCount: number;
  currentPage: number;
  onPageChanged: (currentPage: number) => void;
  portionSize: number;
};

export const Paginator: React.FC<PaginatorPropsType> = ({
  totalUserCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  const pagesCount = Math.ceil(totalUserCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const [portionNumber, setPortionNumber] = useState(1);

  const portionCount = Math.ceil(pagesCount / portionSize);

  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize

  return (
    <div>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>
      )}

      {pages
        .filter(page => {
          return page >= leftPortionPageNumber && page <= rightPortionPageNumber;
        })
        .map((p, i) => {
          const changePageHandle = () => {
            onPageChanged(p);
          };

          return (
            <span
              key={i}
              className={currentPage === p ? classes.selected : ''}
              onClick={changePageHandle}
            >
              {' '}
              {p}{' '}
            </span>
          );
        })}

      {portionNumber < portionCount && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
      )}
    </div>
  );
};
