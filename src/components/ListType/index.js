import classNames from "classnames/bind";
import styles from "./ListType.module.scss";
import Title from "../Title";
import { useState } from "react";
import Icon from "../Icon";

const cx = classNames.bind(styles);

function ListType({ items, title = "Danh sách sản phẩm", setTitle }) {
    return (
        <div className={cx("wrapper")}>
            <Title className={cx("title")}>{title}</Title>
            <div className={cx("list")}>
                {items.map((item, index) => (
                    <button
                        key={index}
                        className={cx("button", {
                            active: title === item.value,
                        })}
                        onClick={() => {
                            setTitle(item.value);
                        }}>
                        <Icon className={cx("icon")}>{item.icon}</Icon>
                        <span>{item.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ListType;
