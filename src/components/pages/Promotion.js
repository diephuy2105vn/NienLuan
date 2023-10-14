import classNames from "classnames/bind";
import styles from "./Promotion.module.scss";
import backgroundImg from "../../assets/Intro/background.jpg";
import titleImg from "../../assets/Intro/title.jpg";
const cx = classNames.bind(styles);

function Promotion() {
    return (
        <div className={cx("page")}>
            <div className={cx("intro")}>
                <img
                    className={cx("intro-background")}
                    src={backgroundImg}
                    alt=""
                />
                <div className={cx("intro-content")}>
                    <img className={cx("intro-title")} src={titleImg} alt="" />
                    <p className={cx("intro-description")}>
                        Công ty Cổ phần Đầu tư Thế Giới Di Động (MWG) là nền
                        tảng bán lẻ đa ngành nghề số 1 Việt Nam về doanh thu và
                        lợi nhuận.
                        <br />
                        Với chiến lược omni-channel, Công ty vận hành mạng lưới
                        hàng ngàn cửa hàng trên toàn quốc song song với việc tận
                        dụng hiểu biết sâu rộng về khách hàng thông qua nền tảng
                        dữ liệu lớn, năng lực chủ động triển khai các hoạt động
                        hỗ trợ bán lẻ được xây dựng nội bộ và liên tục đổi mới
                        công nghệ nhằm tạo ra trải nghiệm khách hàng vượt trội
                        và thống nhất ở mọi kênh cũng như nâng cao sự gắn kết
                        của người tiêu dùng với các thương hiệu của MWG.
                    </p>
                </div>
            </div>
            <div className={cx("map")}>
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7857.828883882913!2d105.76836604416508!3d10.023919032984846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1696863127875!5m2!1svi!2s"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
}

export default Promotion;
