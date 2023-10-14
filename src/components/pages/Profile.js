import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Button from "../Button";
import { FaCrown } from "react-icons/fa";
import FormProfile from "../FormProfile";
import { useEffect, useState, useContext } from "react";
import AuthUserContext from "../../contexts/AuthUserContext";
import instance from "../../axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const CardOrder = ({ item }) => {
    return (
        <div className={cx("card")}>
            <div className={cx("card-content")}>
                <div className={cx("thumbnail")}>
                    <img src={item.details[0]?.product.urlImages[0]} alt="" />
                </div>
                <div className={cx("detail")}>
                    <h2 className={cx("title")}>Chi tiết</h2>
                    <h3 className={cx("name")}>
                        {item.details[0]?.product.name}
                    </h3>
                    <p className={cx("text")}>
                        Số lượng: {item.details[0].quantity}
                    </p>
                    <p className={cx("text")}>...</p>
                </div>
                <div className={cx("infor")}>
                    <h2 className={cx("title")}>Thông tin giao hàng</h2>
                    <h3 className={cx("name")}>{item.name}</h3>
                    <p className={cx("text")}>
                        <span className="d-none d-md-inline">Tổng tiền: </span>
                        {item.totalPrice.toLocaleString("de-DE")} ₫
                    </p>
                    <p
                        className={cx("status", {
                            confirm: item.status === "Confirm",
                        })}>
                        {item.status === "Confirm"
                            ? "Đã xác nhận"
                            : "Chưa xác nhận"}
                    </p>
                </div>
            </div>
            <Link className={cx("link")} to={`/profile/order/${item._id}`}>
                Xem chi tiết đơn hàng
            </Link>
        </div>
    );
};

const Profile = () => {
    const navigate = useNavigate();
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [content, setContent] = useState("infor");
    const [orders, setOrders] = useState([]);
    const [profile, setProfile] = useState({
        name: "",
        address: "",
        phone: "",
    });
    const { user } = useContext(AuthUserContext);
    useEffect(() => {
        if (isFirstLoading) {
            setIsFirstLoading(false);
        }
        if (user) {
            if (content === "infor") {
                instance.get(`/api/profile/${user._id}`).then((res) => {
                    setProfile((pre) => ({
                        name: res.data.data.name,
                        address: res.data.data.address,
                        phone: res.data.data.phone,
                    }));
                });
            }
            if (content === "order") {
                instance.get(`/api/profile/order/${user._id}`).then((res) => {
                    setOrders(res.data.data);
                });
            }
        }
        if (!isFirstLoading && !user) {
            navigate("/");
        }
    }, [content, user]);

    useEffect(() => {
        console.log(orders);
    }, [orders]);

    const handleSaveProfile = () => {
        instance
            .post(`/profile/${user._id}`, {
                data: profile,
            })
            .then((res) => {
                setIsReadOnly(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="page">
            <div className={cx("avatar")}>
                <div className={cx("thumbnail")}>
                    <img src={user?.urlAvatar} alt="" />
                    {user?.role > 1 && (
                        <div className={cx("icon-admin")}>
                            <FaCrown />
                        </div>
                    )}
                </div>
                <div className={cx("infor")}>
                    <h2 className={cx("name")}>{user?.username}</h2>
                    <p
                        className={cx("rank", {
                            admin: user?.role === 3,
                        })}>
                        {user?.role === 1 ? "Thành viên" : "Admin"}
                    </p>
                </div>
            </div>

            <div className={cx("nav")}>
                <Button
                    className={cx("nav-item", {
                        active: content === "infor",
                    })}
                    onClick={(e) => setContent("infor")}>
                    Thông tin
                </Button>
                <Button
                    className={cx("nav-item", {
                        active: content === "order",
                    })}
                    onClick={(e) => setContent("order")}>
                    Đơn hàng
                </Button>
            </div>
            <div className={cx("content")}>
                {content === "infor" && (
                    <div className={cx("content-infor")}>
                        <FormProfile
                            value={profile}
                            setValue={setProfile}
                            readOnly={isReadOnly}
                        />
                        <div className={cx("action")}>
                            {isReadOnly ? (
                                <Button
                                    secondary
                                    onClick={() => setIsReadOnly(false)}>
                                    Cập nhật
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        secondary
                                        onClick={handleSaveProfile}>
                                        Lưu
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}
                {content === "order" && (
                    <div className={cx("content-order")}>
                        {orders?.map((order, index) => (
                            <CardOrder key={index} item={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
