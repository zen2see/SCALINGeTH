// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import '../libraries/LibAppStorage.sol';
import '../libraries/SafeCast.sol';
import '../libraries/TickMath.sol';
import '../interfaces/IERC20Minimal.sol';
import '../interfaces/callback/IUniswapV3SwapCallback.sol';
import '../../shared/libraries/LibMeta.sol';
// import '../interfaces/IUniswapV3pool.sol';

///@title UniswapV3 L2 with Arbitrum for SCALLINGETH Hackathon
///@author zen2see
///@notice Demonstrating L2 
///@dev Using EIP-2535 Diamond standard - Nick Mudge
contract ArbiSwapV3Facet is IUniswapV3SwapCallback {
    using SafeCast for uint256;

    AppStorage internal s;

    ///@notice Flash swaps for an exact amount of token0 in the output pool
    function swapForExact0Multi(
        address recipient,
        address poolInput,
        address poolOutput,
        uint256 amount0Out
    ) external {
        // address sender = LibMeta.msgSender();
        s.recipient = recipient; 
        s.poolInput = poolInput;
        s.poolOutput = poolOutput;
        s.amount0Out = amount0Out; 

        address[] memory pools = new address[](1);
        pools[0] = s.poolInput;
        IUniswapV3Pool(s.poolOutput).swap(
            s.recipient,
            false,
            s.amount0Out.toInt256(),
            TickMath.MAX_SQRT_RATIO - 1,
            abi.encode(pools, msg.sender)
        );
    }

    ///@notice Flash swaps for an exact amount of token1 in the output pool
    function swapForExact1Multi(
        address recipient,
        address poolInput,
        address poolOutput,
        uint256 amount1Out
    ) external {
        s.recipient = recipient;
        s.poolInput = poolInput;
        s.poolOutput = poolOutput;
        amount1Out; 

        address[] memory pools = new address[](1);
        pools[0] = s.poolInput;
        IUniswapV3Pool(s.poolOutput).swap(
            recipient,
            true,
            -amount1Out.toInt256(),
            TickMath.MIN_SQRT_RATIO + 1,
            abi.encode(pools, msg.sender)
        );
    }

    event SwapCallback(int256 amount0Delta, int256 amount1Delta);

    function uniswapV3SwapCallback(
        int256 amount0Delta,
        int256 amount1Delta,
        bytes calldata data
    ) public override {
        emit SwapCallback(amount0Delta, amount1Delta);

        (address[] memory pools, address payer) = abi.decode(data, (address[], address));

        if (pools.length == 1) {
            address tokenToBePaid = 
                ///@dev Get the address and amount of the token that we need to pay
                amount0Delta > 0 ? IUniswapV3Pool(msg.sender).token0() : IUniswapV3Pool(msg.sender).token1();
            int256 amountToBePaid = amount0Delta > 0 ? amount0Delta : amount1Delta;
            
            bool zeroForOne = tokenToBePaid == IUniswapV3Pool(pools[0]).token1();
            IUniswapV3Pool(pools[0]).swap(
                msg.sender,
                zeroForOne,
                -amountToBePaid,
                zeroForOne ? TickMath.MIN_SQRT_RATIO + 1 : TickMath.MAX_SQRT_RATIO - 1,
                abi.encode(new address[](0), payer)
            );
        } else {
            if (amount0Delta > 0) {
                IERC20Minimal(IUniswapV3Pool(msg.sender).token0()).transferFrom(
                    payer,
                    msg.sender,
                    uint256(amount0Delta)
                );
            } else {
                IERC20Minimal(IUniswapV3Pool(msg.sender).token1()).transferFrom(
                    payer,
                    msg.sender,
                    uint256(amount1Delta)
                );
            }
        }
    }
}