import classNames from "classnames/bind";
import styles from "./FormProfile.module.scss";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

function FormProfile({
    value = { name: "", address: "", phone: "" },
    setValue,
    readOnly = false,
}) {
    const inputFirstRef = useRef();
    useEffect(() => {
        if (readOnly === false) {
            inputFirstRef.current.focus();
        }
    }, [readOnly]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("wrapper-input")}>
                <label>Tên khách hàng:</label>
                <input
                    ref={inputFirstRef}
                    value={value.name}
                    onChange={(e) => {
                        !readOnly &&
                            setValue((pre) => ({
                                ...pre,
                                name: e.target.value,
                            }));
                    }}
                    readOnly={readOnly}
                    required
                    placeholder="Nhập tên khách hàng"
                />
            </div>
            <div className={cx("wrapper-input")}>
                <label>Địa chỉ:</label>
                <textarea
                    value={value.address}
                    onChange={(e) => {
                        !readOnly &&
                            setValue((pre) => ({
                                ...pre,
                                address: e.target.value,
                            }));
                    }}
                    rows={3}
                    readOnly={readOnly}
                    required
                    placeholder="Nhập địa chỉ nhận hàng"
                />
            </div>
            <div className={cx("wrapper-input")}>
                <label>Số điện thoại:</label>
                <input
                    type="number"
                    value={value.phone}
                    onChange={(e) => {
                        !readOnly &&
                            setValue((pre) => ({
                                ...pre,
                                phone: e.target.value,
                            }));
                    }}
                    readOnly={readOnly}
                    required
                    placeholder="Nhập số điện thoại liên lạc"
                />
            </div>
        </div>
    );
}

export default FormProfile;
