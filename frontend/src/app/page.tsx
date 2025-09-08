"use client";

import { useState } from "react";
import ConnectButton from "@/components/Connectbtn";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [nectrBalance, setNectrBalance] = useState("0");
  const [stakedBalance, setStakedBalance] = useState("0");
  const [pendingRewards, setPendingRewards] = useState("0");

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 relative z-10">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold gradient-text">NECTR</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* {isConnected ? (
            <div className="flex items-center space-x-3">
              <div className="card-glass px-4 py-2">
                <span className="text-sm opacity-80">Connected</span>
                <div className="font-mono text-sm">{address}</div>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          ) : ( */}
          <ConnectButton />
          {/* )} */}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to <span className="gradient-text">NECTR</span>
          </h1>

          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Stake your NECTR tokens and earn rewards in a beautiful, modern DeFi
            platform. Experience the future of decentralized finance.
          </p>

          {!isConnected && (
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          )}
        </div>

        {/* Dashboard */}
        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Balance Card */}
            <div className="card-glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold opacity-80">
                  NECTR Balance
                </h3>
                <div className="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{nectrBalance}</div>
              <div className="text-sm opacity-60">NECTR</div>
            </div>

            {/* Staked Card */}
            <div className="card-glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold opacity-80">Staked</h3>
                <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{stakedBalance}</div>
              <div className="text-sm opacity-60">NECTR</div>
            </div>

            {/* Rewards Card */}
            <div className="card-glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold opacity-80">
                  Pending Rewards
                </h3>
                <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{pendingRewards}</div>
              <div className="text-sm opacity-60">NECTR</div>
            </div>

            {/* APY Card */}
            <div className="card-glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold opacity-80">
                  Current APY
                </h3>
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">5.0%</div>
              <div className="text-sm opacity-60">Annual</div>
            </div>
          </div>
        )}

        {/* Staking Interface */}
        {isConnected && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Stake Card */}
            <div className="card-glass">
              <h3 className="text-2xl font-bold mb-6">Stake NECTR</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium opacity-80 mb-2">
                    Amount to Stake
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-medium text-purple-400 hover:text-purple-300">
                      MAX
                    </button>
                  </div>
                </div>
                <button className="btn-primary w-full py-4 text-lg">
                  Stake Tokens
                </button>
                <div className="text-sm opacity-60 text-center">
                  You will earn 5% APY on staked tokens
                </div>
              </div>
            </div>

            {/* Unstake Card */}
            <div className="card-glass">
              <h3 className="text-2xl font-bold mb-6">Unstake NECTR</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium opacity-80 mb-2">
                    Amount to Unstake
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-medium text-cyan-400 hover:text-cyan-300">
                      MAX
                    </button>
                  </div>
                </div>
                <button className="btn-secondary w-full py-4 text-lg">
                  Unstake Tokens
                </button>
                <button className="btn-primary w-full py-3">
                  Claim Rewards ({pendingRewards} NECTR)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-12">Why Choose NECTR?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glass text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L9 9l-8 3 8 3 3 8 3-8 8-3-8-3-3-8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">High Rewards</h3>
              <p className="opacity-80">
                Earn up to 5% APY on your staked NECTR tokens with our optimized
                reward system.
              </p>
            </div>

            <div className="card-glass text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Secure & Audited</h3>
              <p className="opacity-80">
                Built with OpenZeppelin contracts and comprehensive testing for
                maximum security.
              </p>
            </div>

            <div className="card-glass text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Flexible Staking</h3>
              <p className="opacity-80">
                Stake and unstake anytime with no lock-up periods. Your tokens,
                your choice.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg"></div>
            <span className="text-xl font-bold gradient-text">NECTR</span>
          </div>
          <p className="opacity-60">Built with ❤️ for the future of DeFi</p>
        </div>
      </footer>
    </div>
  );
}
