import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Button({
    className,
    to,
    primary,
    secondary,
    outline,
    cancel,
    normal,
    small,
    large,
    disabled = false,
    children,
    ...props
}) {
    let Component = "button";

    if (to) {
        Component = Link;
        props = {
            ...props,
            to,
        };
    }

    return (
        <Component
            disabled={disabled}
            className={cx("wrapper", {
                [className]: className,
                primary,
                secondary,
                outline,
                cancel,
                normal,
                small,
                large,
            })}
            {...props}>
            {children}
        </Component>
    );
}

export default Button;
