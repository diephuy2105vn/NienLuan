import classNames from "classnames/bind";
import styles from "./Table.module.scss";

const cx = classNames.bind(styles);

function Table({}) {
    return (
        <table className={cx("wrapper")}>
            <div className={cx("header")}></div>
        </table>
    );
}

export default Table;
