import classNames from "classnames/bind";
import styles from "./Icon.Module.scss";

const cx = classNames.bind(styles);

function Icon({ children, className, ...props }) {
    return (
        <i
            className={cx("wrapper", {
                [className]: className,
            })}
            {...props}>
            {children}
        </i>
    );
}

export default Icon;
