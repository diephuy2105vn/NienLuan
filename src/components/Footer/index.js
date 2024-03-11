import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import footer1 from "../../assets/Footer/ft-img1.png";
import footer2 from "../../assets/Footer/ft-img2.png";
import footer3 from "../../assets/Footer/ft-img3.png";
import footer4 from "../../assets/Footer/ft-img4.png";
import footer5 from "../../assets/Footer/ft-img5.png";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("f-row")}>
                <div className={cx("f-col")}>
                    <div className={cx("fc-wrapper")}>
                        <img className={cx("image")} src={footer1} alt="" />
                        <img className={cx("image")} src={footer2} alt="" />
                    </div>
                    <div className={"fc-wrapper"}>
                        <h3>Chứng nhận</h3>
                        <img
                            className={cx("image-small")}
                            src={footer3}
                            alt=""
                        />
                        <img
                            className={cx("image-small")}
                            src={footer4}
                            alt=""
                        />
                        <img
                            className={cx("image-small")}
                            src={footer5}
                            alt=""
                        />
                    </div>
                </div>

                <div className={cx("f-col")}>
                    <div className={cx("fc-wrapper")}>
                        <h3>Tổng đài hỗ trợ</h3>
                        <ul>
                            <li>
                                Gọi mua: <a href="tel:1800.1060">1800.1060</a>
                            </li>
                            <li>
                                Khiếu nại: <a href="tel:1800.1060">1800.1061</a>
                            </li>
                            <li>
                                Bảo hành: <a href="tel:1800.1060">1800.1062</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={cx("f-row")}>
                <p>
                    © 2007 - 2023 Công Ty Cổ Phần Bán Lẻ Kỹ Thuật Số FPT / Địa
                    chỉ: 261 - 263 Khánh Hội, P2, Q4, TP. Hồ Chí Minh / GPĐKKD
                    số 0311609355 do Sở KHĐT TP.HCM cấp ngày 08/03/2012. GP số
                    47/GP-TTĐT do sở TTTT TP HCM cấp ngày 02/07/2018. Điện
                    thoại: (028) 7302 3456. Email: fptshop@fpt.com.vn. Chịu
                    trách nhiệm nội dung: Nguyễn Trịnh Nhật Linh.
                </p>
            </div>
        </div>
    );
}

export default Footer;
