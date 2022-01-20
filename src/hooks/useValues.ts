import { useCallback, useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import {
    HAVENTokenAddress,
    HAVENPairAddress,
    WBNBAddress,
} from '../constants/tokenAddresses';
import HAVENABI from '../constants/abi/HAVEN.json';
import WBNBABI from '../constants/abi/WBNB.json';
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

export const usePrice = () => {
    const [havenPrice, setHavenPrice] = useState(0);
    const [currencyPrice, setCurrencyPrice] = useState('0.000000');
    useEffect(() => {
        const getCurrentHAVENPrice = async () => {
            const totalBNBInLiquidityPool = await WBNBContract.methods
                .balanceOf(HAVENPairAddress)
                .call()
            const totalHAVENInLiquidityPool = await HAVENContract.methods
                .balanceOf(HAVENPairAddress)
                .call()

            const price = parseFloat(totalHAVENInLiquidityPool) !== 0 ? web3.utils
                .toBN(totalBNBInLiquidityPool)
                .div(web3.utils.toBN(totalHAVENInLiquidityPool))
                .toNumber() : 0;
            setHavenPrice(price / 1000000000)
            setCurrencyPrice((price / 10000000).toFixed(6).toString() + ' BNB')
        }

        getCurrentHAVENPrice();
    }, [])

    return { havenPrice, currencyPrice };
}

export const useBalance = (account: string) => {
    const [currencyBalance, setCurrencyBalance] = useState(0);

    useEffect(() => {
        const getCurrentHAVENBalance = async () => {
            if (account) {
                const balance = await HAVENContract.methods
                    .balanceOf(account)
                    .call()
                setCurrencyBalance(web3.utils.toBN(balance).toNumber() / 1000000000)
            }
        }
        getCurrentHAVENBalance();
    }, [])

    return currencyBalance;
}

export const useBNBReward = (account: string) => {
    const [reward, setReward] = useState(0);

    useEffect(() => {
        const getBNBReward = async () => {
            if (account) {
                const reward = await HAVENContract.methods
                    .calculateBNBReward(account)
                    .call()
                setReward(reward / 1000000000000000000)
            }
        }
        getBNBReward();
    }, [])

    return reward;
}

export const useTotalSupply = (account: string) => {
    const [totalSupply, setTotalSupply] = useState(0);
    useEffect(() => {
        const getTotalSupply = async () => {
            if (account) {
                const ts = await HAVENContract.methods
                    .totalSupply()
                    .call()
                // setTotalSupply(ts);
                setTotalSupply(ts / 1000000000000000000);
            }
        }
        getTotalSupply();
    }, [])
    return totalSupply;
}