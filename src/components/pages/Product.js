import SliderImage from "../SliderImage";
import { useState, useEffect } from "react";
import Banner5 from "../../assets/Banner/hinh5.jpg";
import Banner6 from "../../assets/Banner/hinh6.jpg";
import Banner7 from "../../assets/Banner/hinh7.jpg";
import Banner8 from "../../assets/Banner/hinh8.jpg";
import { useLocation } from "react-router-dom";
import ContainerProduct from "../ContainerProduct";
import Slidebar from "../Slidebar";
import Pagination from "../Pagination";
import instance from "../../axios";
import { slidebarProduct } from "../../assets/Slidebar";
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

function Product() {
    const [currentImage, setCurrentImage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState();
    const [windowSmall, setWindowSmall] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [checked, setChecked] = useState({
        sort: "",
        types: [],
        needs: [],
    });
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
        const query = {
            sort: queryParams.get("sort") ? queryParams.get("sort") : "",
            types: queryParams.get("types") ? [queryParams.get("types")] : [],
            needs: queryParams.get("needs") ? [queryParams.get("sort")] : [],
        };
        setChecked(query);
    }, [location]);
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
    }, [currentPage, checked, location]);

    return (
        <div className="page">
            <SliderImage
                items={items}
                size={4}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
            />

            <div className="my-4 row row-md-gap-3">
                <div className="col-md-2">
                    <Slidebar
                        items={slidebarProduct}
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
