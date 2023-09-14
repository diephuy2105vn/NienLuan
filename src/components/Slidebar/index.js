import classNames from "classnames/bind";
import styles from "./Slidebar.module.scss";
import Button from "../Button";

const cx = classNames.bind(styles);

function Slidebar({ slideSmall, checked, setChecked }) {
    function handleChecked(e) {
        setChecked((pre) =>
            pre[e.target.name] === e.target.value
                ? { ...pre, [e.target.name]: "" }
                : { ...pre, [e.target.name]: e.target.value }
        );
    }

    function handlePushChecked(e) {
        const value = checked[e.target.name].find(
            (item) => item === e.target.value
        );

        if (value) {
            const newCheckedName = checked[e.target.name].filter(
                (item) => item !== e.target.value
            );
            setChecked((pre) => ({ ...pre, [e.target.name]: newCheckedName }));
            return;
        }
        setChecked((pre) => ({
            ...pre,
            [e.target.name]: [...pre[e.target.name], e.target.value],
        }));
    }

    return (
        <div className={cx("wrapper")}>
            {slideSmall && (
                <div className={cx("sb-small")}>
                    <Button small className={cx("sb-button")}>
                        Săp xếp
                        <ul>
                            <li>
                                <input
                                    type="checkbox"
                                    name="sort"
                                    value="price-ascending"
                                    checked={checked.sort === "price-ascending"}
                                    onChange={handleChecked}
                                />
                                Giá thấp
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="sort"
                                    value="price-descending"
                                    checked={
                                        checked.sort === "price-descending"
                                    }
                                    onChange={handleChecked}
                                />
                                Giá cao
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="sort"
                                    value="name-ascending"
                                    checked={checked.sort === "name-ascending"}
                                    onChange={handleChecked}
                                />
                                Tên A - Z
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="sort"
                                    value="name-descending"
                                    checked={checked.sort === "name-descending"}
                                    onChange={handleChecked}
                                />
                                Tên Z - A
                            </li>
                        </ul>
                    </Button>
                    <Button small className={cx("sb-button")}>
                        Loại
                        <ul>
                            <li>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value="Màn hình"
                                    checked={checked.types.includes("Màn hình")}
                                    onChange={handlePushChecked}
                                />
                                Màn hình
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value="Bàn phím"
                                    checked={checked.types.includes("Bàn phím")}
                                    onChange={handlePushChecked}
                                />
                                Bàn phím
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value="Chuột"
                                    checked={checked.types.includes("Chuột")}
                                    onChange={handlePushChecked}
                                />
                                Chuột
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value="CPU"
                                    checked={checked.types.includes("CPU")}
                                    onChange={handlePushChecked}
                                />
                                CPU
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value="Laptop"
                                    checked={checked.types.includes("Laptop")}
                                    onChange={handlePushChecked}
                                />
                                Laptop
                            </li>
                        </ul>
                    </Button>
                    <Button small className={cx("sb-button")}>
                        Nhu cầu
                        <ul>
                            <li>
                                <input
                                    type="checkbox"
                                    name="needs"
                                    value="Gaming"
                                    checked={checked.needs.includes("Gaming")}
                                    onChange={handlePushChecked}
                                />
                                Gaming
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="needs"
                                    value="Sinh viên - văn phòng"
                                    checked={checked.needs.includes(
                                        "Sinh viên - văn phòng"
                                    )}
                                    onChange={handlePushChecked}
                                />
                                Sinh viên - Văn phòng
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="needs"
                                    value="Thiết kế đồ họa"
                                    checked={checked.needs.includes(
                                        "Thiết kế đồ họa"
                                    )}
                                    onChange={handlePushChecked}
                                />
                                Thiết kế đồ họa
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="needs"
                                    value="Mỏng nhẹ"
                                    checked={checked.needs.includes("Mỏng nhẹ")}
                                    onChange={handlePushChecked}
                                />
                                Mỏng nhẹ
                            </li>
                        </ul>
                    </Button>
                </div>
            )}
            {!slideSmall && (
                <div className={cx("sb-large")}>
                    <div className={cx("sb-row")}>
                        <h4>Sắp xếp</h4>
                        <ul>
                            <li>
                                <input
                                    type="checkbox"
                                    name="sort"
                                    value="price-ascending"
                                    checked={checked.sort === "price-ascending"}
                                    onChange={handleChecked}
                                />
                                Giá thấp
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="sort"
                                    value="price-descending"
                                    checked={
                                        checked.sort === "price-descending"
                                    }
                                    onChange={handleChecked}
                                />
                                Giá cao
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="sort"
                                    value="name-ascending"
                                    checked={checked.sort === "name-ascending"}
                                    onChange={handleChecked}
                                />
                                Tên A - Z
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="sort"
                                    value="name-descending"
                                    checked={checked.sort === "name-descending"}
                                    onChange={handleChecked}
                                />
                                Tên Z - A
                            </li>
                        </ul>
                    </div>
                    <div className={cx("sb-row")}>
                        <h4>Loại</h4>
                        <ul>
                            <li>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value="Màn hình"
                                    checked={checked.types.includes("Màn hình")}
                                    onChange={handlePushChecked}
                                />
                                Màn hình
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value="Bàn phím"
                                    checked={checked.types.includes("Bàn phím")}
                                    onChange={handlePushChecked}
                                />
                                Bàn phím
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value="Chuột"
                                    checked={checked.types.includes("Chuột")}
                                    onChange={handlePushChecked}
                                />
                                Chuột
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value="CPU"
                                    checked={checked.types.includes("CPU")}
                                    onChange={handlePushChecked}
                                />
                                CPU
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value="Laptop"
                                    checked={checked.types.includes("Laptop")}
                                    onChange={handlePushChecked}
                                />
                                Laptop
                            </li>
                        </ul>
                    </div>
                    <div className={cx("sb-row")}>
                        <h4>Nhu cầu</h4>
                        <ul>
                            <li>
                                <input
                                    type="checkbox"
                                    name="needs"
                                    value="Gaming"
                                    checked={checked.needs.includes("Gaming")}
                                    onChange={handlePushChecked}
                                />
                                Gaming
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="needs"
                                    value="Sinh viên - văn phòng"
                                    checked={checked.needs.includes(
                                        "Sinh viên - văn phòng"
                                    )}
                                    onChange={handlePushChecked}
                                />
                                Sinh viên - Văn phòng
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="needs"
                                    value="Thiết kế đồ họa"
                                    checked={checked.needs.includes(
                                        "Thiết kế đồ họa"
                                    )}
                                    onChange={handlePushChecked}
                                />
                                Thiết kế đồ họa
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name="needs"
                                    value="Mỏng nhẹ"
                                    checked={checked.needs.includes("Mỏng nhẹ")}
                                    onChange={handlePushChecked}
                                />
                                Mỏng nhẹ
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Slidebar;
