import classNames from "classnames/bind";
import styles from "./ProductOne.module.scss";
import SliderImage from "../SliderImage";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "../Button";
import instance from "../../axios";
import InputNumber from "../InputNumBer";
import AuthUserContext from "../../contexts/AuthUserContext";
import { useDispatch, useSelector } from "react-redux";
import { addDetail } from "../../reduxs/cart";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function ProductOne() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { user } = useContext(AuthUserContext);
    const [currentImage, setCurrentImage] = useState(0);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    useEffect(() => {
        setQuantity(1);
        instance(`/api/product/${id}`).then((res) => {
            setProduct(res.data.data);
        });
    }, [id]);

    const handleBuyProduct = () => {
        const order = [
            {
                product: product,
                quantity: quantity,
            },
        ];
        localStorage.setItem("Order", JSON.stringify(order));
        navigate("/payment");
    };

    return (
        <div className="page">
            <div className="row">
                <div className="col-md-6 mb-4 ">
                    <div className={cx("thumbnail")}>
                        <SliderImage
                            size={1}
                            items={product.urlImages || []}
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                        />

                        <div className={cx("thumbnail-action")}>
                            {product.urlImages?.map((item, index) => (
                                <img
                                    src={item}
                                    key={index}
                                    className={cx("", {
                                        active: index === currentImage,
                                    })}
                                    alt=""
                                    onClick={() => {
                                        setCurrentImage(index);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-6  ">
                    <div className={cx("infor")}>
                        <h2 className={cx("name")}>{product.name}</h2>
                        <span className={cx("price")}>
                            {product.price?.toLocaleString("de-DE")} ₫
                        </span>
                        <div className={cx("quantity")}>
                            <InputNumber
                                value={quantity}
                                setValue={setQuantity}
                                maxValue={product.quantity}
                            />
                            <p>Số lượng còn lại: {product.quantity} sản phẩm</p>
                        </div>
                        <div className={cx("action")}>
                            <Button large primary onClick={handleBuyProduct}>
                                Mua Hàng
                            </Button>
                            {user && (
                                <Button
                                    large
                                    outline
                                    onClick={() =>
                                        dispatch(
                                            addDetail(user._id, {
                                                product: product,
                                                quantity: quantity,
                                            })
                                        )
                                    }>
                                    Thêm Giỏ Hàng
                                </Button>
                            )}
                        </div>
                        <div className={cx("description")}>
                            <p> Mô tả sản phẩm</p>
                            <span>{product.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductOne;
