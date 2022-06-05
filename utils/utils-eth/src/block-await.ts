import { JsonRpcProvider } from "@ethersproject/providers";

export const blockAwait = async function (provider: JsonRpcProvider, blockDelay = 2): Promise<number> {
  return new Promise(resolve => {
    let initialBlockNumber = 0;
    provider.on("block", (blockNumber: number) => {
      if (!initialBlockNumber) {
        initialBlockNumber = blockNumber;
      }
      if (blockNumber === initialBlockNumber + blockDelay) {
        resolve(blockNumber);
      }
    });
  });
};
