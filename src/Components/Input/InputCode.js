import { React, useState } from "react";
import "./Input.css";
import { Input, Button, Space, Typography, message, Alert } from "antd";
import { SearchOutlined, WarningFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export function InputCode() {
  const { Title } = Typography;

  const navigate = useNavigate();

  const [err, setErr] = useState(false);

  const handleSubmit = () => {
    //Get input value
    const input = document.querySelector("input").value.toUpperCase();

    // Length must >= 8
    input.length < 8 ? setErr(true) : navigate(`/${input}`);
  };
  return (
    <div className="inputCodeContainer">
      <Title
        level={2}
        style={Object.assign(
          { color: "white" },
          { margin: 0 },
          { padding: 0 },
          { filter: "drop-shadow(0 0 4px rgb(255, 255, 255))" }
        )}
      >
        HALLOWEEN 2023
      </Title>
      <Title
        level={5}
        style={Object.assign(
          { color: "white" },
          { margin: "0 0 12px 0" },
          { padding: 0 },
          { filter: "drop-shadow(0 0 4px rgb(255, 255, 255))" }
        )}
      >
        TRA CỨU THÔNG TIN
      </Title>
      <Space.Compact
        style={Object.assign(
          { boxShadow: "0 0 10px white" },
          { width: "375px" },
          { borderRadius: "7px" }
        )}
      >
        {/* Input */}
        <Input
          showCount
          maxLength={20}
          prefix={<b>MSSV: </b>}
          placeholder="SE190001"
          style={Object.assign({ lineHeight: "33px" }, { background: "white" })}
        ></Input>

        {/* Search Button */}
        <Button
          onClick={handleSubmit}
          type="primary"
          icon={<SearchOutlined />}
          style={Object.assign({ height: "43px" })}
        ></Button>
      </Space.Compact>
      {/* Error message */}
      <div className="joinText">
        Bạn chưa đăng ký tham gia?{" "}
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSe8Qz8qGexqDgj_LYlqbn7g9EyHgtB9_764JM15vOtcyohOuA/viewform" target="_blank">
          Đăng ký
        </a>
      </div>
      {err && (
        <Alert
          showIcon
          message="MSSV phải có ít nhất 8 kí tự"
          type="error"
          style={Object.assign(
            { width: "375px" },
            { position: "absolute" },
            { left: "50%" },
            { transform: "translateX(-50%)" },
            { margin: "4px 0 0 0" }
          )}
        ></Alert>
      )}
    </div>
  );
}
