/* eslint-disable import/no-anonymous-default-export */

import Home from "../components/pages/Home";
import Product from "../components/pages/Product";
import Promotion from "../components/pages/Promotion";
import Payment from "../components/pages/Payment";
import ProductOne from "../components/pages/ProductOne";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Profile from "../components/pages/Profile";
import CreateProduct from "../components/pages/admins/CreateProduct";
import UpdateProduct from "../components/pages/admins/UpdateProduct";
import StoreProduct from "../components/pages/admins/StoreProduct";
import StoreOrder from "../components/pages/admins/StoreOrder";
import OrderOneAdmin from "../components/pages/admins/OrderOneAdmin";
import OrderOne from "../components/pages/OrderOne";
import StoreAccount from "../components/pages/admins/StoreAccount";

export const publicRoutes = [
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
        path: "/promotion",
        element: Promotion,
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
];

export const privateRoutes = [
    ...publicRoutes,
    {
        path: "/profile",
        element: Profile,
    },
    {
        path: "/profile/order/:id",
        element: OrderOne,
    },
];

export const adminRoutes = [
    ...privateRoutes,
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
    {
        path: "/admin/order",
        element: StoreOrder,
    },
    {
        path: "/admin/order/:id",
        element: OrderOneAdmin,
    },
    {
        path: "/admin/account",
        element: StoreAccount,
    },
];
