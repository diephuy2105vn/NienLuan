import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import Banner1 from "../../assets/Banner/hinh1.jpg";
import Banner2 from "../../assets/Banner/hinh2.jpg";
import Banner3 from "../../assets/Banner/hinh3.jpg";
import Button from "../Button";
import { Link } from "react-router-dom";
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
];

const cx = classNames.bind(styles);

function Banner() {
    const [activeCard, setActiveCard] = useState();

    return (
        <Carousel data-bs-theme="dark" className={cx("banner")}>
            {items.map((item, index) => {
                return (
                    <Carousel.Item key={index}>
                        <div
                            className={cx("banner-item", {
                                right: item.position == "Right",
                            })}>
                            <div className={cx("banner-image")}>
                                <img src={item.image} alt={"Image" + index} />
                            </div>
                        </div>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
}

export default Banner;
