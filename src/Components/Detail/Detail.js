import { React, useState, useEffect } from "react";
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
  ReloadOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { personalInformations, TrackingContent } from "./InformationsStored";

//https://sheet.best/admin
//https://docs.google.com/spreadsheets/d/1rDO_bu_1l6A7x5eclJ2QLIdywDwqA3es3p9LAiFFFsQ/edit#gid=0

export function Detail() {
  const { Title } = Typography;
  const code = useParams().code;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  //Message
  const doneMsg = "Đã hoàn thành";
  const notDoneMsg = "Chưa hoàn thành";
  const notReceiveMsg = "Chưa nhận";
  const ReceiveMsg = "Đã nhận";

  const navigate = useNavigate();

  //reject the requests if user tried to enter by edit the website path
  const rejectFetching = () => {
    message.error("MSSV phải có ít nhất 6 kí tự");
    navigate("/");
  };

  //Getting users data
  const fetchingData = () => {
    setLoading(true);
    //https://sheet.best/api/sheets/18ed97da-39f2-4c51-8efd-f16853cff5f9/search?mssv=
    axios // https://sheet.best/api/sheets/363b6a6f-20ca-4299-b4d2-b6c67ba11958/search?mssv=
      .get(`https://sheetdb.io/api/v1/5ns7w9461kjnd/search?mssv=${code}`)
      .then((response) => (setUser(response.data), setLoading(false)))
      .catch((err) => console.log(err));
  };

  //close time 31/10/2023 19:00:00
  // const limitTime = new dayjs()
  //   .date(31)
  //   .month(9)
  //   .year(2023)
  //   .hour(19)
  //   .minute(0)
  //   .second(0);
  const [isShowing, setIsShowing] = useState(false);
  // const checkTime = () => {
  //   setInterval(() => {
  //     const now = new dayjs();
  //     now >= limitTime && setIsShowing(false);
  //   }, 1000 * 60 * 3);
  //   //inter val every 3 minutes
  // };

  useEffect(() => {
    fetchingData();
    // checkTime();
  }, []);

  return (
    <div className="DetailContainer">
      {/* Back button */}
      <span className="back">
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </span>

      {/* Title */}
      <Title
        level={3}
        style={Object.assign(
          { margin: "30px 0 0 0" },
          { padding: 0 },
          { fontFamily: "Halloween" }
        )}
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

              {/* Personal Informations */}
              {personalInformations.map((info, i) => {
                return (
                  <Row className="rowDetail">
                    <Col xs={2}></Col>
                    <Col xs={5}>
                      <div className="detailTitle">{info.display}</div>
                    </Col>
                    <Col xs={17}>
                      <div className="detailInfo">
                        {info.isUrl ? (
                          <Popover
                            placement="top"
                            content={user[0][info.index]}
                          >
                            <a href={user[0][info.index]} target="_blank">
                              Click vào đây
                            </a>
                          </Popover>
                        ) : (
                          <div className="detailInfo preventCopy">
                            {user[0][info.index]}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                );
              })}

              {/* TRACK STATUS */}
              <Row className="rowDetail trackTeam">
                {TrackingContent.map((content, i) => {
                  return (
                    <Popover
                      content={
                        user[0][content.index] === "TRUE" ? doneMsg : notDoneMsg
                      }
                    >
                      <Tag
                        style={{ margin: "4px 5px 0 0" }}
                        color={
                          user[0][content.index] === "TRUE" ? "green" : "red"
                        }
                      >
                        {content.name}
                      </Tag>
                    </Popover>
                  );
                })}
              </Row>

              {/* QR CODE */}
              <Row style={{ margin: "4px 0 2px 0" }}>
                <>
                  <Col xs={6}></Col>
                  <Col xs={10}>
                    <QRCode
                      className="preventCopy"
                      size={180}
                      value={user[0]?.code}
                    ></QRCode>
                  </Col>
                  <Col xs={6}></Col>{" "}
                </>
              </Row>
            </>
          ) : (
            <>
              {/* EMPTY */}
              <Empty
                style={{ margin: "15px 0 8px 0" }}
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
                  <Button type="primary" style={{ fontFamily: "Halloween" }}>
                    ĐĂNG KÝ
                  </Button>
                </a>
              </Empty>
            </>
          )
        ) : (
          // LOADING ANIMATION
          <Spin size="large" style={{ margin: "164px 0 0 0" }} />
        )
      }

      {/* Running text at the bottom */}
      <Alert
        type="error"
        icon={<WarningFilled />}
        banner
        className="banner"
        message={
          <Marquee
            pauseOnHover
            gradient={false}
            className="runnerText"
            speed={25}
          >
            {!isShowing ? (
              <span style={{ margin: "0 10px 0 0" }}>
                Bạn cảm thấy hoạt động hôm nay như thế nào? Hãy cho Cóc Sài Gòn
                biết bằng cách{" "}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeaUFMuKt4hL58wGuk7NwGzaLapYBjl-l8dsu11biezq6XWQA/viewform?fbclid=IwAR02HeunMEE8w65eVgbMBX1WjFVqyEMEuAPtH_jPylfavyF6fFxtK-D5qT4"
                  target="_blank"
                >
                  <b>FEEDBACK</b>
                </a>{" "}
                nhé
              </span>
            ) : (
              <span style={{ margin: "0 3px 0 3px" }}>
                Các booth game sẽ đóng vào lúc
                <b style={{ margin: "0 2px 0 2px" }}>19:00</b>
                Nhưng các bạn vẫn có thể vào để
                <b style={{ margin: "0 2px 0 2px" }}> tham quan booth</b> ^^
              </span>
            )}
          </Marquee>
        }
      />
    </div>
  );
}
