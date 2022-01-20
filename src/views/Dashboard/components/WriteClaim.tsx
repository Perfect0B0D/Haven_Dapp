import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import * as bsc from '@binance-chain/bsc-use-wallet'
import Button from '../../../components/Button'
import rewardPool from '../../../assets/img/reward_pool.png'
import HAVENABI from '../../../constants/abi/HAVEN.json'
import { claimBNBReward } from '../../../tokencontract/utils'
import useTokenContract from '../../../hooks/useTokenContract'
import { HAVENTokenAddress } from '../../../constants/tokenAddresses'

const StyledArea = styled.div`
  box-sizing: border-box;
  margin: 0px;
  width: 100%;
  padding: 20px;
  margin-bottom: 40px;
  position: relative;
  border: 1px solid #81cd2c;
  border-radius: 20px;
  font-family: 'Nunito';
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
  background: white;
`

const StyledIconArea = styled.div`
  border-right: 2px solid #81cd2c;
  text-align: center;
  padding: 0.25rem !important;
  -ms-flex: 0 0 25%;
  flex: 0 0 25%;
  max-width: 25%;
`

const StyledInfoArea = styled.div`
  align-self: center;
  text-align: center;
  padding: 0.5rem !important;
  -ms-flex: 0 0 75%;
  flex: 0 0 75%;
  max-width: 75%;
`

const StyledClaimButtonArea = styled.div`
  max-width: 100%;
  margin-top: 10px;
  // margin-left: 25%;
`

const StyledIcon = styled.div`
  text-align: center;
  position: relative;
  margin-top: 0px;
  @media (max-width: 767px) {
    left: 0px;
  }
`
const StyledInfo = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  margin: 10px;
`
const StyledRewards = styled.div`
  font-size: 1rem;
  font-weight: 800;
  margin: 10px;
  color: #81cd2c;
`

const StyledNote = styled.div`
  font-size: 13px;
  font-weight: 500;
  // color: #81cd2c;
  text-align: center;
  margin-top: 10px;
`

const StyledValue = styled.span`
  font-size: bold;
  font-size: 24px;
`

interface WriteClaimProps {
  claim: string,
  balance?: number,
  timeValue?: string,
  isExistClaimTime?: boolean,
}

const WriteClaim: React.FC<WriteClaimProps> = ({ claim, balance, timeValue, isExistClaimTime }) => {
  const history = useHistory()
  const [calculatedReward, setCalculatedReward] = useState(0)
  const [BNBRewardPool, setRewardPool] = useState('')

  const wallet = bsc.useWallet()

  if (wallet.account == null) {
    history.push('/')
  }

  const web3 = new Web3(
    // new Web3.providers.HttpProvider(process.env.RPC_URL),
    new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org'),
  )

  const HAVENContract = new web3.eth.Contract(
    HAVENABI as unknown as AbiItem,
    HAVENTokenAddress,
  )

  const getBalance = async () => {
    const balance = await web3.eth.getBalance(HAVENTokenAddress)
    setRewardPool(
      web3.utils.fromWei(web3.utils.toBN(balance).toString(), 'ether'),
    )
  }

  const getMaxTransactionAmount = async () => {
    if (wallet.account) {
      const reward = await HAVENContract.methods
        .calculateBNBReward(wallet.account)
        .call()
      setCalculatedReward(reward / 1000000000000000000)
    }
  }

  const tokenContract = useTokenContract()

  const handleClaimClick = () => {
    claimBNBReward(tokenContract)
  }

  getMaxTransactionAmount()
  getBalance()

  // console.log('BNBRewardPool ==> ', BNBRewardPool, balance)

  return (
    <div className="bounce">
      <StyledArea>
        <StyledInfoArea>
          {/* <StyledInfo> {claim} </StyledInfo> */}
          <StyledInfo> {`My collectable BNB: ${calculatedReward.toFixed(6)} BNB`} </StyledInfo>
          <StyledRewards>{`*Forecasted Annual BNB Rewards: ${(calculatedReward * 120).toFixed(6)} BNB`}</StyledRewards>
          {/* <StyledInfo>
            My reward: <StyledValue>0.000000 BNB</StyledValue>
          </StyledInfo> */}
          <StyledNote>*Pool and Rewards are always changing based on buys, sells, collects by others and your percentage holdings.</StyledNote>
          {balance !== 0 && <StyledInfo style={{}}>{`Next Collect Date: ${timeValue}`}</StyledInfo>}
          {/* <StyledInfo style={{}}>{`Next Collect Date: ${balance === 0 && 'You need to Buy and Hold Tokens to Earn BNB'}`}</StyledInfo> */}
          {/* <StyledNote>
            *pool is always changing based on buys, sells, and collects by others,
            learn more here{' '}
            <span>
              <a href="#" target="_blank">
                <i className="fa fa-question-circle"></i>
              </a>
            </span>
          </StyledNote>
          <StyledInfo>
            You will be received {calculatedReward} BNB (after tax)
          </StyledInfo> */}
          <StyledClaimButtonArea>
            <Button onClick={handleClaimClick} disabled={balance === 0 || isExistClaimTime}>
              <span>
                <i className="fa fa-gift"></i> Claim My Reward
              </span>
            </Button>
          </StyledClaimButtonArea>
        </StyledInfoArea>
      </StyledArea>
    </div>
  )
}

export default WriteClaim
