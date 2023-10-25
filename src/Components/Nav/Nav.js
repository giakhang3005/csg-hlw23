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
            <img className="logoNTT" src="./assets/NTT/Logo_Chill-01.png" alt="Chill Cocktail"/>
            <img className="logoNTT" src="./assets/NTT/soso.png" alt="Soso"/>
          </div>
        </div>

        <div className="NTT">
          <div className="titleNTT">NHÀ TÀI TRỢ ĐỒNG</div>
          <div className="cont">
            <img className="logoNTT Afprocado" src="./assets/NTT/LOGO AFROCADO.png" alt="AFprocado"/>
          </div>
        </div>

        <div className="NTT">
          <div className="titleNTT">NHÀ TÀI TRỢ ĐỒNG HÀNH</div>
          <div className="cont">
          <img className="logoNTT" src="./assets/NTT/LOGO HANOK.png" alt="Hanok"/>
            <img className="logoNTT" src="./assets/NTT/LOGO-HAPPY-THAI-1.png" alt="Happy Thai"/>
            <img className="logoNTT" src="./assets/NTT/LOGO MRBROWN.png" alt="Mr Brown"/>
            <img className="logoNTT" src="./assets/NTT/misslua.png" alt="Misslua Makeup"/>
          </div>
        </div>

        <div className="DVDH">
          <div className="titleNTT">ĐƠN VỊ ĐỒNG HÀNH</div>
          <div className="cont">
            <img className="logoDVDH" src="./assets/DVDH/JSC.png" alt="JSV"/>
            <img className="logoNTT" src="./assets/DVDH/FCF.jpg" alt="FCF"/>
            <img className="logoNTT" src="./assets/DVDH/AAC.png" alt="AAC"/>
            <img className="logoNTT" src="./assets/DVDH/EIS.png" alt="EIS"/>
            <img className="logoNTT" src="./assets/DVDH/A.jpg" alt="A"/>
            <img className="logoNTT" src="./assets/DVDH/IG.png" alt="IG"/>
          </div>
        </div>
      </div>
    </>
  );
}
