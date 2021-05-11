// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

/// Author: zen2see
/// Uses Diamond standard 

import {AppStorage} from "./libraries/LibAppStorage.sol";
import {LibMeta} from "../shared/libraries/LibMeta.sol";
import {LibDiamond} from "../shared/libraries/LibDiamond.sol";
import {IDiamondCut} from "../shared/interfaces/IDiamondCut.sol";
import {IDiamondLoupe} from "../shared/interfaces/IDiamondLoupe.sol";
import {IERC165} from "../shared/interfaces/IERC165.sol";
import {IERC173} from "../shared/interfaces/IERC173.sol";

contract InitDiamond {
    AppStorage internal s;

    struct Args {
        // address recipient;
        // address poolInput;
        // address poolOutput;
        // uint256 amount0Out;
        //address childChainManager;
        //address absV2Router;
        address arbiDai;
    }

    function init(Args memory _args) external {
        // s.recipient = _args.recipient;
        // s.poolInput = _args.poolInput;
        // s.poolOutput = _args.poolOutput;
        // s.amount0Out = _args.amount0Out;
        //s.childChainManager = _args.childChainManager;
        // s.arbiV2Router = _args.absV2Router;
        s.arbiDai = _args.arbiDai;

        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        // adding ERC165 data
        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
        ds.supportedInterfaces[type(IERC173).interfaceId] = true;      
    }
}
