/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { ImSpinner6 } from "react-icons/im";
import Icon from "../Icon";
import { Link } from "react-router-dom";
import instance from "../../axios";
import useChangeDelay from "../../hooks/useChangeDelay";

const cx = classNames.bind(styles);

function Search({ showInput, setShowInput, windowSmall }) {
    const inputSearchRef = useRef();
    const searchRef = useRef();
    const [valueSearch, setValueSearch] = useState("");
    const [openSearchResult, setOpenSearchResult] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const valueSend = useChangeDelay(valueSearch, 1000);

    async function handleSendValue() {
        if (valueSearch.trim()) {
            await instance
                .get("/api/product", {
                    params: {
                        q: valueSend,
                    },
                })
                .then((res) => {
                    setSearchResult(res.data.data);
                    setOpenSearchResult(true);
                });
        }
        setLoadingSearch(false);
    }

    async function handleClickSearchIcon() {
        if (showInput) {
            if (!valueSearch.trim()) {
                inputSearchRef.current.focus();
                return;
            }
            setLoadingSearch(true);
            handleSendValue();
            return;
        }
        await setShowInput(true);
        inputSearchRef.current.focus();
    }

    useEffect(() => {
        function handleOutSearch(e) {
            if (windowSmall && !searchRef.current.contains(e.target)) {
                setValueSearch("");
                setShowInput(false);
            }
            if (!searchRef.current.contains(e.target)) {
                setOpenSearchResult(false);
                setSearchResult([]);
                setLoadingSearch(false);
            }
        }
        if (showInput) {
            window.addEventListener("mousedown", handleOutSearch);
        } else setOpenSearchResult(false);
        return () => {
            if (showInput) {
                window.removeEventListener("mousedown", handleOutSearch);
            }
        };
    }, [showInput]);

    useEffect(() => {
        handleSendValue();
    }, [valueSend]);

    return (
        <div
            className={cx("search", {
                sm: windowSmall,
                show: showInput,
            })}
            ref={searchRef}>
            {showInput && (
                <>
                    <input
                        placeholder="Nhập từ khóa tìm kiếm..."
                        ref={inputSearchRef}
                        value={valueSearch}
                        spellCheck="false"
                        onChange={(e) => {
                            if (e.target.value === "") {
                                setSearchResult([]);
                            }
                            setLoadingSearch(true);
                            setValueSearch(e.target.value);
                        }}
                        onFocus={(e) => setOpenSearchResult(true)}
                        onBlur={() =>
                            valueSearch.trim() === "" && setValueSearch("")
                        }
                    />
                    {loadingSearch && (
                        <Icon className={cx("search-spinner")}>
                            <ImSpinner6 />
                        </Icon>
                    )}
                </>
            )}
            <Icon className={cx("search-icon")} onClick={handleClickSearchIcon}>
                <BiSearchAlt2 />
            </Icon>
            {openSearchResult && searchResult.length > 0 && (
                <div className={cx("search-result")}>
                    {searchResult.map((item, index) => (
                        <Link
                            to={`/product/${item._id}`}
                            key={index}
                            className={cx("search-card")}
                            onClick={() => {
                                setValueSearch("");
                                setSearchResult("");
                            }}>
                            <div className={cx("thumbnail")}>
                                <img src={item.urlImages[0]} alt="" />
                            </div>
                            <div className={cx("infor")}>
                                <h3 className={cx("name")}>{item.name}</h3>
                                <span className={cx("price")}>
                                    {item.price.toLocaleString("de-DE")} ₫
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
