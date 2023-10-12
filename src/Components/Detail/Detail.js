import React from "react";
import "./Detail.css";
import { Row, Col, Typography, Tag, QRCode, Empty, Button, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function Detail() {
  const { Title } = Typography;
  const code = useParams().code;

  const navigate = useNavigate();

  const {
    data: user, //assign name for the data
    isLoading,
    // isError,
    refetch,
  } = useQuery(["u"], () => {
    return axios
      .get(`https://sheetdb.io/api/v1/5ns7w9461kjnd/search?mssv=${code}`)
      .then((response) => response.data);
  });

  return (
    <div className="DetailContainer">
      <Button
        className="back"
        type="text"
        icon={<LeftOutlined />}
        onClick={() => navigate("/")}
      >
        Back
      </Button>
      <Title level={3}>INFORMATIONS</Title>
      {!isLoading ? (
        user.length > 0 && user[0]?.mssv === code ? (
          <>
            <Row className="rowDetail">
              <Col xs={2}></Col>
              <Col xs={5}>
                <div className="detailTitle">TÊN:</div>
              </Col>
              <Col xs={17}>
                <div className="detailInfo">{user[0]?.name}</div>
              </Col>
            </Row>

            <Row className="rowDetail">
              <Col xs={2}></Col>
              <Col xs={5}>
                <div className="detailTitle">MSSV:</div>
              </Col>
              <Col xs={17}>
                <div className="detailInfo">{user[0]?.mssv}</div>
              </Col>
            </Row>

            <Row className="rowDetail">
              <Col xs={2}></Col>
              <Col xs={5}>
                <div className="detailTitle">CODE:</div>
              </Col>
              <Col xs={17}>
                <div className="detailInfo">{user[0]?.code}</div>
              </Col>
            </Row>

            <Row className="rowDetail">
              <Col xs={2}></Col>
              <Col xs={4}>
                <Tag color={user[0]?.tram1 === "TRUE" ? "green" : "red"}>
                  Trạm 1
                </Tag>
              </Col>
              <Col xs={4}>
                <Tag color={user[0]?.tram2 === "TRUE" ? "green" : "red"}>
                  Trạm 2
                </Tag>
              </Col>
              <Col xs={4}>
                <Tag color={user[0]?.tram3 === "TRUE" ? "green" : "red"}>
                  Trạm 3
                </Tag>
              </Col>
              <Col xs={4}>
                <Tag color={user[0]?.tram4 === "TRUE" ? "green" : "red"}>
                  Trạm 4
                </Tag>
              </Col>
              <Col xs={4}>
                <Tag color={user[0]?.tram5 === "TRUE" ? "green" : "red"}>
                  Trạm 5
                </Tag>
              </Col>
              <Col xs={2}></Col>
            </Row>

            <Row style={{ margin: "20px 0 0 0" }}>
              <Col xs={6}></Col>
              <Col xs={10}>
                <QRCode size={180} value={user[0]?.code}></QRCode>
              </Col>
              <Col xs={6}></Col>
            </Row>
          </>
        ) : (
          <Empty description={`MSSV ${code} chưa đăng ký tham gia`}>
            <Button type="primary">ĐĂNG KÝ</Button>
          </Empty>
        )
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
}
