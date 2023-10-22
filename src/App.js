import { Background } from "./Components/Background/Background";
import { InputCode } from "./Components/Input/InputCode";
import { Detail } from "./Components/Detail/Detail";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Nav } from "./Components/Nav/Nav";
//Create new client

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <ConfigProvider theme={{ token: { colorPrimary: "#ba3e0e" } }}>
          <Nav />
          <Routes>
            <Route path="/" element={<InputCode />} />
            <Route path="/:code" element={<Detail />} />
            <Route path="/*" element={<InputCode />} />
          </Routes>
          <Background />
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
