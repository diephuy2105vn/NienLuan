/* eslint-disable react-hooks/exhaustive-deps */
import Title from "../Title";
import Button from "../Button";
import { useEffect, useState, useContext } from "react";
import AuthUserContext from "../../contexts/AuthUserContext";
import FormProfile from "../FormProfile";
import styles from "./Payment.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import instance from "../../axios";
import { getCart } from "../../reduxs/cart";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles);

export const CardInPayment = ({ item }) => {
    return (
        <div className={cx("payment-card")}>
            <div className={cx("thumbnail")}>
                <img src={item.product.urlImages[0]} alt="" />
            </div>
            <div className={cx("infor")}>
                <h3 className={cx("name")}>{item.product.name}</h3>

                <span className={cx("price")}>
                    {item.product.price.toLocaleString("de-DE")} ₫
                </span>
                <span className={cx("quantity")}>
                    Số lượng: {item.quantity}
                </span>
            </div>
        </div>
    );
};

function Payment() {
    const navigate = useNavigate();
    const { user } = useContext(AuthUserContext);
    const dispatch = useDispatch();
    const [order, setOrder] = useState({
        name: "",
        address: "",
        phone: "",
        payment: "",
        details: [],
        totalPrice: 0,
    });
    const [openModalSuccess, setOpenModalSuccess] = useState(false);
    useEffect(() => {
        const orderStorage = localStorage.getItem("Order");
        if (orderStorage) {
            const details = JSON.parse(orderStorage);
            setOrder((pre) => ({
                ...pre,
                details: details,
                totalPrice: details.reduce(
                    (accumulator, item) =>
                        accumulator + item.product.price * item.quantity,
                    0
                ),
            }));
        }
    }, [localStorage.getItem("Order")]);

    useEffect(() => {
        if (user) {
            instance.get(`/api/profile/${user._id}`).then((res) =>
                setOrder((pre) => ({
                    ...pre,
                    name: res.data.data.name,
                    address: res.data.data.address,
                    phone: res.data.data.phone,
                }))
            );
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        instance.post("/order", { data: order }).then((res) => {
            if (user) {
                dispatch(getCart(user._id));
            }
            setOpenModalSuccess(true);
        });
    };

    return (
        <>
            <div className="page">
                <div className="row m-0">
                    <Title className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 p-0">
                        Đặt hàng
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
                            <FormProfile value={order} setValue={setOrder} />
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
                                            setOrder((pre) => ({
                                                ...pre,
                                                payment: e.target.value,
                                            }));
                                        }}
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
                                            setOrder((pre) => ({
                                                ...pre,
                                                payment: e.target.value,
                                            }));
                                        }}
                                        required
                                    />
                                    <label>Thanh toán qua VNPAY</label>
                                </div>
                            </div>
                            <div className="row my-3 mx-0">
                                <div className="col-6">
                                    <Button primary className="w-100">
                                        Đặt hàng
                                    </Button>
                                </div>
                                <div className="col-6">
                                    <Button cancel className="w-100" to="/">
                                        Hủy
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {openModalSuccess && (
                <div className={cx("modal-wrapper")}>
                    <div className={cx("modal-success")}>
                        <h3 className={cx("title")}>Đặt hàng thành công</h3>
                        <div className={cx("content")}>
                            <span>
                                Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của
                                chúng tôi.
                            </span>
                        </div>
                        <div className={cx("action")}>
                            <Button
                                primary
                                onClick={(e) => {
                                    navigate("/");
                                }}>
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Payment;
