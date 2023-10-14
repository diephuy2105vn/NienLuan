import Title from "../../Title";
import { useState } from "react";
import instance from "../../../axios";
import Button from "../../Button";
import useFormData from "../../../hooks/useFormData";

import { useNavigate } from "react-router-dom";

function CreateProduct() {
    const [data, setData] = useState({
        name: "",
        price: "",
        quantity: "",
        description: "",
        type: "",
        need: "",
        urlImages: [],
        images: [],
    });
    const { createFormData } = useFormData();
    const navigate = useNavigate();
    function handleSubmitForm(e) {
        e.preventDefault();
        if (data.urlImages.length <= 0) {
            alert("Vui lòng chọn hình ảnh");
            return;
        }
        const formData = createFormData(data);
        instance
            .post("/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    }

    const handleImageChange = (e) => {
        if (e.target.files) {
            setData((pre) => ({ ...pre, images: [...e.target.files] }));
            const urlImages = [...e.target.files].map((file) =>
                URL.createObjectURL(file)
            );
            setData((pre) => ({ ...pre, urlImages: urlImages }));
        }
    };

    return (
        <div className="page">
            <Title>Create Product</Title>
            <form
                className="bg-light py-3 px-sm-5 px-3 rounded-3 shadow"
                onSubmit={handleSubmitForm}>
                <div className="row my-3 mx-0">
                    <label className="col-12 col-sm-2 text-body d-flex align-items-center justify-content-sm-end">
                        Tên sản phẩm:
                    </label>
                    <input
                        required
                        value={data.name}
                        onChange={(e) => {
                            setData((pre) => ({
                                ...pre,
                                name: e.target.value,
                            }));
                        }}
                        className="col-12  col-sm-10 p-3 rounded-2 shadow-sm my-2 "
                        placeholder="Nhập tên sản phẩm"
                    />
                </div>
                <div className="row my-3 mx-0">
                    <label className=" col-12 col-sm-2 text-body d-flex align-items-center justify-content-sm-end">
                        Giá:
                    </label>
                    <input
                        required
                        value={data.price}
                        onChange={(e) => {
                            if (e.target.value >= 0) {
                                setData((pre) => ({
                                    ...pre,
                                    price: e.target.value,
                                }));
                            }
                        }}
                        type="number"
                        placeholder="Nhập giá sản phẩm"
                        className="col-12 col-sm-4 p-3 rounded-2 shadow-sm my-2"
                    />
                    <label className="col-12 col-sm-2 text-body d-flex align-items-center justify-content-sm-end">
                        Số lượng:
                    </label>
                    <input
                        required
                        value={data.quantity}
                        onChange={(e) => {
                            if (e.target.value >= 0) {
                                setData((pre) => ({
                                    ...pre,
                                    quantity: e.target.value,
                                }));
                            }
                        }}
                        type="number"
                        placeholder="Nhập số lượng sản phẩm"
                        className="col-12 col-sm-4 p-3 rounded-2 shadow-sm my-2 "
                    />
                </div>

                <div className="row my-3 mx-0">
                    <label className="col-12 col-sm-2 text-body d-flex align-items-center justify-content-sm-end">
                        Giới thiệu:
                    </label>
                    <textarea
                        required
                        value={data.description}
                        onChange={(e) => {
                            setData((pre) => ({
                                ...pre,
                                description: e.target.value,
                            }));
                        }}
                        rows={3}
                        className="col-12 col-sm-10 p-3 rounded-2 shadow-sm border-0 my-2"
                        placeholder=" Nhập mô tả sản phẩm"></textarea>
                </div>
                <div className="row my-3 mx-0">
                    <label className="col-12 col-sm-2 text-body d-flex align-items-center justify-content-sm-end">
                        Loại
                    </label>
                    <select
                        required
                        className="col-12 col-sm-4 p-3 rounded-2 shadow-sm border-0 my-2 "
                        value={data.type}
                        onChange={(e) => {
                            setData((pre) => ({
                                ...pre,
                                type: e.target.value,
                            }));
                        }}>
                        <option disabled value="">
                            --Chọn loại--
                        </option>
                        <option value="Màn hình">Màn hình</option>
                        <option value="Bàn phím">Bàn phím</option>
                        <option value="Chuột">Chuột</option>
                        <option value="CPU">CPU</option>
                        <option value="Laptop">Laptop</option>
                    </select>
                    <label className="col-12 col-sm-2 text-body d-flex align-items-center justify-content-sm-end">
                        Nhu cầu:
                    </label>
                    <select
                        required
                        className="col-12 col-sm-4 p-3 rounded-2 shadow-sm border-0 my-2 "
                        value={data.need}
                        onChange={(e) => {
                            setData((pre) => ({
                                ...pre,
                                need: e.target.value,
                            }));
                        }}>
                        <option disabled value="">
                            --Chọn nhu cầu--
                        </option>
                        <option value="Gaming">Gaming</option>
                        <option value="Sinh viên - văn phòng">
                            Sinh viên - văn phòng
                        </option>
                        <option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
                        <option value="Mỏng nhẹ">Mỏng nhẹ</option>
                    </select>
                </div>
                <div className="row my-3 mx-0">
                    <label className="col-12 col-sm-2 text-body d-flex align-items-center justify-content-sm-end">
                        Hình ảnh:
                    </label>
                    <input
                        className="col-12 col-sm-4 rounded-2 shadow-sm border-0 my-2 text-body"
                        multiple
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <div className="row my-3 mx-0 row-offset-sm-2">
                        {data.urlImages.map((image, index) => (
                            <div
                                key={index}
                                className={
                                    (index === 0 ? "offset-sm-2 " : "") +
                                    "col-3 col-sm-2"
                                }>
                                <img
                                    src={image}
                                    alt="Đây là ảnh "
                                    className="w-100"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row mx-0 ">
                    <div className="col-6 col-sm-3 offset-sm-3 ps-0">
                        <Button primary className="w-100">
                            Tạo sản phẩm
                        </Button>
                    </div>
                    <div className="col-6 col-sm-3 pe-0">
                        <Button
                            cancel
                            className="w-100"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/admin/product");
                            }}>
                            Huỷ bỏ
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateProduct;
