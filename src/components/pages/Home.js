import { useEffect, useState } from "react";

import Banner from "../Banner";
import Title from "../Title";
import ContainerProduct from "../ContainerProduct";
import SliderImage from "../SliderImage";
import ListType from "../ListType";
import { BsKeyboard, BsMouse, BsLaptop } from "react-icons/bs";
import { CgScreen } from "react-icons/cg";
import { PiComputerTowerBold } from "react-icons/pi";
import Banner1 from "../../assets/Banner/hinh1.jpg";
import Banner2 from "../../assets/Banner/hinh2.jpg";
import Banner3 from "../../assets/Banner/hinh3.jpg";
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
        icon: <PiComputerTowerBold />,
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
        image: Banner1,
        to: "",
    },

    {
        image: Banner2,
        to: "",
    },
    {
        image: Banner3,
        to: "",
    },
    {
        image: Banner1,
        to: "",
    },

    {
        image: Banner2,
        to: "",
    },
    {
        image: Banner3,
        to: "",
    },
];

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const [type, setType] = useState(types[0].value);
    const [productTrends, setProductTrends] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    useEffect(() => {
        instance.get("/api/product", {}).then((res) => {
            setProductTrends(res.data.data);
        });
    }, []);

    useEffect(() => {
        instance
            .get("/api/product", {
                params: {
                    types: type,
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
                    sizeL={4}
                />
            </div>
            <SliderImage
                items={items}
                size={3}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
            />
            <div className="my-4">
                <ListType items={types} title={type} setTitle={setType} />
                <ContainerProduct
                    items={productTypes}
                    sizeS={2}
                    sizeM={3}
                    sizeL={4}
                />
            </div>
        </div>
    );
};

export default Home;
