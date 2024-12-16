import React, { useState, useCallback, useEffect } from "react";
import mint_arrow from "../../assets/faucet/mint_arrow.svg";
import { 
  useAccount, 
  useWriteContract, 
  useWaitForTransactionReceipt 
} from "wagmi";
import { parseAbi, Hash } from "viem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const faucetAbi = parseAbi(["function claim() public"]);
const faucetAddress = "0xa4419B2eD1b18CA9854Ae95e1BA96C737Aa20065";

const Faucet: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [transactionHash, setTransactionHash] = useState<Hash | null>(null);
  const [localTransactionStatus, setLocalTransactionStatus] = useState<
    "idle" | "pending" | "completed" | "failed"
  >("idle");

  const { writeContract: write } = useWriteContract();

  const { isSuccess, isError } = useWaitForTransactionReceipt({
    hash: transactionHash ?? undefined,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Faucet Claimed Successfully!");
      setLocalTransactionStatus("completed");
    }
    if (isError) {
      toast.error("Transaction failed");
      setLocalTransactionStatus("failed");
    }
  }, [isSuccess, isError]);

  const claimFaucet = useCallback(async () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first.");
      return;
    }

    try {
      setLocalTransactionStatus("pending");
      toast.info("Claiming faucet funds...");

      const result = await new Promise<Hash>((resolve, reject) => {
        write({
          address: faucetAddress,
          abi: faucetAbi,
          functionName: "claim",
        }, {
          onSuccess: (hash) => resolve(hash as Hash),
          onError: (error) => reject(error),
        });
      });

      if (result) {
        setTransactionHash(result);
      } else {
        throw new Error("Failed to retrieve transaction hash");
      }
    } catch (err: any) {
      console.error("Error during claim:", err);

      const isUserRejection =
        err?.message?.includes("User denied transaction") ||
        err?.code === 4001;

      if (isUserRejection) {
        toast.info("Transaction canceled by the user.");
        setLocalTransactionStatus("idle");
      } else {
        toast.error(`Unexpected error: ${err.message || "Unknown error"}`);
        setLocalTransactionStatus("failed");
      }
    }
  }, [isConnected, address, write]);

  return (
    <div className="h-screen w-full flex">
      <div className="flex-1 h-full flex flex-col items-center justify-center pl-[90px]">
        <div className="w-[621px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[40px] font-light leading-[48px] text-center">
              Ethereum Sepolia Faucet
            </p>
            <p className="mt-[32px] text-[24px] font-light leading-[29px] text-center">
              Get free Sepolia testnet ETH brought to you by
            </p>
            <p className="mt-3 text-[24px] font-bold leading-[29px] text-center">
              BlockFuse Labs
            </p>
          </div>

          <button
            className="btn-bouncy mt-16 text-[24px] bg-[#FFFFFF] border border-[#4E2EF5] h-[59px] px-[15px] rounded-[100px] btn-shadow"
            onClick={claimFaucet}
            disabled={
              !isConnected ||
              localTransactionStatus === "pending"
            }
          >
            {localTransactionStatus === "pending"
              ? "Claiming..."
              : "Receive 0.0002"}
          </button>

          {localTransactionStatus === "completed" && (
            <div className="text-green-500 mt-4">Faucet Claimed Successfully!</div>
          )}
          {localTransactionStatus === "failed" && (
            <div className="text-red-500 mt-4">Transaction failed!</div>
          )}

          <div className="flex flex-col items-center justify-center mt-[32px]">
            <p className="mt-[32px] text-[24px] font-light leading-[29px] text-center">NOTE!!</p>
            <p className="mt-5 text-[24px] font-light leading-[29px] text-center">
              You need to own/mint BlockFuse Labs NFT before you can receive your free testnet ETH
            </p>
            <div
              className="flex items-center border-b border-[#4E2EF5] mt-[32px] cursor-pointer btn-bouncy"
              onClick={() => window.open("https://mint-blockfuse-labs-nft.com", "_blank")}
            >
              <p className="text-[16px] font-light leading-[29px] text-center text-[#4E2EF5]">
                Mint now
              </p>
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
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Faucet;
