import classNames from "classnames/bind";
import styles from "./Slidebar.module.scss";
import Button from "../Button";

const cx = classNames.bind(styles);

function Slidebar({ items, slideSmall, checked, setChecked }) {
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
                    {items.map((item, index) => (
                        <Button key={index} small className={cx("sb-button")}>
                            {item.title}
                            <ul>
                                {item.list.map((li, index) => (
                                    <li key={index}>
                                        <input
                                            type="checkbox"
                                            name={item.name}
                                            value={li.value}
                                            checked={
                                                item.checkedMultiple
                                                    ? checked[
                                                          item.name
                                                      ].includes(li.value)
                                                    : checked[item.name] ==
                                                      li.value
                                            }
                                            onChange={(e) => {
                                                item.checkedMultiple
                                                    ? handlePushChecked(e)
                                                    : handleChecked(e);
                                            }}
                                        />
                                        {li.title}
                                    </li>
                                ))}
                            </ul>
                        </Button>
                    ))}
                </div>
            )}
            {!slideSmall && (
                <div className={cx("sb-large")}>
                    {items.map((item) => (
                        <div className={cx("sb-row")}>
                            <h4>{item.title}</h4>
                            <ul>
                                {item.list.map((li) => (
                                    <li>
                                        <input
                                            type="checkbox"
                                            name={item.name}
                                            value={li.value}
                                            checked={
                                                item.checkedMultiple
                                                    ? checked[
                                                          item.name
                                                      ].includes(li.value)
                                                    : checked[item.name] ==
                                                      li.value
                                            }
                                            onChange={(e) => {
                                                item.checkedMultiple
                                                    ? handlePushChecked(e)
                                                    : handleChecked(e);
                                            }}
                                        />
                                        {li.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Slidebar;
