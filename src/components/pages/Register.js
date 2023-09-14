import Input from "../Input";
import classNames from "classnames/bind";
import styles from "./LoginRegister.module.scss";
import Button from "../Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import instance from "../../axios";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
    });
    const [error, setError] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
    });
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (
            account.username.length < 8 ||
            account.password.length < 8 ||
            account.passwordConfirm !== account.password
        ) {
            if (account.username.length < 8) {
                setError((pre) => ({
                    ...pre,
                    username: "Tài khoản phải chứa ít nhất 8 kí tự",
                }));
            }
            if (account.password.length < 8) {
                setError((pre) => ({
                    ...pre,
                    password: "Mật khẩu phải chứa ít nhất 8 kí tự",
                }));
            }
            if (account.passwordConfirm !== account.password) {
                setError((pre) => ({
                    ...pre,
                    passwordConfirm: "Mật khẩu xác thực không đúng",
                }));
            }
            return;
        }

        instance
            .post("/auth/register", account)
            .then((res) => {
                if (res.data.status === "Success") {
                    setError({
                        username: "",
                        password: "",
                        passwordConfirm: "",
                    });
                    navigate("/login");
                    return;
                }
            })
            .catch((err) => {
                if (err.response?.data?.username) {
                    setError((pre) => ({
                        ...pre,
                        username: err.response.data.username,
                    }));
                    return;
                }
            });
    };
    return (
        <div className={cx("page")}>
            <form className={cx("form-register")} onSubmit={handleSubmitForm}>
                <h2 className={cx("form-title")}>Đăng ký</h2>
                <div className={cx("form-row")}>
                    <Input
                        placeholder="Nhập tài khoản"
                        type="text"
                        value={account.username}
                        error={error.username}
                        onBlur={() =>
                            account.username.length >= 8
                                ? setError((pre) => ({ ...pre, username: "" }))
                                : setError((pre) => ({
                                      ...pre,
                                      username:
                                          "Tài khoản phải chứa ít nhất 8 kí tự",
                                  }))
                        }
                        onChange={(e) => {
                            setAccount((pre) => ({
                                ...pre,
                                username: e.target.value,
                            }));
                        }}
                    />
                </div>
                <div className={cx("form-row")}>
                    <Input
                        placeholder="Nhập mật khẩu"
                        type="password"
                        value={account.password}
                        error={error.password}
                        onBlur={() =>
                            account.password.length >= 8
                                ? setError((pre) => ({ ...pre, password: "" }))
                                : setError((pre) => ({
                                      ...pre,
                                      password:
                                          "Mật khẩu phải chứa ít nhất 8 kí tự",
                                  }))
                        }
                        onChange={(e) => {
                            setAccount((pre) => ({
                                ...pre,
                                password: e.target.value,
                            }));
                        }}
                    />
                </div>
                <div
                    className={cx("form-row", {
                        block: true,
                    })}>
                    <Input
                        placeholder="Xác nhận mật khẩu"
                        type="password"
                        value={account.passwordConfirm}
                        error={error.passwordConfirm}
                        onBlur={() =>
                            account.password !== account.passwordConfirm
                                ? setError((pre) => ({
                                      ...pre,
                                      passwordConfirm:
                                          "Mật khẩu xác thực không đúng",
                                  }))
                                : setError((pre) => ({
                                      ...pre,
                                      passwordConfirm: "",
                                  }))
                        }
                        onChange={(e) => {
                            setAccount((pre) => ({
                                ...pre,
                                passwordConfirm: e.target.value,
                            }));
                        }}
                    />
                </div>
                <div className={cx("form-row")}>
                    <Button secondary large className={cx("form-button")}>
                        Đăng ký
                    </Button>
                </div>

                <div className={cx("form-footer")}>
                    <span className={cx("form-link")}>
                        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Register;
