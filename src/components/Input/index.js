import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { useRef, useState } from "react";
const cx = classNames.bind(styles);

function Input({
    placeholder,
    error = null,
    type,
    value,
    onBlur,
    onFocus,
    ...props
}) {
    const [isFocus, setIsFocus] = useState(false);
    const inputRef = useRef();
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
                <input
                    ref={inputRef}
                    type={type}
                    value={value}
                    {...props}
                    spellCheck="false"
                    onFocus={() => {
                        setIsFocus(true);
                        onFocus && onFocus();
                    }}
                    onBlur={() => {
                        if (!value) {
                            setIsFocus(false);
                        }
                        onBlur && onBlur();
                    }}
                />
                <span
                    onClick={(e) => {
                        !isFocus && inputRef.current.focus();
                    }}
                    className={cx("placeholder", {
                        focus: isFocus,
                    })}>
                    {placeholder}
                </span>
            </div>
            {error !== null && <span className={cx("error")}>{error}</span>}
        </div>
    );
}

export default Input;
