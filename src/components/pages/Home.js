import { useEffect, useState } from "react";

import Banner from "../Banner";
import Title from "../Title";
import ContainerProduct from "../ContainerProduct";
import SliderImage from "../SliderImage";
import ListType from "../ListType";
import { BsKeyboard, BsMouse, BsLaptop, BsCpu } from "react-icons/bs";
import { CgScreen } from "react-icons/cg";

import Banner5 from "../../assets/Banner/hinh5.jpg";
import Banner6 from "../../assets/Banner/hinh6.jpg";
import Banner7 from "../../assets/Banner/hinh7.jpg";
import Banner8 from "../../assets/Banner/hinh8.jpg";
import instance from "../../axios";

const types = [
    {
        title: "Screen",
        icon: <CgScreen />,
        value: "Màn hình",
    },
    {
        title: "Keyboard",
        icon: <BsKeyboard />,
        value: "Bàn phím",
    },
    {
        title: "Mouse",
        icon: <BsMouse />,
        value: "Chuột",
    },
    {
        title: "CPU",
        icon: <BsCpu />,
        value: "CPU",
    },
    {
        title: "Laptop",
        icon: <BsLaptop />,
        value: "Laptop",
    },
];
const items = [
    {
        image: Banner5,
        to: "/product?types=CPU",
    },
    {
        image: Banner6,
        to: "/product?types=Chuột",
    },
    {
        image: Banner7,
        to: "/product?types=Màn hình",
    },
    {
        image: Banner8,
        to: "/product?types=Bàn phím",
    },
    {
        image: Banner5,
        to: "/product?types=CPU",
    },

    {
        image: Banner6,
        to: "/product?types=Chuột",
    },
    {
        image: Banner7,
        to: "/product?types=Màn hình",
    },
    {
        image: Banner8,
        to: "/product?types=Bàn phím",
    },
];

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const [type, setType] = useState(types[0].value);
    const [productTrends, setProductTrends] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    useEffect(() => {
        instance
            .get("/api/product", {
                params: {
                    size: 10,
                },
            })
            .then((res) => {
                setProductTrends(res.data.data);
            });
    }, []);

    useEffect(() => {
        instance
            .get("/api/product", {
                params: {
                    types: type,
                    size: 10,
                },
            })
            .then((res) => {
                setProductTypes(res.data.data);
            });
    }, [type]);
    return (
        <div className="page">
            <Banner />
            <div className="my-4">
                <Title>Sản phẩm nổi bật</Title>
                <ContainerProduct
                    items={productTrends}
                    sizeS={2}
                    sizeM={3}
                    sizeL={5}
                />
            </div>
            <SliderImage
                items={items}
                size={4}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
            />
            <div className="my-4">
                <ListType items={types} title={type} setTitle={setType} />
                <ContainerProduct
                    items={productTypes}
                    sizeS={2}
                    sizeM={3}
                    sizeL={5}
                />
            </div>
        </div>
    );
};

export default Home;
