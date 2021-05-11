// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import '../libraries/LibAppStorage.sol';
import '../interfaces/IUniswapV2Router02.sol';
import '../../shared/libraries/LibERC20Storage.sol';
import '../../shared/libraries/LibERC20.sol';
import {LibDiamond} from '../../shared/libraries/LibDiamond.sol';

contract ArbiswapV2Facet {
    AppStorage internal s;
    address internal constant uniswapV2RouterAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IUniswapV2Router02 public arbiV2Router;
    
    constructor() {
        arbiV2Router  = IUniswapV2Router02(uniswapV2RouterAddress);
    }
   
    // address private arbiDai = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;

    function convertEthToDai(uint daiAmount) public payable {
        uint deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!
        arbiV2Router.swapETHForExactTokens{ value: msg.value }(daiAmount, getPathForETHtoDAI(), address(this), deadline);
    
        // refund leftover ETH to user
        (bool success,) = msg.sender.call{ value: address(this).balance }("");
        require(success, "refund failed");
    }
  
    function getEstimatedETHforDAI(uint daiAmount) public view returns (uint[] memory) {
        return arbiV2Router.getAmountsIn(daiAmount, getPathForETHtoDAI());
    }

    function getPathForETHtoDAI() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = arbiV2Router.WETH();
        path[1] = s.arbiDai;
    
        return path;
    }
  
    // important to receive ETH
    // receive() payable external {}
}
