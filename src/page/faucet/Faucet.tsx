// assets
import mint_arrow from "../../assets/faucet/mint_arrow.svg";

const Facet = () => {
  return (
    <div className="h-screen w-fll flex">
      <div className="flex-1 h-full flex flex-col items-center justify-center pl-[90px] ">
        <div className="w-[621px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[40px] font-light leading-[48px] text-center">
              Ethereum Sepolia Faucet
            </p>

            <p className="mt-[32px] text-[24px] font-light leading-[29px] text-center">
              Get free Sepolia testnet Eth Brought to you by{" "}
            </p>

            <p className="mt-3 text-[24px] font-bold leading-[29px] text-center">
              BlockFuse Labs
            </p>
          </div>

          <button className="btn-bouncy mt-16 text-[24px] bg-[#FFFFFF] border border-[#4E2EF5] h-[59px] px-[15px] rounded-[100px] btn-shadow">
            Receive 0.0002
          </button>

          <div className="flex flex-col items-center justify-center mt-[32px]">
            <p className="mt-[32px] text-[24px] font-light leading-[29px] text-center">
              NOTE!!
            </p>

            <p className="mt-5 text-[24px] font-light leading-[29px] text-center">
              You need to own/mint Blockfuse labs NFT before you can receive you
              free testnet eth
            </p>

            <div className="flex items-center border-b border-[#4E2EF5] mt-[32px] cursor-pointer btn-bouncy">
                <p className="text-[16px] font-light leading-[29px] text-center text-[#4E2EF5]">Mint now</p>
                <img src={mint_arrow} className="w-[20px] h-[20px]" alt="ICON" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 h-full bg-[#FAFAFA] flex flex-col items-center justify-center">
        <div className="rounded-fill h-[500px] w-[500px]">
          <img
            src="https://www.energy.de/files/styles/header_image_mobile/public/uploads/national/header-image/2022/04/nfts-661.jpg.webp?itok=SQN6f8Ho"
            alt="NFT"
            className="w-full h-full rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Facet;
