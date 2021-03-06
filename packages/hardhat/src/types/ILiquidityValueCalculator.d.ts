/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface ILiquidityValueCalculatorInterface extends ethers.utils.Interface {
  functions: {
    "computeLiquidityShareValue(uint256,address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "computeLiquidityShareValue",
    values: [BigNumberish, string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "computeLiquidityShareValue",
    data: BytesLike
  ): Result;

  events: {};
}

export class ILiquidityValueCalculator extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  listeners<T, G>(
    eventFilter?: TypedEventFilter<T, G>
  ): Array<TypedListener<T, G>>;
  off<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  on<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  once<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  removeListener<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  removeAllListeners<T, G>(eventFilter: TypedEventFilter<T, G>): this;

  queryFilter<T, G>(
    event: TypedEventFilter<T, G>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<T & G>>>;

  interface: ILiquidityValueCalculatorInterface;

  functions: {
    computeLiquidityShareValue(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "computeLiquidityShareValue(uint256,address,address)"(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  computeLiquidityShareValue(
    liquidity: BigNumberish,
    tokenA: string,
    tokenB: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "computeLiquidityShareValue(uint256,address,address)"(
    liquidity: BigNumberish,
    tokenA: string,
    tokenB: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    computeLiquidityShareValue(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        tokenAAmount: BigNumber;
        tokenBAmount: BigNumber;
      }
    >;

    "computeLiquidityShareValue(uint256,address,address)"(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        tokenAAmount: BigNumber;
        tokenBAmount: BigNumber;
      }
    >;
  };

  filters: {};

  estimateGas: {
    computeLiquidityShareValue(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "computeLiquidityShareValue(uint256,address,address)"(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    computeLiquidityShareValue(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "computeLiquidityShareValue(uint256,address,address)"(
      liquidity: BigNumberish,
      tokenA: string,
      tokenB: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
