// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NECTR Token
 * @dev ERC-20 token with minting and staking functionality
 * @dev Simplified implementation for demo purposes
 */
contract NECTRToken is ERC20, Ownable {
    // Staking state variables
    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public stakingStartTime;
    
    // Staking rewards configuration
    uint256 public stakingRewardRate = 5; // 5% annual reward rate
    uint256 public constant SECONDS_IN_YEAR = 365 * 24 * 60 * 60;
    
    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 rewards);
    event RewardClaimed(address indexed user, uint256 rewards);
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10**decimals());
    }
    
    /**
     * @dev Mint new tokens (only owner)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Stake tokens to earn rewards
     */
    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // If user already has staked tokens, claim rewards first
        if (stakedBalances[msg.sender] > 0) {
            _claimRewards();
        }
        
        // Transfer tokens from user to contract
        _transfer(msg.sender, address(this), amount);
        
        // Update staking state
        stakedBalances[msg.sender] += amount;
        stakingStartTime[msg.sender] = block.timestamp;
        
        emit Staked(msg.sender, amount);
    }
    
    /**
     * @dev Unstake tokens and claim rewards
     */
    function unstake(uint256 amount) external {
        require(amount > 0, "Cannot unstake 0 tokens");
        require(stakedBalances[msg.sender] >= amount, "Insufficient staked balance");
        
        // Calculate and claim rewards
        uint256 rewards = _calculateRewards(msg.sender);
        
        // Update staking state
        stakedBalances[msg.sender] -= amount;
        
        // If fully unstaking, reset start time
        if (stakedBalances[msg.sender] == 0) {
            stakingStartTime[msg.sender] = 0;
        } else {
            stakingStartTime[msg.sender] = block.timestamp;
        }
        
        // Transfer staked tokens back to user
        _transfer(address(this), msg.sender, amount);
        
        // Mint and transfer rewards
        if (rewards > 0) {
            _mint(msg.sender, rewards);
        }
        
        emit Unstaked(msg.sender, amount, rewards);
    }
    
    /**
     * @dev Claim staking rewards without unstaking
     */
    function claimRewards() external {
        uint256 rewards = _claimRewards();
        require(rewards > 0, "No rewards to claim");
    }
    
    /**
     * @dev Internal function to claim rewards
     */
    function _claimRewards() internal returns (uint256) {
        uint256 rewards = _calculateRewards(msg.sender);
        
        if (rewards > 0) {
            stakingStartTime[msg.sender] = block.timestamp;
            _mint(msg.sender, rewards);
            emit RewardClaimed(msg.sender, rewards);
        }
        
        return rewards;
    }
    
    /**
     * @dev Calculate pending rewards for a user
     */
    function _calculateRewards(address user) internal view returns (uint256) {
        if (stakedBalances[user] == 0 || stakingStartTime[user] == 0) {
            return 0;
        }
        
        uint256 stakingDuration = block.timestamp - stakingStartTime[user];
        uint256 rewards = (stakedBalances[user] * stakingRewardRate * stakingDuration) / 
                         (100 * SECONDS_IN_YEAR);
        
        return rewards;
    }
    
    /**
     * @dev Get pending rewards for a user (view function)
     */
    function getPendingRewards(address user) external view returns (uint256) {
        return _calculateRewards(user);
    }
    
    /**
     * @dev Get staked balance of a user
     */
    function getStakedBalance(address user) external view returns (uint256) {
        return stakedBalances[user];
    }
    
    /**
     * @dev Update staking reward rate (only owner)
     */
    function updateRewardRate(uint256 newRate) external onlyOwner {
        require(newRate <= 100, "Reward rate too high"); // Max 100%
        stakingRewardRate = newRate;
    }
}
