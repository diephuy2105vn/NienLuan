import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "../Button";
import Logo from "../../assets/Logo.png";
import { BsList, BsCart } from "react-icons/bs";
import { useState, useLayoutEffect } from "react";
import Icon from "../Icon";
import { AiOutlineUser } from "react-icons/ai";
import Search from "../Search";
import { Link } from "react-router-dom";
import Cart from "../Cart";
import { useContext } from "react";
import AuthUserContext from "../../contexts/AuthUserContext";
import { useCookies } from "react-cookie";
const cx = classNames.bind(styles);

function Header() {
    const [windowSmall, setWindowSmall] = useState(false);
    const [showInput, setShowInput] = useState(true);
    const [openCart, setOpenCart] = useState(false);
    const { user, setUser, logout } = useContext(AuthUserContext);

    const [cookies, setCookies, removeCookies] = useCookies();
    const handleLogout = () => {
        logout()
            .then((res) => {
                setUser();
                removeCookies("accessToken");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useLayoutEffect(() => {
        function handleResizeWindow() {
            if (window.innerWidth < 576) {
                setShowInput(false);
                setWindowSmall(true);
            } else {
                setShowInput(true);
                setWindowSmall(false);
            }
        }

        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);
    return (
        <>
            <div className={cx("wrapper")}>
                {(!windowSmall || !showInput) && (
                    <div className={cx("logo")}>
                        <img src={Logo} alt="Logo" />
                    </div>
                )}
                <div className={cx("search")}>
                    <Search
                        showInput={showInput}
                        setShowInput={setShowInput}
                        windowSmall={windowSmall}
                    />
                </div>
                {(!windowSmall || !showInput) && (
                    <div className={cx("nav")}>
                        <Icon className={cx("icon-list")}>
                            <BsList />
                            <ul className={cx("list-menu")}>
                                <li>
                                    <Button className={cx("link")} to="/">
                                        Home
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        className={cx("link")}
                                        to="/product">
                                        Product
                                    </Button>
                                </li>
                                <li>
                                    <Button className={cx("link")} to="/about">
                                        About Us
                                    </Button>
                                </li>
                                {!user && (
                                    <>
                                        <li>
                                            <Button
                                                className={cx("link")}
                                                primary
                                                to="/about">
                                                Đăng nhập
                                            </Button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </Icon>

                        <ul className={cx("list-link")}>
                            <li className={cx("wrapper-link")}>
                                <Button small className={cx("link")} to="/">
                                    Home
                                </Button>
                            </li>
                            <li className={cx("wrapper-link")}>
                                <Button
                                    small
                                    className={cx("link")}
                                    to="/product">
                                    Product
                                </Button>
                            </li>
                            <li className={cx("wrapper-link")}>
                                <Button
                                    small
                                    className={cx("link")}
                                    to="/about">
                                    About Us
                                </Button>
                            </li>
                            {!user && (
                                <>
                                    <li>
                                        <Button
                                            className={cx("link")}
                                            to="/login"
                                            primary>
                                            Login
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            className={cx("link")}
                                            to="/register"
                                            outline>
                                            Register
                                        </Button>
                                    </li>
                                </>
                            )}
                        </ul>
                        {user && (
                            <Icon className={cx("avatar")}>
                                <img src={user.urlAvatar} alt="" />
                                <ul className={cx("user-menu")}>
                                    <li>
                                        <Button
                                            className={cx("link")}
                                            to="/profile">
                                            Thông tin tài khoản
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            className={cx("link")}
                                            onClick={(e) => setOpenCart(true)}>
                                            Giỏ hàng
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            onClick={handleLogout}
                                            className={cx("link")}>
                                            Đăng xuất
                                        </Button>
                                    </li>
                                </ul>
                            </Icon>
                        )}
                    </div>
                )}
            </div>
            <Cart
                userId={user?._id || null}
                openCart={openCart}
                setOpenCart={setOpenCart}
            />
        </>
    );
}

export default Header;
