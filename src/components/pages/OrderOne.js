import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./OrderOne.module.scss";

import Title from "../Title";
import Button from "../Button";
import FormProfile from "../FormProfile";
import { CardInPayment } from "./Payment";
import instance from "../../axios";

const cx = classNames.bind(styles);

const OrderOne = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        name: "",
        address: "",
        phone: "",
        payment: "",
        details: [],
        totalPrice: 0,
    });
    const [isReadOnly, setIsReadOnly] = useState(true);

    const { id } = useParams();
    useEffect(() => {
        instance
            .get(`/api/order/${id}`)
            .then((res) => {
                setOrder(res.data.data);
            })
            .catch((err) => {
                navigate("/profile");
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        instance
            .post(`/order/${id}`, {})
            .then((res) => {
                navigate("/profile");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSaveOrder = (e) => {
        e.preventDefault();
        instance
            .put(`/order/${id}`, { data: order })
            .then((res) => {
                setIsReadOnly(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div className="page">
                <div className="row m-0">
                    <Title className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 p-0">
                        Thông tin đơn hàng
                    </Title>
                    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 bg-light rounded-2 p-3">
                        <div className={cx("cart")}>
                            {order.details.map((item, index) => (
                                <CardInPayment key={index} item={item} />
                            ))}
                            <p className={cx("total")}>
                                Tổng tiền:{" "}
                                {order.totalPrice.toLocaleString("de-DE")} ₫
                            </p>
                        </div>
                        <form className="w-100" onSubmit={handleSubmit}>
                            <FormProfile
                                value={order}
                                setValue={setOrder}
                                readOnly={isReadOnly}
                            />
                            <div className={cx("method")}>
                                <p>Phương thức thanh toán</p>
                                <div className={cx("wrapper-input")}>
                                    <input
                                        name="method"
                                        type="radio"
                                        value="payment-on-delivery"
                                        checked={
                                            order.payment ===
                                            "payment-on-delivery"
                                        }
                                        onChange={(e) => {
                                            !isReadOnly &&
                                                setOrder((pre) => ({
                                                    ...pre,
                                                    payment: e.target.value,
                                                }));
                                        }}
                                        readOnly={isReadOnly}
                                        required
                                    />
                                    <label>Thanh toán khi nhận hàng</label>
                                </div>
                                <div className={cx("wrapper-input")}>
                                    <input
                                        name="method"
                                        type="radio"
                                        value="payment-VNPAY"
                                        checked={
                                            order.payment === "payment-VNPAY"
                                        }
                                        onChange={(e) => {
                                            !isReadOnly &&
                                                setOrder((pre) => ({
                                                    ...pre,
                                                    payment: e.target.value,
                                                }));
                                        }}
                                        readOnly={isReadOnly}
                                        required
                                    />
                                    <label>Thanh toán qua VNPAY</label>
                                </div>
                                <div
                                    className={cx("status", {
                                        confirm: order.status === "Confirm",
                                    })}>
                                    <p>
                                        Trạng thái:{" "}
                                        {order.status === "Confirm"
                                            ? "Đã xác nhận"
                                            : "Chưa xác nhận"}
                                    </p>
                                </div>
                            </div>
                            <div className="row my-3 mx-0 justify-content-center">
                                {order.status !== "Confirm" && (
                                    <div className="col-4">
                                        {isReadOnly ? (
                                            <Button
                                                secondary
                                                className="w-100"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsReadOnly(false);
                                                }}>
                                                Cập nhật
                                            </Button>
                                        ) : (
                                            <Button
                                                secondary
                                                className="w-100"
                                                onClick={handleSaveOrder}>
                                                Lưu
                                            </Button>
                                        )}
                                    </div>
                                )}
                                <div className="col-4">
                                    <Button
                                        cancel
                                        className="w-100"
                                        to="/profile">
                                        Trở về
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderOne;
