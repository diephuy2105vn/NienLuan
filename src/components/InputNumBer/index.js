import classNames from "classnames/bind";
import Icon from "../Icon";
import styles from "./InputNumber.module.scss";

const cx = classNames.bind(styles);
function InputNumber({ large = false, value, setValue, maxValue = 99 }) {
    function handleReduceValue() {
        setValue((pre) => (pre > 1 ? --pre : pre));
    }
    function handleIncreaseValue() {
        setValue((pre) => (pre < maxValue ? ++pre : pre));
    }
    return (
        <div
            className={cx("wrapper", {
                large,
            })}>
            <Icon className={cx("button")} onClick={handleReduceValue}>
                -
            </Icon>
            <input
                type="number"
                value={value}
                onChange={(e) => {
                    if (e.target.value > 0 && e.target.value <= maxValue) {
                        setValue(e.target.value);
                    }
                    if (e.target.value > maxValue) {
                        setValue(maxValue);
                    }
                }}
            />
            <Icon className={cx("button")} onClick={handleIncreaseValue}>
                +
            </Icon>
        </div>
    );
}

export default InputNumber;
