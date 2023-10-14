import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import Pagination from "../../Pagination";
import instance from "../../../axios";
import styles from "./admin.module.scss";
import Slidebar from "../../Slidebar";
import Button from "../../Button";
import Title from "../../Title";
import { slidebarOrder } from "../../../assets/Slidebar";
import useDate from "../../../hooks/useDate";

const cx = classNames.bind(styles);

function StoreOrder() {
    const { toDateString } = useDate();
    const itemsRef = useRef([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [orders, setOrders] = useState([]);
    const [checkedSlidebar, setCheckedSlidebar] = useState({
        sort: "",
        status: "",
    });
    const [checkedOrder, setCheckedOrder] = useState([]);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    useEffect(() => {
        instance
            .get("/api/order", {
                params: {
                    sort: checkedSlidebar.sort,
                    status: checkedSlidebar.status,
                },
            })
            .then((res) => {
                setCurrentPage(1);
                setTotalPage(res.data.totalPage);
                setOrders(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [currentPage, checkedSlidebar]);
    const handleDeleteOrder = () => {
        console.log(checkedOrder);
        instance
            .delete("/order/delete", { data: { ids: checkedOrder } })
            .then((res) => {
                itemsRef.current.forEach(
                    (item) =>
                        checkedOrder.includes(item.dataset.id) && item.remove()
                );
                setOpenModalDelete(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="page">
                <Title>Store Order</Title>
                <div className="mb-2">
                    <Slidebar
                        items={slidebarOrder}
                        slideSmall={true}
                        checked={checkedSlidebar}
                        setChecked={setCheckedSlidebar}
                    />
                </div>
                <table className="table table-lights table-bordered">
                    <thead className="table-primary">
                        <tr>
                            <th className="col-1"></th>
                            <th className="col-1 text-center">ID</th>
                            <th className="col-4 text-center">
                                Tên khách hàng
                            </th>
                            <th className="col-2 text-center">Số điện thoại</th>
                            <th className="col-2 text-center">Ngày đặt</th>
                            <th className="col-2 text-center">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                data-id={order._id}
                                ref={(e) => (itemsRef.current[index] = e)}>
                                <td className="text-center">
                                    <input
                                        checked={checkedOrder.includes(
                                            order._id
                                        )}
                                        onChange={(e) =>
                                            checkedOrder.includes(order._id)
                                                ? setCheckedOrder((pre) =>
                                                      pre.filter(
                                                          (item) =>
                                                              item !==
                                                              e.target.value
                                                      )
                                                  )
                                                : setCheckedOrder((pre) => [
                                                      ...pre,
                                                      e.target.value,
                                                  ])
                                        }
                                        value={order._id}
                                        type="checkbox"
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td className="text-center">{order.name}</td>
                                <td className="text-center">{order.phone}</td>
                                <td className="text-center">
                                    {toDateString(order.dateCreate)}
                                </td>
                                <td className="text-center">
                                    <Link
                                        to={`/admin/order/${order._id}`}
                                        className={"text-center " + cx("link")}>
                                        Xem chi tiết
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={cx("action")}>
                    <Button
                        cancel
                        small
                        disabled={checkedOrder.length <= 0}
                        onClick={(e) => setOpenModalDelete(true)}>
                        Xóa Đơn Đặt Hàng
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
                        <h3 className={cx("title")}>Xác nhận xóa đơn hàng</h3>
                        <div className={cx("content")}>
                            <span>
                                Hành động này không thể khôi phục, xác nhận xóa?
                            </span>
                        </div>
                        <div className={cx("action")}>
                            <Button cancel small onClick={handleDeleteOrder}>
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

export default StoreOrder;
