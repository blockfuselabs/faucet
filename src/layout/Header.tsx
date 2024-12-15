// assets
import blockfuse_logo from "../assets/header/blockfuse-logo.png";
import nav_line from "../assets/header/nav_line.svg";

// styles
import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//connect wallet
import { ConnectKitButton } from "connectkit";

const Header = () => {
  const [isFaucet, setIsFaucet] = useState(false);
  const navigate = useNavigate();

  const handleFaucetClick = () => {
    if (isFaucet) {
      navigate('/');
    } else {
      navigate('/faucet');
    }
    setIsFaucet(!isFaucet);
  };

  return (

   
    <div className="header">
      <div className="logo-container">
        <img src={blockfuse_logo} alt="LOGO" className="w-12"/>
        <p>Blockfuse Labs</p>
      </div>

      <img src={nav_line} alt="DIVIDER" className="w-[30%]" />

      <div className="flex items-center gap-4">
        <button className="nav-button btn-bouncy" onClick={handleFaucetClick}>
          {isFaucet ? 'Mint NFT' : 'Claim Faucet'}
        </button>
        {/* <button className="connect-wallet-btn"></button> */}
        <ConnectKitButton
          customTheme={{
            "--ck-connectbutton-background": "#9c2cf399",
            "--ck-connectbutton-color": "#000",
            "--ck-connectbutton-border-radius": "20px"
          }} />
      </div>
    </div>
 
  );
};

export default Header;
