// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import './LibReentryProtectionStorage.sol';

contract ReentryProtection {
  modifier noReentry {
    // Use counter to only write to storage once
    LibReentryProtectionStorage.RPStorage storage s = LibReentryProtectionStorage.rpStorage();
    s.lockCounter++;
    uint256 lockValue = s.lockCounter;
    _;
    require(
      lockValue == s.lockCounter,
      "ReentryProtectionFacet.noReentry: reentry detected"
    );
  }
}