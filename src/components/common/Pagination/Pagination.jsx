import style from "./Pagination.module.css";
import React from "react";

const Pagination = ({currentPage, totalResults, onPageChange}) => {
    let pageSize = 10;
    let pagesCount = Math.ceil(totalResults / pageSize);
    let pages = [];
    for(let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }

    let startPage = ((currentPage - 5) < 0) ? 0 : currentPage - 5;
    let endPage = (currentPage + 5 < pagesCount)? currentPage + 5 : pagesCount;

    let slicedPages = pages.slice(startPage, endPage);

    let pagination = slicedPages.map((p)=>{
        return (
            <button key={p}
                    className={`${style.paginationBtn} ${p === currentPage ? style.paginationBtn_active : ''}`}
                    onClick={() => { onPageChange(p) }}>
                {p}
            </button>
        );
    });

    if(currentPage > 6){
        pagination.unshift(<span className={`${style.paginationBtn}`}>...</span>);
    }

    if(currentPage > 5){
        pagination.unshift(<button className={`${style.paginationBtn}`} onClick={() => { onPageChange(1) }}>
            1
        </button>)
    }

    if(endPage !== pagesCount){
        pagination.push(<span className={`${style.paginationBtn}`}>...</span>);
        pagination.push(<button className={`${style.paginationBtn}`} onClick={() => { onPageChange(pagesCount) }}>
            {pagesCount}
        </button>)
    }

    if(currentPage > 1){
        pagination.unshift(<button className={`${style.paginationBtn}`} onClick={() => { onPageChange(currentPage - 1) }}>
            &larr;
        </button>)
    }
    if(currentPage < pagesCount){
        pagination.push(<button className={`${style.paginationBtn}`} onClick={() => { onPageChange(currentPage + 1) }}>
            &rarr;
        </button>)
    }

    return (
        <>
        {(pages.length > 1) &&
            <div className={style.pagination}>
                {pagination}
            </div>
        }
        </>
    );
}

export default Pagination;
