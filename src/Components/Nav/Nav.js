import React from "react";
import "./Nav.css";
import { Button, Typography } from "antd";

export function Nav() {
  const { Title } = Typography;
  return (
    <>
      <img className="fpt" src="./assets/logofpt.png" />
      <a href="https://www.facebook.com/cocsaigonfuhcm" target="_blank">
        <img className="logo" src="./assets/logowhite.png" />
      </a>

      <div className="LogoNTTContainer">
        <div className="NTT">
          <div className="titleNTT">NHÀ TÀI TRỢ BẠC</div>
          <div className="cont">
            <img className="logoNTT" src="./assets/NTT/Logo_Chill-01.png" />
          </div>
        </div>

        <div className="NTT">
          <div className="titleNTT">NHÀ TÀI TRỢ ĐỒNG</div>
          <div className="cont">
            <img className="logoNTT" src="./assets/NTT/LOGO HANOK.png" />
            <img className="logoNTT" src="./assets/NTT/LOGO-HAPPY-THAI-1.png" />
            <img className="logoNTT Afprocado" src="./assets/NTT/LOGO AFROCADO.png" />
          </div>
        </div>

        <div className="NTT">
          <div className="titleNTT">NHÀ TÀI TRỢ ĐỒNG HÀNH</div>
          <div className="cont">
            <img className="logoNTT" src="./assets/NTT/LOGO MRBROWN.png" />
          </div>
        </div>

        <div className="DVDH">
          <div className="titleNTT">ĐƠN VỊ ĐỒNG HÀNH</div>
          <div className="cont">
            <img className="logoDVDH" src="./assets/DVDH/JSC.png" />
            <img className="logoNTT" src="./assets/DVDH/FCF.jpg" />
            <img className="logoNTT" src="./assets/DVDH/AAC.png" />
            <img className="logoNTT" src="./assets/DVDH/EIS.png" />
            <img className="logoNTT" src="./assets/DVDH/A.jpg" />
          </div>
        </div>
      </div>
    </>
  );
}
