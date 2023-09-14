import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from "../Icon";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import Logo from "../../assets/1zsxz9y0q.png";
import InputNumber from "../InputNumBer";
import { useRef, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button";
import { deleteDetail } from "../../reduxs/cart";
const cx = classNames.bind(styles);

export function CardInCart({ userId, item, checked, setChecked }) {
    const [value, setValue] = useState(item.quantity);
    const cardRef = useRef();
    const dispatch = useDispatch();
    return (
        <div className={cx("card")} ref={cardRef}>
            <div className={cx("select")}>
                <input
                    value={item._id}
                    checked={checked.includes(item._id)}
                    onChange={(e) => {
                        if (checked.includes(item._id)) {
                            setChecked((pre) =>
                                pre.filter((value) => value !== e.target.value)
                            );
                            return;
                        }

                        setChecked((pre) => [...pre, e.target.value]);
                    }}
                    type="checkbox"
                />
            </div>
            <div className={cx("thumbnail")}>
                <img src={item.product.urlImages[0]} alt="" />
            </div>
            <div className={cx("infor")}>
                <Link className={cx("link")} to={`/product/${item.id}`}>
                    <h5 className={cx("name")}>{item.product.name}</h5>
                </Link>
                <span className={cx("price")}>{item.product.price}</span>
                <InputNumber value={value} setValue={setValue} />
            </div>
            <div className={cx("action")}>
                <Icon
                    className={cx("btn-delete")}
                    onClick={() => {
                        dispatch(deleteDetail(userId, item));
                        cardRef.current.remove();
                    }}>
                    <AiOutlineClose />
                </Icon>
            </div>
        </div>
    );
}

function Cart({ userId, openCart, setOpenCart }) {
    const [checked, setChecked] = useState([1]);
    const handleClose = () => setOpenCart(false);
    const cart = useSelector((state) => state.cart);

    return (
        <Offcanvas
            className={cx("wrapper")}
            show={openCart}
            onHide={handleClose}
            placement="end"
            scroll={true}
            backdrop={true}>
            <div className={cx("header")}>
                <h3 className={cx("title")}>Giỏ hàng</h3>
                <Icon
                    className={cx("icon")}
                    onClick={() => {
                        handleClose();
                    }}>
                    <MdOutlineNavigateNext />
                </Icon>
            </div>
            <div className={cx("body")}>
                {cart?.details?.map((detail, index) => (
                    <CardInCart
                        userId={userId}
                        key={index}
                        item={detail}
                        checked={checked}
                        setChecked={setChecked}
                    />
                ))}
            </div>

            <div className={cx("footer")}>
                <div className={cx("footer-select")}>
                    <span>Chọn tất cả</span>
                    <input
                        onChange={() => {
                            if (checked.length === cart.details?.length) {
                                setChecked([]);
                                return;
                            }
                            const detailId = cart.details.map(
                                (detail) => detail._id
                            );
                            setChecked(detailId);
                        }}
                        checked={
                            cart.details?.length !== 0 &&
                            checked.length === cart.details?.length
                        }
                        type="checkbox"></input>
                </div>
                <Button
                    large
                    primary
                    className={cx("footer-btn")}
                    disabled={checked.length === 0}>
                    Mua hàng
                </Button>
            </div>
        </Offcanvas>
    );
}

export default Cart;
