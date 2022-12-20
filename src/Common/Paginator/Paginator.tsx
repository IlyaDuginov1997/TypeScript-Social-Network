import React from 'react';
import classes from 'src/Common/Paginator/Paginator.module.css';

export type PaginatorPropsType = {
  pageSize: number
  totalUserCount: number
  currentPage: number
  onPageChanged: (currentPage: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = ({ totalUserCount, pageSize, currentPage, onPageChanged }) => {
  let pageCount = Math.ceil(totalUserCount / pageSize);
  let pageCountArray = [];
  for (let i = 1; i <= pageCount; i++) {
    pageCountArray.push(i);
  }

  return (
    <div>
      {pageCountArray.map((p, i) => {

        const changePageHandle = () => {
          onPageChanged(p);
        };

        return (
          <span key={i} className={currentPage === p ? classes.selected : ''}
                onClick={changePageHandle}> {p} </span>
        );
      })}
    </div>);
};