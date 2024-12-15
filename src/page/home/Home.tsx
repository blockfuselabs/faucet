import React, { useState, useCallback } from "react";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseAbi, Hash } from "viem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { rejects } from "assert";
import { readContract } from "viem/actions";
import { hash } from "crypto";
import { data } from "react-router-dom";

const Home: React.FC = () => {
  const { isConnected, address } = useAccount();
  const nftAddress = "0x093B762004178D1D7Bc083Bb5A01438CecC2B6d5" as const;
  const nftAbi = parseAbi([
    "function mint(address account, uint256 amount, bytes data) public",
    "function balanceOf(address account, uint256 id) public view returns (uint256)",
  ]);

  const { data: balance, isLoading } = useReadContract({
    abi: nftAbi,
    address: nftAddress,
    functionName: "balanceOf",
    args: [address, 1n],
  });

  if (isLoading) {
    console.log("Loading balance...");
  }

  if (balance !== undefined) {
    console.log("User Balance:", balance);
  } else {
    console.log("Balance fetch failed");
  }

  const [transactionHash, setTransactionHash] = useState<Hash | null>(null);
  const [localTransactionStatus, setLocalTransactionStatus] = useState<
    "idle" | "pending" | "completed" | "failed"
  >("idle");

  const { writeContract, isPending: isContractWritePending } =
    useWriteContract();
  const publicClient = usePublicClient();
  const readContract = useReadContract();

  const { isSuccess, isError } = useWaitForTransactionReceipt({
    hash: transactionHash ?? undefined,
  });

  React.useEffect(() => {
    return () => {
      setTransactionHash(null);
      setLocalTransactionStatus("idle");
    };
  }, [address]);

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("NFT Minted Successfully!");
      setLocalTransactionStatus("completed");
    }
    if (isError) {
      toast.error("Transaction failed");
      setLocalTransactionStatus("failed");
    }
  }, [isSuccess, isError]);

  const checkNFTOwnership = async (): Promise<boolean> => {
    if (!address || !publicClient) {
      toast.error("Please connect your wallet first.");
      return false;
    }

    console.log(address);

    try {
      const tokenId = 1n;
      const nftBalance = await publicClient.readContract({
        address: nftAddress,
        abi: nftAbi,
        functionName: "balanceOf",
        args: [address, tokenId],
      });

      if (Number(nftBalance) > 0) {
        return true;
      } else {
        toast.error(
          "You need to own the BlockFuse Labs NFT to claim faucet funds."
        );

        console.log(nftBalance);
        return false;
      }
    } catch (error) {
      console.error("Error checking NFT ownership:", error);
      toast.error("Failed to verify NFT ownership. Please try again.");
      return false;
    } finally {
      console.log("Doneeee");
    }
  };

  // checkNFTOwnership();

  const mintNFT = useCallback(async () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first.");
      return;
    }

    if (balance != undefined || Number(balance) > 0) {
      toast.error("You cannot mint the NFT more than once");
      return;
    }

    console.log(ubalance);

    try {
      setLocalTransactionStatus("pending");
      toast.info("Minting...");

      const result = await new Promise<Hash>((resolve, reject) => {
        writeContract(
          {
            address: nftAddress,
            abi: nftAbi,
            functionName: "mint",
            args: [address, 1n, "0x"],
          },
          {
            onSuccess: (hash) => resolve(hash as Hash),
            onError: (error) => reject(error),
          }
        );
      });

      if (result) {
        setTransactionHash(result);
      } else {
        throw new Error("Failed to retrieve transaction hash");
      }
    } catch (err: any) {
      console.error("Full Error Object:", err);

      const isUserRejection =
        err.message?.includes("User denied transaction") ||
        err.message?.includes("Transaction was rejected") ||
        err.code === 4001 ||
        err.name === "UserRejectedRequestError";

      if (isUserRejection) {
        toast.info("Transaction canceled by the user.");
      } else {
        toast.error(`Unexpected error: ${err.message || "Unknown error"}`);
      }

      setLocalTransactionStatus("idle");
    }
  }, [
    isConnected,
    address,
    writeContract,
    readContract,
    nftAddress,
    nftAbi,
    balance,
  ]);

  return (
    <div className="h-screen w-full flex">
      <div className="flex-1 h-full flex flex-col items-center justify-center pl-[90px]">
        <div className="w-[621px] flex flex-col items-center justify-center">
          <p className="text-[70px] font-light leading-[85px] text-center">
            Mint Your Blockfuse Labs NFT
          </p>
          <button
            className="btn-bouncy mt-16 text-[24px] bg-[#FFFFFF] border border-[#4E2EF5] h-[59px] px-[15px] rounded-[100px] btn-shadow"
            onClick={mintNFT}
            disabled={
              !isConnected ||
              isContractWritePending ||
              localTransactionStatus === "pending"
            }
          >
            {localTransactionStatus === "pending"
              ? "Minting..."
              : "Mint the Blockfuse Labs NFT"}
          </button>

          {localTransactionStatus === "completed" && (
            <div className="text-green-500 mt-4">NFT Minted Successfully!</div>
          )}

          {localTransactionStatus === "pending" && (
            <div className="text-yellow-500 mt-4">
              Transaction is pending...
            </div>
          )}

          {localTransactionStatus === "failed" && (
            <div className="text-red-500 mt-4">Transaction failed!</div>
          )}
        </div>
      </div>
      <div className="flex-1 h-full bg-[#FAFAFA] flex flex-col items-center justify-center">
        <div className="rounded-full h-[500px] w-[500px]">
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

export default Home;
