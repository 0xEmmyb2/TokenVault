//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract AGRITOKEN is ERC20, Ownable {
    uint256 private constant INITIAL_SUPPLY = 10000000000;

    constructor() ERC20 ("AGRITOKEN", "AGT") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY * (10 ** decimals()));
    }
}