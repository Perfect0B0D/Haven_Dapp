import React, { createContext, useEffect, useState } from 'react'
import * as bsc from '@binance-chain/bsc-use-wallet'
import { TokenContract } from '../../tokencontract'

export interface TokenContractContext {
  tokencontract?: typeof TokenContract
}

export const Context = createContext<TokenContractContext>({
  tokencontract: undefined,
})

declare global {
  interface Window {
    oneUPsauce: any
  }
}

const TokenContractProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = bsc.useWallet()
  const [tokencontract, setTokenContract] = useState<any>()
  
  // @ts-ignore
  window.tokencontract = tokencontract
  // @ts-ignore

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const tokencontractLib = new TokenContract(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setTokenContract(tokencontractLib)
      window.oneUPsauce = tokencontractLib
    }
  }, [ethereum])

  return <Context.Provider value={{ tokencontract }}>{children}</Context.Provider>
}

export default TokenContractProvider
