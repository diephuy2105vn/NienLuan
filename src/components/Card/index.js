import classNames from "classnames/bind";
import styles from "./Card.module.scss";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Card({ item }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("thumbnail")}>
                <img src={item.urlImages[0]} alt="" />
            </div>
            <div className={cx("infor")}>
                <Link to={`/product/${item._id}`}>
                    <h3 className={cx("name")}>{item.name}</h3>
                </Link>
                <div className={cx("price")}>
                    <span>{item.price.toLocaleString("de-DE")} ₫</span>
                </div>
            </div>
        </div>
    );
}

export default Card;
