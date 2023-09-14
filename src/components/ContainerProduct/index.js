import classNames from "classnames/bind";
import styles from "./ContainerProduct.module.scss";
import Card from "../Card";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const cx = classNames.bind(styles);

function ContainerProduct({ items = [], sizeS, sizeM, sizeL }) {
    return (
        <div className={cx("wrapper")}>
            <Row className={cx("row")} xs={sizeS} md={sizeM} lg={sizeL}>
                {items.map((item, index) => (
                    <Col key={index} className={cx("col")}>
                        <Card item={item} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ContainerProduct;
