// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import '../../shared/libraries/LibDiamond.sol';
import '../../shared/interfaces/IERC173.sol';

contract OwnershipFacet is IERC173 {
    function transferOwnership(address _newOwner) external override {
        LibDiamond.enforceIsContractOwner();
        LibDiamond.setContractOwner(_newOwner);
    }

    function owner() external view override returns (address owner_) {
        owner_ = LibDiamond.contractOwner();
    }
}