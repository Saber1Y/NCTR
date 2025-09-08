// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/NECTRToken.sol";

contract NECTRTokenTest is Test {
    NECTRToken token;
    address owner;
    address user1;
    address user2;
    
    uint256 constant INITIAL_SUPPLY = 1000000; // 1M tokens
    
    function setUp() public {
        owner = address(this);
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        
        token = new NECTRToken("NECTR Token", "NECTR", INITIAL_SUPPLY);
        
        // Transfer some tokens to users for testing
        token.transfer(user1, 10000 * 10**18);
        token.transfer(user2, 10000 * 10**18);
    }
    
    function testInitialSupply() public {
        assertEq(token.totalSupply(), INITIAL_SUPPLY * 10**18);
        assertEq(token.balanceOf(owner), (INITIAL_SUPPLY - 20000) * 10**18);
    }
    
    function testMinting() public {
        uint256 mintAmount = 1000 * 10**18;
        uint256 initialBalance = token.balanceOf(user1);
        
        token.mint(user1, mintAmount);
        
        assertEq(token.balanceOf(user1), initialBalance + mintAmount);
        assertEq(token.totalSupply(), (INITIAL_SUPPLY + 1000) * 10**18);
    }
    
    function testOnlyOwnerCanMint() public {
        vm.prank(user1);
        vm.expectRevert();
        token.mint(user1, 1000 * 10**18);
    }
    
    function testStaking() public {
        uint256 stakeAmount = 1000 * 10**18;
        
        vm.startPrank(user1);
        token.stake(stakeAmount);
        
        assertEq(token.getStakedBalance(user1), stakeAmount);
        assertEq(token.balanceOf(user1), 9000 * 10**18);
        assertEq(token.balanceOf(address(token)), stakeAmount);
        vm.stopPrank();
    }
    
    function testStakingZeroTokens() public {
        vm.prank(user1);
        vm.expectRevert("Cannot stake 0 tokens");
        token.stake(0);
    }
    
    function testStakingMoreThanBalance() public {
        vm.prank(user1);
        vm.expectRevert("Insufficient balance");
        token.stake(20000 * 10**18);
    }
    
    function testUnstaking() public {
        uint256 stakeAmount = 1000 * 10**18;
        
        vm.startPrank(user1);
        token.stake(stakeAmount);
        
        // Wait some time to accumulate rewards
        vm.warp(block.timestamp + 365 days);
        
        uint256 pendingRewards = token.getPendingRewards(user1);
        assertGt(pendingRewards, 0);
        
        token.unstake(stakeAmount);
        
        assertEq(token.getStakedBalance(user1), 0);
        assertEq(token.balanceOf(user1), 10000 * 10**18 + pendingRewards);
        vm.stopPrank();
    }
    
    function testPartialUnstaking() public {
        uint256 stakeAmount = 1000 * 10**18;
        uint256 unstakeAmount = 500 * 10**18;
        
        vm.startPrank(user1);
        token.stake(stakeAmount);
        
        // Wait some time
        vm.warp(block.timestamp + 180 days);
        
        token.unstake(unstakeAmount);
        
        assertEq(token.getStakedBalance(user1), stakeAmount - unstakeAmount);
        assertGt(token.balanceOf(user1), 9500 * 10**18); // Should have rewards
        vm.stopPrank();
    }
    
    function testClaimRewards() public {
        uint256 stakeAmount = 1000 * 10**18;
        
        vm.startPrank(user1);
        token.stake(stakeAmount);
        
        // Wait one year for full rewards
        vm.warp(block.timestamp + 365 days);
        
        uint256 expectedRewards = token.getPendingRewards(user1);
        uint256 balanceBefore = token.balanceOf(user1);
        
        token.claimRewards();
        
        assertEq(token.balanceOf(user1), balanceBefore + expectedRewards);
        assertEq(token.getStakedBalance(user1), stakeAmount); // Staked amount unchanged
        assertEq(token.getPendingRewards(user1), 0); // No pending rewards after claiming
        vm.stopPrank();
    }
    
    function testRewardCalculation() public {
        uint256 stakeAmount = 1000 * 10**18;
        
        vm.startPrank(user1);
        token.stake(stakeAmount);
        
        // Wait one year for 5% rewards
        vm.warp(block.timestamp + 365 days);
        
        uint256 expectedRewards = (stakeAmount * 5) / 100; // 5% of staked amount
        uint256 actualRewards = token.getPendingRewards(user1);
        
        // Allow for small rounding differences
        assertApproxEqRel(actualRewards, expectedRewards, 0.01e18); // 1% tolerance
        vm.stopPrank();
    }
    
    function testUpdateRewardRate() public {
        uint256 newRate = 10;
        token.updateRewardRate(newRate);
        assertEq(token.stakingRewardRate(), newRate);
    }
    
    function testOnlyOwnerCanUpdateRewardRate() public {
        vm.prank(user1);
        vm.expectRevert();
        token.updateRewardRate(10);
    }
    
    function testRewardRateLimit() public {
        vm.expectRevert("Reward rate too high");
        token.updateRewardRate(101);
    }
}
