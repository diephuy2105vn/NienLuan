import classNames from "classnames/bind";
import styles from "./Title.module.scss";

const cx = classNames.bind(styles);

function Title({ large = false, small = false, children }) {
    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("title", { large, small })}>{children}</h2>
        </div>
    );
}

export default Title;
