import { Background } from "./Components/Background/Background";
import { InputCode } from "./Components/Input/InputCode";
import {Detail} from "./Components/Detail/Detail";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: "#f56c64" } }}>
        <Routes>
          <Route path="/" element={<InputCode />} />
          <Route path="/:code" element={<Detail />} />
          <Route path="/*" element={<InputCode />} />
        </Routes>
        <Background />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
