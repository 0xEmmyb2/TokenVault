// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol"; // Gasless approvals
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @author 0xEmmyb2
 * @title AGRITOKEN
 * @dev Enhanced with Permit for better experience in agricultural micro-payments.
 */
contract AGRITOKEN is ERC20, ERC20Permit, Ownable {
    // 10 Billion tokens
    uint256 private constant INITIAL_SUPPLY = 10_000_000_000; 

    constructor() 
        ERC20("AGRITOKEN", "AGT") 
        ERC20Permit("AGRITOKEN") 
        Ownable(msg.sender) 
    {
        _mint(msg.sender, INITIAL_SUPPLY * (10 ** decimals()));
    }

    //Restricted minting for agricultural rewards/yields
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}