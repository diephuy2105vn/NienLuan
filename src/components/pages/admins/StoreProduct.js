import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import Pagination from "../../Pagination";
import instance from "../../../axios";
import styles from "./StoreProduct.module.scss";
import Slidebar from "../../Slidebar";
import Button from "../../Button";
import Title from "../../Title";
const cx = classNames.bind(styles);

function StoreProduct() {
    const itemsRef = useRef([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [product, setProduct] = useState([]);
    const [checkedSlidebar, setCheckedSlidebar] = useState({
        sort: "",
        types: [],
        needs: [],
    });
    const [checkedProduct, setCheckedProduct] = useState([]);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const handleDeleteProduct = () => {
        console.log(checkedProduct);
        instance
            .delete("/product/delete", {
                data: { ids: checkedProduct },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        itemsRef.current.forEach(
            (item) => checkedProduct.includes(item.dataset.id) && item.remove()
        );
    };
    useLayoutEffect(() => {
        instance.get(`/api/product`).then((res) => {
            setTotalPage(res.data.totalPage);
        });
    }, []);
    useEffect(() => {
        instance
            .get(`/api/product`, {
                params: {
                    page: currentPage,
                    sort: checkedSlidebar.sort,
                    types: checkedSlidebar.types,
                    needs: checkedSlidebar.needs,
                },
            })
            .then((res) => {
                setProduct(res.data.data);
            });
    }, [currentPage, checkedSlidebar]);
    return (
        <>
            <div className="page">
                <Title>Store Product</Title>
                <div className="mb-2">
                    <Slidebar
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
                            <th className="col-6 text-center">Tên sản phẩm</th>
                            <th className="col-2 text-center">Giá</th>
                            <th className="col-2 text-center">Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((item, index) => (
                            <tr
                                key={index}
                                data-id={item._id}
                                ref={(e) => (itemsRef.current[index] = e)}>
                                <td className="text-center">
                                    <input
                                        checked={checkedProduct.includes(
                                            item._id
                                        )}
                                        onChange={(e) =>
                                            checkedProduct.includes(item._id)
                                                ? setCheckedProduct((pre) =>
                                                      pre.filter(
                                                          (item) =>
                                                              item !==
                                                              e.target.value
                                                      )
                                                  )
                                                : setCheckedProduct((pre) => [
                                                      ...pre,
                                                      e.target.value,
                                                  ])
                                        }
                                        value={item._id}
                                        type="checkbox"
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                    <Link
                                        to={`/admin/product/${item._id}`}
                                        className={" " + cx("name")}>
                                        {item.name}
                                    </Link>
                                </td>
                                <td className="text-center">
                                    {item.price.toLocaleString("de-DE")} ₫
                                </td>
                                <td className="text-center">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={cx("action")}>
                    <Button primary small to="/admin/product/create">
                        Thêm sản phẩm
                    </Button>

                    <Button
                        cancel
                        small
                        disabled={checkedProduct.length <= 0}
                        onClick={(e) => setOpenModalDelete(true)}>
                        Xóa sản phẩm
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
                    <div className={cx("modal-delete")}>
                        <h3 className={cx("title")}>Xác nhận xóa sản phẩm</h3>
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
                                    handleDeleteProduct();
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

export default StoreProduct;
