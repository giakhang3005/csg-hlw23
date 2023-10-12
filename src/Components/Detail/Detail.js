import { React, useState } from "react";
import "./Detail.css";
import {
  Row,
  Col,
  Typography,
  Tag,
  QRCode,
  Empty,
  Button,
  Spin,
  Alert,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//https://sheet.best/admin
// /https://docs.google.com/spreadsheets/d/1rDO_bu_1l6A7x5eclJ2QLIdywDwqA3es3p9LAiFFFsQ/edit#gid=0

export function Detail() {
  const { Title } = Typography;
  const code = useParams().code;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const navigate = useNavigate();

  const {
    data: user, //assign name for the data
    refetch,
  } = useQuery(["u"], () => {
    return axios
      .get(`https://sheetdb.io/api/v1/5ns7w9461kjnd/search?mssv=${code}`) //use api https://sheet.best/api/sheets/363b6a6f-20ca-4299-b4d2-b6c67ba11958/search?mssv=
      .then((response) => response.data)
      .catch()
      .finally(setTimeout(() => setLoading(false), 800));
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

      {
        //check loading state
        !loading ? (
          //if received data not empty && validate again mssv === code
          user.length > 0 && user[0]?.mssv === code ? (
            <>
              {/* Name */}
              <Row className="rowDetail">
                <Col xs={2}></Col>
                <Col xs={5}>
                  <div className="detailTitle">TÊN:</div>
                </Col>
                <Col xs={17}>
                  <div className="detailInfo">{user[0]?.name}</div>
                </Col>
              </Row>

              {/* MSSV */}
              <Row className="rowDetail">
                <Col xs={2}></Col>
                <Col xs={5}>
                  <div className="detailTitle">MSSV:</div>
                </Col>
                <Col xs={17}>
                  <div className="detailInfo">{user[0]?.mssv}</div>
                </Col>
              </Row>

              {/* HLW CODE */}
              <Row className="rowDetail">
                <Col xs={2}></Col>
                <Col xs={5}>
                  <div className="detailTitle">CODE:</div>
                </Col>
                <Col xs={17}>
                  <div className="detailInfo">{user[0]?.code}</div>
                </Col>
              </Row>

            {/* TRACK STATUS */}
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

            {/* QR CODE */}
              <Row style={{ margin: "20px 0 0 0" }}>
                <Col xs={6}></Col>
                <Col xs={10}>
                  <QRCode size={180} value={user[0]?.code}></QRCode>
                </Col>
                <Col xs={6}></Col>
              </Row>
            </>
          ) : (
            <>
            {/* EMPTY */}
              <Empty description={`MSSV ${code} chưa đăng ký tham gia`}>
                <Button type="primary">ĐĂNG KÝ</Button>
              </Empty>
            </>
          )
        ) : (
          // LOADING ANIMATION
          <Spin size="large" />
        )
      }
    </div>
  );
}
