import React from "react";
import "./Detail.css";
import { Row, Col, Typography, Tag, QRCode, Empty, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

export function Detail() {
  const { Title } = Typography;
  const code = useParams().code;

  const navigate = useNavigate();

  return (
    <div className="DetailContainer">
      <Button className="back" type="text" icon={<LeftOutlined />} onClick={() => navigate("/")}>
        Back
      </Button>
      <Title level={3}>INFORMATIONS</Title>
      {code === "SE171927" ? (
        <>
          <Row className="rowDetail">
            <Col xs={2}></Col>
            <Col xs={5}>
              <div className="detailTitle">TÊN:</div>
            </Col>
            <Col xs={17}>
              <div className="detailInfo">Trương Nguyễn Gia Khang</div>
            </Col>
          </Row>

          <Row className="rowDetail">
            <Col xs={2}></Col>
            <Col xs={5}>
              <div className="detailTitle">MSSV:</div>
            </Col>
            <Col xs={17}>
              <div className="detailInfo">SE171927</div>
            </Col>
          </Row>

          <Row className="rowDetail">
            <Col xs={2}></Col>
            <Col xs={5}>
              <div className="detailTitle">CODE:</div>
            </Col>
            <Col xs={17}>
              <div className="detailInfo">HLW231234</div>
            </Col>
          </Row>

          <Row className="rowDetail">
            <Col xs={2}></Col>
            <Col xs={4}>
              <Tag color="green">Trạm 1</Tag>
            </Col>
            <Col xs={4}>
              <Tag color="red">Trạm 2</Tag>
            </Col>
            <Col xs={4}>
              <Tag color="red">Trạm 3</Tag>
            </Col>
            <Col xs={4}>
              <Tag color="red">Trạm 4</Tag>
            </Col>
            <Col xs={4}>
              <Tag color="red">Trạm 5</Tag>
            </Col>
            <Col xs={2}></Col>
          </Row>

          <Row style={{ margin: "20px 0 0 0" }}>
            <Col xs={6}></Col>
            <Col xs={10}>
              <QRCode size={180} value={code}></QRCode>
            </Col>
            <Col xs={6}></Col>
          </Row>
        </>
      ) : (
        <Empty description={`Code ${code} không tồn tại`} />
      )}
    </div>
  );
}
