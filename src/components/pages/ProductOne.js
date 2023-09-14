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

const cx = classNames.bind(styles);

function ProductOne() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { user } = useContext(AuthUserContext);
    const [currentImage, setCurrentImage] = useState(0);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    useEffect(() => {
        instance(`/api/product/${id}`).then((res) => {
            setProduct(res.data.data);
        });
    }, [id]);
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
                            <Button large primary>
                                Mua Hàng
                            </Button>
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
                        </div>
                        <ul className={cx("description")}>
                            Mô tả sản phẩm
                            <li>
                                <span>Màn hình:</span> 14.0 inch, 1920 x 1080
                                Pixels, IPS, 60 Hz, 250 nits, LCD
                            </li>
                            <li>
                                <span>CPU:</span> AMD, Ryzen 5, 5625U
                            </li>
                            <li>
                                <span>RAM:</span> 8 GB (1 thanh 8 GB), DDR4,
                                3200 MHz
                            </li>
                            <li>
                                <span>CPU:</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductOne;
