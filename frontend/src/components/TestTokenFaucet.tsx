import React, { useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { parseEther } from "viem";
import { NECTR_CONTRACT } from "@/config/contracts";
import { Coins, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TestTokenFaucet = () => {
  const { address } = useAccount();
  const [isRequesting, setIsRequesting] = useState(false);
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { t } = useLanguage();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const requestTokens = async () => {
    if (!address) return;

    try {
      setIsRequesting(true);

      writeContract({
        address: NECTR_CONTRACT.address,
        abi: NECTR_CONTRACT.abi,
        functionName: "mint",
        args: [address, parseEther("10000")],
      });
    } catch (err) {
      console.error("Faucet error:", err);
      setIsRequesting(false);
    }
  };

  const isLoading = isPending || isConfirming || isRequesting;

  return (
    <div className="card-glass border-2 border-yellow-400/20 bg-yellow-400/5">
      <div className="flex items-center space-x-2 mb-4">
        <Coins className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold">{t("faucet.title")}</h3>
      </div>

      <p className="text-sm opacity-80 mb-4">{t("faucet.description")}</p>

      <button
        onClick={requestTokens}
        disabled={isLoading}
        className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>
              {isPending
                ? t("faucet.requesting")
                : isConfirming
                ? t("faucet.confirming")
                : t("faucet.processing")}
            </span>
          </>
        ) : (
          <>
            <Coins className="w-4 h-4" />
            <span>{t("faucet.button")}</span>
          </>
        )}
      </button>

      {isSuccess && (
        <div className="mt-3 p-2 bg-green-400/20 border border-green-400/30 rounded text-sm text-green-400">
          ✅ {t("faucet.success")}
        </div>
      )}

      {error && (
        <div className="mt-3 p-2 bg-red-400/20 border border-red-400/30 rounded text-sm text-red-400">
          ❌ {t("faucet.error")}: {error.message?.slice(0, 100)}...
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-white/10 text-xs opacity-60">
        <p>{t("faucet.instructions.connect")}</p>
        <p>{t("faucet.instructions.network")}</p>
        <p>{t("faucet.instructions.gas")}</p>
      </div>
    </div>
  );
};

export default TestTokenFaucet;
