import { ContractReceipt } from 'ethers';
import { ethers } from "hardhat";

export function getTokensFromEventArgs(txReceipt: ContractReceipt, eventName: string) {
    let storage: string[] = [];
    for (const event of txReceipt.events as Array<any>) {
        if (event.event == eventName) {
            for (const token of event?.args[0]) {
                storage.push(token.toString());
            }
        }
    }
    return storage;
}

export async function getBlockTimestamp() {
    const blockNumber = await ethers.provider.getBlockNumber()
    const block = await ethers.provider.getBlock(blockNumber)
    return block.timestamp;
}

export function shuffle(tokens: number[] | string[]) {
    let copy = [], n = tokens.length, i;

    while (n) {
        i = Math.floor(Math.random() * tokens.length);

        if (i in tokens) {
            copy.push(tokens[i]);
            delete tokens[i];
            n--;
        }
    }

    return copy;
}