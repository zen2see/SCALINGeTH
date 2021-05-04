// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import '../interfaces/V1/IUniswapV1Factory.sol';
import '../interfaces/V1/IUniswapV1Exchange.sol';
import '../interfaces/IUniswapV2Router01.sol';
import '../../shared/interfaces/IERC20.sol';
import '../../shared/interfaces/IWETH.sol';
import './UniswapV2Library.sol';
import {LibDiamond} from '../../shared/libraries/LibDiamond.sol';
import {LibMeta} from '../../shared/libraries/LibMeta.sol';

struct ArbiSwap {
    IUniswapV1Factory factoryV1; 
    address factory;
    IWETH WETH;
    string name;
    string owner;
}

struct AppStorage {
    address contractOwner;
    address iuniswapV1Factory;
    address factory;
    address weth;
    uint96 totalSupply;
    string name;
    string symbol;
    string itemsBaseUri;
    bytes32 domainSeparator;
}

library LibAppStorage {
    function diamondStorage() internal pure returns (AppStorage storage ds) {
        assembly {
            ds.slot := 0
        }
    }

    function abs(int256 x) internal pure returns (uint256) {
        return uint256(x >= 0 ? x : -x);
    }
}

contract Modifiers {
    AppStorage internal s;

    // modifier onlyUnlocked(uint256 _tokenId) {
    //     require(s.aavegotchis[_tokenId].locked == false, "LibAppStorage: Only callable on unlocked Aavegotchis");
    //     _;
    // }

    modifier onlyOwner {
        LibDiamond.enforceIsContractOwner();
        _;
    }
}
