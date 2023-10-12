import React from "react";
import "./Input.css";
import { Input, Button, Space, Typography, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export function InputCode() {
  const { Title } = Typography;
  const navigate = useNavigate();

  const handleSubmit = () => {
    const input = document.querySelector("input").value.toUpperCase();
    navigate(`/${input}`);
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
        <Input
          showCount
          maxLength={20}
          prefix={<b>MSSV: </b>}
          placeholder="SE190001"
          style={Object.assign({ lineHeight: "33px" }, { background: "white" })}
        ></Input>
        <Button
          onClick={handleSubmit}
          type="primary"
          icon={<SearchOutlined />}
          style={Object.assign({ height: "43px" })}
        ></Button>
      </Space.Compact>
    </div>
  );
}
