import { JsonRpcProvider } from "@ethersproject/providers";

import { delay } from "./delay";

export const blockAwait = async function (provider: JsonRpcProvider, blockDelay = 2): Promise<void> {
  const initialBlock = await provider.getBlock("latest");
  let currentBlock;
  let delayB;
  do {
    await delay(5000);
    currentBlock = await provider.getBlock("latest");
    delayB = currentBlock.number - initialBlock.number;
  } while (delayB < blockDelay);
};
