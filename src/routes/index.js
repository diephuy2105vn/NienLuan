/* eslint-disable import/no-anonymous-default-export */

import Home from "../components/pages/Home";
import Product from "../components/pages/Product";
import About from "../components/pages/About";
import Payment from "../components/pages/Payment";
import ProductOne from "../components/pages/ProductOne";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import CreateProduct from "../components/pages/admins/CreateProduct";
import UpdateProduct from "../components/pages/admins/UpdateProduct";
import StoreProduct from "../components/pages/admins/StoreProduct";
const publicRoutes = [
    {
        path: "/",
        element: Home,
    },
    {
        path: "/product",
        element: Product,
    },
    {
        path: "/product/:id",
        element: ProductOne,
    },
    {
        path: "/about",
        element: About,
    },
    {
        path: "/payment",
        element: Payment,
    },
    {
        path: "/login",
        element: Login,
    },
    {
        path: "/register",
        element: Register,
    },
    {
        path: "/admin/product/create",
        element: CreateProduct,
    },
    {
        path: "/admin/product/:id",
        element: UpdateProduct,
    },
    {
        path: "/admin/product",
        element: StoreProduct,
    },
];

export default publicRoutes;
