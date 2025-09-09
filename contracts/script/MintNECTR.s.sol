// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/NECTRToken.sol";

contract MintNECTR is Script {
    function run() external {
        // Get the private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Contract address on Polygon Amoy
        address contractAddress = 0xf23147Df55089eA6bA87BF24bb4eEE6f7Cea182b;
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Get the deployed contract
        NECTRToken token = NECTRToken(contractAddress);
        
        // Mint 500,000 more NECTR tokens to your wallet
        address recipient = 0x3F5b96A494061F7338Da529e3047809Ac6a7FB84;
        uint256 mintAmount = 500000 * 10**18; // 500,000 tokens
        
        token.mint(recipient, mintAmount);
        
        console.log("Minted 500,000 NECTR tokens to:", recipient);
        console.log("New balance should be:", token.balanceOf(recipient));
        
        vm.stopBroadcast();
    }
}
