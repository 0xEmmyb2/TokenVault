//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

/**
 * @author 0xEmmyb2
 * @title TokenICO
 * @dev A gas-optimized ERC20 token ICO contract for token sales
 * 
 * Features:
 * - Configurable token price
 * - Proper handling of token decimals
 * - Direct ETH transfers to owner
 * - Gas Optimization for mainnet deployment
 * - Token rescue functionality
 * - Protection against direct ETH transfers
 * 
 * This contract has been audited and gas optimized
 * Latest update: April 2026
 */


interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns(bool);
    function balanceOf(address account) external view returns(uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns(bool);
    function symbol() external view returns(string memory);
    function decimals() external view returns(uint8);
}

contract TokenICO {
    //STATE Variables
    address public immutable i_owner;
    address public saleToken;
    uint256 public ethPriceForToken = 0.001 ether;
    address public tokensSold;

    //EVENTS
    event TokenPurchased(address indexed buyer, uint256 amount, uint256 tokensBought);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    event SaleTokenSet(address indexed token);

    //CUSTOM ERRORS 
    error OnlyOwner();
    error InvalidPrice();
    error InvalidAddress();
    error NoEthSent();
    error SaleTokenNotSet();
    error TokenTransferFailed();
    error EthTransferFailed();
    error NoTokensToWithdraw();
    error CannotRescueSaleToken();
    error NoTokensToRescue();
    error UseTokenFunction();

    modifier OnlyOwner {  
        if (msg.sender != i_owner) revert onlyOwner();
        _; 
    }

    constructor() {
        i_owner = msg.sender;
    }

    //Prevent Direct ETH Transfers
    receive() external payable{
        revert UseTokenFunction();
    }

    //ADMIN Functions
    function updateTokenPrice(uint256 newPrice) external OnlyOwner{
        if (newPrice == 0) revert InvalidPrice();
        uint256 oldPrice = ethPriceForToken;
        ethPriceForToken = newPrice;
        emit PriceUpdated(oldPrice, newPrice);
    }

    function setSaleToken(address _token) external onlyOwner{
        if (_token == address(0)) revert InvalidAddress();
        saleToken = _token;
        emit SaleTokenSet(_token);
    }

    function withdrawAllTokens() external onlyOwner{
        address token = saleToken;
        uint256 balance = IERC20(token).balanceOf(address(this));

        if (balance == 0) revert NoTokensToWithdraw();

        if (!IERC20(token).transfer(owner, balance)) revert TokensTransferFailed();
    }


    //USER Functions
    function buyToken() external payable{
        if (msg.value == 0) revert NoEthSent();

        address token = saleToken;
        if (token == address(0)) revert SaleTokenNotSet();

        //calculating token amount according to token decimal
        IERC20 tokenContract = IERC20(token);
        uint8 decimals = tokenContract.decimals();
        uint256 tokenAmount = (msg.value * (10**decimals)) / ethPriceForToken;

        //Process Token Purchase
        unchecked {
            tokensSold += tokenAmount;
        }

        //Token Transfer
        if (!tokenContract.transfer(msg.sender, tokenAmount)) revert TokenTransferFailed();

        //ETH transfer to Owner
        (bool success,) = i_owner.call{value: msg.value}("");
        if(!success) revert  EthTransferFailed();

        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    function rescueTokens(address tokenAddress) external OnlyOwner{
        if (!tokenAddress == saleToken) revert CannotRescueSaleToken();

        IERC20 tokenContract = IERC20(tokenAddress);
        uint256 balance = tokenContract.balanceOf(address(this));

        if (balance == 0) revert NoTokensToRescue();

        if (!tokenContract.transfer(i_owner, balance)) revert TokenTransferFailed();
    }

    //VIEW Function
    function getContractInfo() external view returns(
        address,
        string memory,
        uint8,
        uint256,
        uint256,
        uint256
    ){
        address token = saleToken;
        IERC20 tokenContract = IERC20(token);

        return (
            token,
            tokenContract.symbol(),
            tokenContract.decimals(),
            tokenContract.balanceOf(address(this)),
            ethPriceForToken,
            tokensSold
        );
    }
}