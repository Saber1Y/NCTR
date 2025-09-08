// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/NECTRToken.sol";

contract DeployNECTR is Script {
    function run() external {
        // Get the private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy NECTR token with initial parameters
        NECTRToken token = new NECTRToken(
            "NECTR Token",     // Token name
            "NECTR",           // Token symbol
            1000000            // Initial supply (1M tokens)
        );
        
        console.log("NECTR Token deployed to:", address(token));
        console.log("Initial supply:", token.totalSupply());
        console.log("Owner:", token.owner());
        
        vm.stopBroadcast();
    }
}
