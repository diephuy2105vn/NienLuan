import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import { useState, useEffect } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
const cx = classNames.bind(styles);

function Pagination({ currentPage, setCurrentPage, totalPage }) {
    const itemPaginations = [...Array(totalPage + 1).keys()].slice(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [totalPage]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("pagination")}>
                <button
                    className={cx("btn-prev")}
                    onClick={() => {
                        setCurrentPage((pre) => (pre > 1 ? --pre : pre));
                    }}>
                    <MdNavigateBefore />
                </button>
                {itemPaginations.map((item, index) => (
                    <button
                        onClick={() => {
                            setCurrentPage(item);
                        }}
                        key={index}
                        className={cx("btn-item", {
                            active: item == currentPage,
                        })}>
                        {item}
                    </button>
                ))}
                <button
                    className={cx("btn-next")}
                    onClick={() => {
                        setCurrentPage((pre) =>
                            pre < totalPage ? ++pre : pre
                        );
                    }}>
                    <MdNavigateNext />
                </button>
            </div>
        </div>
    );
}

export default Pagination;
