// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import '../interfaces/IUniswapV3Factory.sol';
import '../interfaces/IUniswapV3Pool.sol';
import '../interfaces/IUniswapV3PoolDeployer.sol';
import '../interfaces/callback/IUniswapV3SwapCallback.sol';
import '../interfaces/IUniswapV2Router02.sol';
import '../interfaces/IERC20Minimal.sol';
import '../libraries/SafeCast.sol';
import '../libraries/TickMath.sol';
import {LibDiamond} from '../../shared/libraries/LibDiamond.sol';
import {LibMeta} from '../../shared/libraries/LibMeta.sol';

// struct ArbiSwap {
//     address recipient;
// }

struct AppStorage {
    address contractOwner;
    address childChainManager;
    address recipient;
    address poolInput;
    address poolOutput;
    uint256 amount0Out;
    // address arbiV2Router;
    address arbiDai;
}

// struct ArbiswapV2 {
//     address absV2Router;
//     address kovDai;
// }

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
