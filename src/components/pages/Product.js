import SliderImage from "../SliderImage";
import { useState, useEffect } from "react";
import Banner1 from "../../assets/Banner/hinh1.jpg";
import Banner2 from "../../assets/Banner/hinh2.jpg";
import Banner3 from "../../assets/Banner/hinh3.jpg";
import ContainerProduct from "../ContainerProduct";
import Slidebar from "../Slidebar";
import Pagination from "../Pagination";
import instance from "../../axios";

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

function Product() {
    const [currentImage, setCurrentImage] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState();
    const [checked, setChecked] = useState({ sort: "", types: [], needs: [] });
    const [windowSmall, setWindowSmall] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        if (window.innerWidth < 768) {
            setWindowSmall(true);
        } else setWindowSmall(false);
        window.addEventListener("resize", (e) => {
            if (e.target.innerWidth < 768) {
                setWindowSmall(true);
            } else setWindowSmall(false);
        });

        return () => {
            window.removeEventListener("resize", (e) => {
                if (e.target.innerWidth < 768) {
                    setWindowSmall(true);
                } else setWindowSmall(false);
            });
        };
    }, [windowSmall]);

    useEffect(() => {
        instance
            .get("/api/product", {
                params: {
                    page: currentPage,
                    sort: checked.sort,
                    types: checked.types,
                    needs: checked.needs,
                },
            })
            .then((res) => {
                setTotalPage(res.data.totalPage);
                setProducts(res.data.data);
            });
    }, [currentPage, checked]);
    return (
        <div className="page">
            <SliderImage
                items={items}
                size={3}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
            />

            <div className="my-4 row row-md-gap-3">
                <div className="col-md-2">
                    <Slidebar
                        slideSmall={windowSmall}
                        checked={checked}
                        setChecked={setChecked}
                    />
                </div>
                <div className="col-md-10">
                    <ContainerProduct
                        items={products}
                        sizeL={4}
                        sizeM={3}
                        sizeS={2}
                    />
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPage={totalPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default Product;
