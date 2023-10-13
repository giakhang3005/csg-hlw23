import { React, useState } from "react";
import "./Input.css";
import { Input, Button, Space, Typography, message, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
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
      <Title style={Object.assign({ color: "white" })}>SEARCH</Title>
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
