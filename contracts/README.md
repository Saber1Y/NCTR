# NECTR Token Smart Contracts

This directory contains the smart contracts for the NECTR token project, built with Foundry.

## Overview

The NECTR token is an ERC-20 token with integrated staking functionality that allows users to:

- **Stake tokens** to earn rewards over time
- **Unstake tokens** and claim accumulated rewards
- **Claim rewards** without unstaking (compound staking)

## Contract Features

### NECTRToken.sol

- **ERC-20 Standard**: Full compatibility with ERC-20 standard
- **Minting**: Owner can mint new tokens
- **Staking**: Users can stake tokens to earn rewards
- **Reward System**: 5% annual reward rate (configurable by owner)
- **Flexible Unstaking**: Partial or full unstaking support
- **Reward Claiming**: Claim rewards without unstaking

## Getting Started

### Prerequisites

- [Foundry](https://getfoundry.sh/) installed
- Node.js and npm/yarn
- MetaMask wallet with Polygon Mumbai testnet configured

### Installation

1. Install dependencies:

```bash
forge install
```

2. Compile contracts:

```bash
forge build
```

3. Run tests:

```bash
forge test
```

### Deployment

1. Copy environment file:

```bash
cp .env.example .env
```

2. Fill in your private key and RPC URL in `.env`

3. Deploy to Polygon Mumbai testnet:

```bash
forge script script/DeployNECTR.s.sol --rpc-url $POLYGON_MUMBAI_RPC_URL --broadcast --verify
```

## Contract Architecture

### Staking Mechanism

1. **Stake**: Users transfer tokens to the contract and start earning rewards
2. **Rewards**: Calculated based on staked amount, time, and reward rate
3. **Unstake**: Users can withdraw staked tokens plus earned rewards
4. **Claim**: Users can claim rewards without unstaking

### Reward Calculation

```
rewards = (stakedAmount × rewardRate × stakingDuration) / (100 × secondsInYear)
```

- Default reward rate: 5% per year
- Rewards are minted when claimed/unstaked
- No maximum supply limit for rewards

## Testing

The contract includes comprehensive tests covering:

- Token minting and transfers
- Staking functionality
- Reward calculations
- Access control
- Edge cases and error conditions

Run tests with:

```bash
forge test -vv
```

## Security Considerations

⚠️ **This is a demo implementation** - Not audited for production use

Key simplifications made for demo:

- Simplified reward calculation
- No withdrawal delays
- Basic access controls
- Unlimited reward minting

## Contract Addresses

- **Polygon Mumbai**: Will be added after deployment

## License

MIT License
