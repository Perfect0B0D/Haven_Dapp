import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import {
    HAVENTokenAddress,
    HAVENPairAddress,
    WBNBAddress,
} from '../constants/tokenAddresses';
import HAVENABI from '../constants/abi/HAVEN.json'
import WBNBABI from '../constants/abi/WBNB.json'
import { useEffect, useState } from 'react';

const web3 = new Web3(
    // new Web3.providers.HttpProvider(process.env.RPC_URL),
    new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org'),
)

const HAVENContract = new web3.eth.Contract(
    HAVENABI as unknown as AbiItem,
    HAVENTokenAddress,
)

const WBNBContract = new web3.eth.Contract(
    WBNBABI as unknown as AbiItem,
    WBNBAddress,
)

export const useTokenBalance = (account: string) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            const bal = await HAVENContract.methods
                .balanceOf(account)
                .call()
            setBalance(bal);
        }
        if (account) {
            fetchBalance()
        }
    }, [])
    return balance;
}

export const useBNBPrice = () => {
    const [bnbPrice, setBNBPrice] = useState(0);
    useEffect(() => {
        const getBNBPrice = async () => {
            const prices = await fetch(
                'https://api3.binance.com/api/v3/ticker/price',
            ).then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            setBNBPrice(prices[98].price)
        }
        getBNBPrice();
    }, [])
    return bnbPrice;
}