const Home = () => {
  return (
    <div className="h-screen w-fll flex">
      <div className="flex-1 h-full flex flex-col items-center justify-center pl-[90px] ">
        <div className="w-[621px] flex flex-col items-center justify-center">
          <p className="text-[70px] font-light leading-[85px] text-center">
            Mint Your Blockfuse Labs NFT
          </p>

          <button className="btn-bouncy mt-16 text-[24px] bg-[#FFFFFF] border border-[#4E2EF5] h-[59px] px-[15px] rounded-[100px] btn-shadow">
            Mint the Blockfuse labs NFT
          </button>
        </div>
      </div>
      <div className="flex-1 h-full bg-[#FAFAFA] flex flex-col items-center justify-center">
        {/* <img src="https://crescendo.de/wp-content/uploads/2023/02/shutterstock_2131216459-464x464.jpg" alt="NFT" className="w-full h-full" /> */}
        {/* <img src="https://cdn.prod.www.spiegel.de/images/d2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0.9975262832405689_fpx44.98_fpy48.86.jpg" alt="NFT" className="w-full h-full" /> */}

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

export default Home;
