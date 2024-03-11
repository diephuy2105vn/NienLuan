import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import Pagination from "../../Pagination";
import instance from "../../../axios";
import styles from "./admin.module.scss";
import Button from "../../Button";
import Title from "../../Title";

const cx = classNames.bind(styles);

function StoreAccount() {
    const itemsRef = useRef([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [account, setAccount] = useState([]);

    const [checkedAccount, setCheckedAccount] = useState([]);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const handleDeleteAccount = () => {
        console.log(checkedAccount);
        instance
            .delete("/account/delete", {
                data: { ids: checkedAccount },
            })
            .then((res) => {
                console.log(res);
                itemsRef.current.forEach(
                    (item) =>
                        checkedAccount.includes(item.dataset.id) &&
                        item.remove()
                );
                setOpenModalDelete(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        instance.get(`/api/account`).then((res) => {
            // setTotalPage(res.data.totalPage);
            setAccount(res.data.data);
        });
    }, [currentPage]);
    return (
        <>
            <div className="page">
                <Title>Store Account</Title>

                <table className="table table-lights table-bordered">
                    <thead className="table-primary">
                        <tr>
                            <th className="col-1"></th>
                            <th className="col-1 text-center">STT</th>
                            <th className="col-4 text-center">Tên tài khoản</th>
                            <th className="col-2 text-center">Phương thức</th>
                            <th className="col-2 text-center">Chức vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {account.map((item, index) => (
                            <tr
                                key={index}
                                data-id={item._id}
                                ref={(e) => (itemsRef.current[index] = e)}>
                                <td className="text-center">
                                    <input
                                        checked={checkedAccount.includes(
                                            item._id
                                        )}
                                        onChange={(e) =>
                                            checkedAccount.includes(item._id)
                                                ? setCheckedAccount((pre) =>
                                                      pre.filter(
                                                          (item) =>
                                                              item !==
                                                              e.target.value
                                                      )
                                                  )
                                                : setCheckedAccount((pre) => [
                                                      ...pre,
                                                      e.target.value,
                                                  ])
                                        }
                                        value={item._id}
                                        type="checkbox"
                                    />
                                </td>
                                <td className="text-center">{index + 1}</td>
                                <td>
                                    <Link
                                        to={`/admin/account/${item._id}`}
                                        className={cx("link")}>
                                        {item.username}
                                    </Link>
                                </td>
                                <td className="text-center">{item.provider}</td>
                                <td className="text-center">
                                    {item.role >= 3
                                        ? "Quản trị"
                                        : item.role == 2
                                        ? "Nhân viên"
                                        : "Khách hàng"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={cx("action")}>
                    <Button primary small to="/register">
                        Thêm tài khoản
                    </Button>

                    <Button
                        cancel
                        small
                        disabled={checkedAccount.length <= 0}
                        onClick={(e) => setOpenModalDelete(true)}>
                        Xóa tài khoản
                    </Button>
                </div>
                <Pagination
                    totalPage={totalPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            {openModalDelete && (
                <div className={cx("modal-wrapper")}>
                    <div className={cx("modal-content")}>
                        <h3 className={cx("title")}>Xác nhận xóa tài khoản</h3>
                        <div className={cx("content")}>
                            <span>
                                Hành động này không thể khôi phục, xác nhận xóa?
                            </span>
                        </div>
                        <div className={cx("action")}>
                            <Button
                                cancel
                                small
                                onClick={() => {
                                    handleDeleteAccount();
                                }}>
                                Xác nhận
                            </Button>
                            <Button
                                primary
                                small
                                onClick={() => setOpenModalDelete(false)}>
                                Hủy bỏ
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default StoreAccount;
