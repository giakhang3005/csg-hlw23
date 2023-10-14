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
  Popover,
  message,
  Alert,
} from "antd";
import Marquee from "react-fast-marquee";
import {
  LeftOutlined,
  GiftFilled,
  ToolFilled,
  WarningFilled,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//https://sheet.best/admin
//https://docs.google.com/spreadsheets/d/1rDO_bu_1l6A7x5eclJ2QLIdywDwqA3es3p9LAiFFFsQ/edit#gid=0

export function Detail() {
  const { Title } = Typography;
  const code = useParams().code;

  const [loading, setLoading] = useState(true);

  //Message
  const doneMsg = "Đã hoàn thành";
  const notDoneMsg = "Chưa hoàn thành";
  const notReceiveMsg = "Chưa nhận";
  const ReceiveMsg = "Đã nhận";

  const navigate = useNavigate();

  //reject the requests if user tried to enter by edit the website path
  const rejectFetching = () => {
    message.error("MSSV phải có ít nhất 8 kí tự");
    navigate("/");
  };

  //Getting users data
  const fetchingData = () => {
    return axios // https://sheet.best/api/sheets/363b6a6f-20ca-4299-b4d2-b6c67ba11958/search?mssv=
      .get(`https://sheetdb.io/api/v1/5ns7w9461kjnd/search?mssv=${code}`)
      .then((response) => response.data)
      .catch()
      .finally(setTimeout(() => setLoading(false), 1500));
  };

  //Use query
  const {
    data: user, //assign name for the data
    refetch,
  } = useQuery(["u"], () => {
    //validate the path if user trying to edit it
    return code.length < 8 ? rejectFetching() : fetchingData();
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
      <Title
        level={3}
        style={Object.assign({ margin: "25px 0 0 0" }, { padding: 0 })}
      >
        VÉ THÔNG HÀNH
      </Title>

      {
        //check loading state
        !loading ? (
          //if received data not empty && validate again mssv === code
          user?.length > 0 && user[0]?.mssv === code ? (
            <>
              <p className="timestamp">{user[0]?.time}</p>

              {/* Name */}
              <Row className="rowDetail" style={{ margin: "18px 0 0 0" }}>
                <Col xs={2}></Col>
                <Col xs={5}>
                  <div className="detailTitle">TÊN:</div>
                </Col>
                <Col xs={17}>
                  <div className="detailInfo preventCopy">{user[0]?.name}</div>
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

              {/* EMAIL */}
              <Row className="rowDetail">
                <Col xs={2}></Col>
                <Col xs={5}>
                  <div className="detailTitle">EMAIL:</div>
                </Col>
                <Col xs={17}>
                  <div className="detailInfo preventCopy">{user[0]?.email}</div>
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
                <Col xs={1}></Col>
                <Col xs={4}>
                  <Popover
                    content={user[0]?.tram1 === "TRUE" ? doneMsg : notDoneMsg}
                  >
                    <Tag color={user[0]?.tram1 === "TRUE" ? "green" : "red"}>
                      Trạm 1
                    </Tag>
                  </Popover>
                </Col>
                <Col xs={4}>
                  <Popover
                    content={user[0]?.tram2 === "TRUE" ? doneMsg : notDoneMsg}
                  >
                    <Tag color={user[0]?.tram2 === "TRUE" ? "green" : "red"}>
                      Trạm 2
                    </Tag>
                  </Popover>
                </Col>
                <Col xs={4}>
                  <Popover
                    content={user[0]?.tram3 === "TRUE" ? doneMsg : notDoneMsg}
                  >
                    <Tag color={user[0]?.tram3 === "TRUE" ? "green" : "red"}>
                      Trạm 3
                    </Tag>
                  </Popover>
                </Col>
                <Col xs={4}>
                  <Popover
                    content={user[0]?.tram4 === "TRUE" ? doneMsg : notDoneMsg}
                  >
                    <Tag color={user[0]?.tram4 === "TRUE" ? "green" : "red"}>
                      Trạm 4
                    </Tag>
                  </Popover>
                </Col>
                <Col xs={4}>
                  <Popover
                    content={user[0]?.tram5 === "TRUE" ? doneMsg : notDoneMsg}
                  >
                    <Tag color={user[0]?.tram5 === "TRUE" ? "green" : "red"}>
                      Trạm 5
                    </Tag>
                  </Popover>
                </Col>
                <Popover
                  content={
                    user[0]?.prize === "TRUE" ? ReceiveMsg : notReceiveMsg
                  }
                >
                  <Col
                    xs={2}
                    style={Object.assign(
                      { fontSize: "18px" },
                      { color: user[0]?.prize === "TRUE" ? "#0fab36" : "red" }
                    )}
                  >
                    <GiftFilled />
                  </Col>
                </Popover>
                <Col xs={1}></Col>
              </Row>

              {/* QR CODE */}
              <Row style={{ margin: "15px 0 0 0" }}>
                <Col xs={6}></Col>
                <Col xs={10}>
                  <QRCode
                    className="preventCopy"
                    size={180}
                    value={user[0]?.code}
                  ></QRCode>
                </Col>
                <Col xs={6}></Col>
              </Row>
            </>
          ) : (
            <>
              {/* EMPTY */}
              <Empty
              style={{margin: '15px 0 8px 0'}}
                description={
                  <>
                    <div
                      style={{ fontWeight: 600 }}
                    >{`MSSV ${code} chưa đăng ký tham gia`}</div>
                    <div style={Object.assign({ margin: "15px 1px 15px 1px" })}>
                      Nếu bạn đã đăng ký, bạn vui lòng chờ ít phút để thông tin
                      của mình được cập nhật lên web nhé <ToolFilled />
                    </div>
                  </>
                }
              >
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe8Qz8qGexqDgj_LYlqbn7g9EyHgtB9_764JM15vOtcyohOuA/viewform"
                  target="_blank"
                >
                  <Button type="primary">ĐĂNG KÝ</Button>
                </a>
              </Empty>
            </>
          )
        ) : (
          // LOADING ANIMATION
          <Spin size="large" style={{ margin: "164px 0 0 0" }} />
        )
      }
      <Alert
        type="error"
        icon={<WarningFilled />}
        banner
        className="banner"
        message={
          <Marquee pauseOnHover gradient={false} className="runnerText">
            <span style={{ margin: "0 3px 0 3px" }}>
              Bạn đừng bỏ lỡ{" "}
              <b style={{ margin: "0 2px 0 2px" }}>đêm nhạc Halloween</b> sôi
              động vào lúc{" "}
              <b style={{ margin: "0 2px 0 2px" }}>
                {" "}
                18:00 tại sân trường đại học FPT
              </b>{" "}
              nhé ^^{" "}
            </span>
          </Marquee>
        }
      />
    </div>
  );
}
