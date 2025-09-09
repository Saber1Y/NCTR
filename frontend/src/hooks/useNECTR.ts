import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther, formatEther } from "viem";
import { NECTR_CONTRACT } from "@/config/contracts";
import { useQueryClient } from "@tanstack/react-query";

// Hook to read NECTR balance
export function useNectrBalance(address?: `0x${string}`) {
  return useReadContract({
    address: NECTR_CONTRACT.address,
    abi: NECTR_CONTRACT.abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000, // Refetch every 5 seconds
    },
  });
}

// Hook to read staked balance
export function useStakedBalance(address?: `0x${string}`) {
  return useReadContract({
    address: NECTR_CONTRACT.address,
    abi: NECTR_CONTRACT.abi,
    functionName: "getStakedBalance",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });
}

// Hook to read pending rewards
export function usePendingRewards(address?: `0x${string}`) {
  return useReadContract({
    address: NECTR_CONTRACT.address,
    abi: NECTR_CONTRACT.abi,
    functionName: "getPendingRewards",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });
}

// Hook for staking tokens
export function useStakeTokens() {
  const { writeContract, isPending, error, data: hash } = useWriteContract();
  const queryClient = useQueryClient();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Invalidate queries when transaction is confirmed
  if (isConfirmed) {
    queryClient.invalidateQueries({ queryKey: ["readContract"] });
  }

  const stake = (amount: string) => {
    const amountWei = parseEther(amount);
    writeContract({
      address: NECTR_CONTRACT.address,
      abi: NECTR_CONTRACT.abi,
      functionName: "stake",
      args: [amountWei],
    });
  };

  return { stake, isPending: isPending || isConfirming, error, isConfirmed };
}

// Hook for unstaking tokens
export function useUnstakeTokens() {
  const { writeContract, isPending, error, data: hash } = useWriteContract();
  const queryClient = useQueryClient();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Invalidate queries when transaction is confirmed
  if (isConfirmed) {
    queryClient.invalidateQueries({ queryKey: ["readContract"] });
  }

  const unstake = (amount: string) => {
    const amountWei = parseEther(amount);
    writeContract({
      address: NECTR_CONTRACT.address,
      abi: NECTR_CONTRACT.abi,
      functionName: "unstake",
      args: [amountWei],
    });
  };

  return { unstake, isPending: isPending || isConfirming, error, isConfirmed };
}

// Hook for claiming rewards
export function useClaimRewards() {
  const { writeContract, isPending, error, data: hash } = useWriteContract();
  const queryClient = useQueryClient();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Invalidate queries when transaction is confirmed
  if (isConfirmed) {
    queryClient.invalidateQueries({ queryKey: ["readContract"] });
  }

  const claimRewards = () => {
    writeContract({
      address: NECTR_CONTRACT.address,
      abi: NECTR_CONTRACT.abi,
      functionName: "claimRewards",
    });
  };

  return {
    claimRewards,
    isPending: isPending || isConfirming,
    error,
    isConfirmed,
  };
}

// Utility function to format token amounts
export function formatTokenAmount(value: bigint | undefined): string {
  if (!value) return "0";
  return parseFloat(formatEther(value)).toFixed(2);
}
