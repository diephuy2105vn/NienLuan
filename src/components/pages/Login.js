import Input from "../Input";
import classNames from "classnames/bind";
import styles from "./LoginRegister.module.scss";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthUserContext from "../../contexts/AuthUserContext";

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({ username: "", password: "" });
    const [error, setError] = useState({
        username: "",
        password: "",
    });
    const [_cookies, setCookie] = useCookies("token");
    const { user, setUser, loginWithAccount, loginWithGoogle } =
        useContext(AuthUserContext);

    useEffect(() => {
        if (user) navigate("/");
    }, [user]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (account.username === "" || account.password === "") {
            if (account.username === "") {
                setError((pre) => ({
                    ...pre,
                    username: "Vui lòng nhập trường này",
                }));
            }
            if (account.password === "") {
                setError((pre) => ({
                    ...pre,
                    password: "Vui lòng nhập trường này",
                }));
            }

            return;
        }
        loginWithAccount(account)
            .then((res) => {
                setError({
                    username: "",
                    password: "",
                });

                setCookie("accessToken", res.data.accessToken);
                setUser(res.data.user);
            })
            .catch((err) => {
                if (err.response?.data) {
                    setError({
                        username: err.response.data.username || "",
                        password: err.response.data.password || "",
                    });
                }
            });
    };

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then((res) => {
                setCookie("accessToken", res.data.accessToken);
                setUser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx("page")}>
            <form className={cx("form-login")} onSubmit={handleSubmitForm}>
                <h2 className={cx("form-title")}>Đăng nhập</h2>
                <div className={cx("form-row")}>
                    <Input
                        placeholder="Nhập tài khoản"
                        type="text"
                        value={account.username}
                        error={error.username}
                        onChange={(e) => {
                            setAccount((pre) => ({
                                ...pre,
                                username: e.target.value,
                            }));
                        }}
                        onBlur={() =>
                            account.username.length >= 8
                                ? setError((pre) => ({ ...pre, username: "" }))
                                : setError((pre) => ({
                                      ...pre,
                                      username:
                                          "Tài khoản phải chứa ít nhất 8 kí tự",
                                  }))
                        }
                    />
                </div>
                <div
                    className={cx("form-row", {
                        block: true,
                    })}>
                    <Input
                        placeholder="Nhập mật khẩu"
                        type="password"
                        value={account.password}
                        error={error.password}
                        onChange={(e) => {
                            setAccount((pre) => ({
                                ...pre,
                                password: e.target.value,
                            }));
                        }}
                        onBlur={() =>
                            account.password.length >= 8
                                ? setError((pre) => ({ ...pre, password: "" }))
                                : setError((pre) => ({
                                      ...pre,
                                      password:
                                          "Mật khẩu phải chứa ít nhất 8 kí tự",
                                  }))
                        }
                    />
                </div>
                <div className={cx("form-row")}>
                    <Button secondary large className={cx("form-button")}>
                        Đăng nhập
                    </Button>
                </div>
                <div className={cx("form-row")}>
                    <Button
                        normal
                        className={cx("form-button")}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLoginWithGoogle();
                        }}>
                        <FcGoogle /> Google
                    </Button>
                    <Button
                        normal
                        className={cx("form-button")}
                        onClick={(e) => {
                            e.preventDefault();
                        }}>
                        <BsFacebook /> Facebook
                    </Button>
                </div>
                <div className={cx("form-footer")}>
                    <span className={cx("form-link")}>
                        Bạn quên mật khẩu? <Link>Tạo tài khoản mới</Link>
                    </span>
                    <span className={cx("form-link")}>
                        Bạn chưa có tài khoản?{" "}
                        <Link to="/register">Đăng ký</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Login;
