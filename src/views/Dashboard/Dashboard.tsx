import React, { useState } from 'react'
import styled from 'styled-components'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import { Input, Grid, Zoom, SvgIcon, IconButton, useMediaQuery } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import * as bsc from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import HAVENABI from '../../constants/abi/HAVEN.json'
import WBNBABI from '../../constants/abi/WBNB.json'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import mainImg from '../../assets/img/logo.png'
import bnbInPool from '../../assets/img/bnb_in_pool.png'
import currentPrice from '../../assets/img/current_price.png'
import liquidityPool from '../../assets/img/liquidity_pool.png'
import maxAmount from '../../assets/img/max_transaction_amount.png'
import rewardPool from '../../assets/img/reward_pool.png'
import balanceImg from '../../assets/img/balance.png'
import { useHistory } from 'react-router-dom'
import WriteClaim from './components/WriteClaim'
import ReadContractItem from './components/ReadContractItem'
import SendTokenBox from './components/SendTokenBox'
import Timer from './components/Timer'

import { sendTokenContract } from '../../tokencontract/utils'
import {
  HAVENTokenAddress,
  HAVENPairAddress,
  WBNBAddress,
} from '../../constants/tokenAddresses'
import { setUncaughtExceptionCaptureCallback } from 'process'
import useTokenContract from '../../hooks/useTokenContract'
import { useEffect } from 'react'
import Header from './components/Header'
import StyledCard from './components/StyledCard';
import RewardCalcModal from './components/RewardCalcModal';
import { Paper, makeStyles } from '@material-ui/core';

const Home: React.FC = () => {
  AOS.init();
  const history = useHistory()
  const wallet = bsc.useWallet()

  if (wallet.account == null) {
    history.push('/')
  }

  const [totalSupply, setTotalSupply] = useState(0);
  const [maxTransaction, setMaxTransaction] = useState('')
  const [totalBNB, setTotalBNB] = useState('')
  const [totalBNBValue, setTotalBNBValue] = useState(0)
  const [totalLiquidity, setTotalLiquidity] = useState('')
  const [BNBPrice, setBNBPrice] = useState(0)
  const [HAVENPrice, setHAVENPrice] = useState(0)
  const [currencyPrice, setCurrencyPrice] = useState('')
  const [currentBalance, setCurrencyBalance] = useState(0)
  const [claim, setClaim] = useState('')
  const [timer, setTimer] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [remainTime, setRemainTime] = useState("");
  const [isExistClaimTime, setClaimTime] = useState(false);
  const [show, setShow] = useState(false);
  const [showBelow, setShowBelow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [BNBRewardPool, setRewardPool] = useState('')

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

  const getMaxTransactionAmount = async () => {
    const maxTransactionAmount = await HAVENContract.methods
      ._maxTxAmount()
      .call()
    setMaxTransaction('$HAVEN ' + maxTransactionAmount / 1000000000)
  }

  const getTotalBNBInLiquidityPool = async () => {
    const totalBNBInLiquidityPool = await WBNBContract.methods
      .balanceOf(HAVENPairAddress)
      .call()
    setTotalBNBValue(totalBNBInLiquidityPool)
    setTotalBNB(
      parseFloat(web3.utils.fromWei(
        web3.utils.toBN(totalBNBInLiquidityPool).toString(),
        'ether',
      )).toFixed(6) + ' BNB',
    )
  }

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

    setHAVENPrice(price / 1000000000)
    setCurrencyPrice((price / 10000000).toFixed(6).toString() + ' BNB')
  }

  const getCurrentHAVENBalance = async () => {
    if (wallet.account) {
      const balance = await HAVENContract.methods
        .balanceOf(wallet.account)
        // .balanceOf('0x1d17105700a1fa29f94281699f15ffb64f886860')
        .call()
      setCurrencyBalance(web3.utils.toBN(balance).toNumber() / 1000000000)
    }
  }

  const getNextClaimDate = async () => {
    if (wallet.account) {
      const timestamp = await HAVENContract.methods
        .nextAvailableClaimDate(wallet.account)
        .call()

      setClaim('You can claim ' + (new Date(timestamp * 1000)).toString())

      var second = (Math.floor((timestamp * 1000 - new Date().getTime()) / 1000 % 60));
      var minute = (Math.floor((timestamp * 1000 - new Date().getTime()) / 1000 / 60 % 60));
      var hour = (Math.floor((timestamp * 1000 - new Date().getTime()) / 1000 / 60 / 60 % 24));
      var day = (Math.floor((timestamp * 1000 - new Date().getTime()) / 1000 / 60 / 60 / 24));
      setClaim('You can claim ' + (new Date(timestamp * 1000)).toString())
      if (timestamp == 0) {
        setRemainTime("Claim BNB every 72 hours");
        setClaimTime(false);
      } else {
        setRemainTime("Time: " + day + "Days " + hour + "Hours " + minute + "Minutes " + second + "Seconds");
        setClaimTime(true);
      }

      return
    }
    setClaim('You can claim now')
  }

  const tokenContract = useTokenContract()

  const sendToken = async () => {
    sendTokenContract(tokenContract, address, parseInt(amount) * 10 ** 9)
  }

  const getBalance = async () => {
    const balance = await web3.eth.getBalance(HAVENTokenAddress)
    setRewardPool(
      web3.utils.fromWei(web3.utils.toBN(balance).toString(), 'ether'),
    )
  }

  const getTotalSupply = async () => {
    if (wallet.account) {
      const ts = await HAVENContract.methods
        .totalSupply()
        .call()
      // console.log('web3.utils.toBN(ts).toNumber() / 1000000000 => ', ts, web3.utils.toBN(100).toNumber() / 1000000000)
      // setCurrencyBalance(web3.utils.toBN(ts).toNumber() / 1000000000)
      setTotalSupply(ts);
    }
  }

  useEffect(() => {
    getBNBPrice()
    getMaxTransactionAmount()
    getTotalBNBInLiquidityPool()
    getCurrentHAVENPrice()
    getCurrentHAVENBalance()
    getNextClaimDate()
    getBalance()
    getTotalSupply()
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (event: Event) => {
    if (window.pageYOffset > 140) setShow(true);
    else setShow(false);
    if (window.pageYOffset > 0) setShowBelow(true);
    else setShowBelow(false)
  }

  const setOpenModal = (flag: boolean) => {
    setShowModal(flag)
  }

  const isMobile = useMediaQuery('(max-width: 960px)');

  // console.log('totalSupply ==****=> ', totalSupply)
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: 10,
      minWidth: 300
    },
    mobileRoot: {
      borderRadius: 10,
      width: '100%'
    }
  }));
  const classes = useStyles();
  return (
    <Page>
      <Header account={wallet ? wallet.account : ''} balance={currentBalance} />
      <StyledRowArea style={{ paddingTop: isMobile ? 160 : 60, }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <StyledDetail>
              {/* <StyledCard> */}
              <div className="bounce" style={{ width: isMobile ? '100%' : 'auto' }}>
                <Paper elevation={3} classes={{ root: isMobile ? classes.mobileRoot : classes.root }}>
                  <PageHeader
                    icon={
                      <img style={{ width: 120, height: 120, borderRadius: 25 }} src={mainImg} />
                    }
                    title="$HAVEN"
                    description="Earn BNB by Holding $HAVEN"
                    account={wallet ? wallet.account : ''}
                    balance={currentBalance}
                    price={HAVENPrice * BNBPrice}
                    totalSupply={totalSupply}
                  />
                </Paper>
              </div>
              {/* </StyledCard> */}
            </StyledDetail>
          </Grid>
          {showBelow ? <>
            <Grid item xs={12}>
              <div
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <WriteClaim claim={claim} balance={currentBalance} timeValue={remainTime} isExistClaimTime={isExistClaimTime}/> : {""}
                {/* {isExistClaimTime ?
                  <WriteClaim claim={claim} balance={currentBalance} timeValue={remainTime} /> : ""
                } */}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Zoom in={true}>
                <ReadContractItem
                  icon={maxAmount}
                  title="Max Transaction Amount"
                  description={maxTransaction}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ReadContractItem
                icon={liquidityPool}
                title="Total Liquidity Pool"
                description={
                  '$ ' +
                  ((totalBNBValue * BNBPrice) / 1000000000000000000).toFixed(6).toString()
                }
                delay="400"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ReadContractItem
                icon={bnbInPool}
                title="Total BNB in liquidity pool"
                description={totalBNB}
                delay="500"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ReadContractItem
                icon={currentPrice}
                title="Current 100 HAVEN price"
                description={currencyPrice}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ReadContractItem
                icon={rewardPool}
                title="Total BNB in reward pool"
                description={`BNB ${parseFloat(BNBRewardPool).toFixed(6)}`}
                delay="400"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ReadContractItem
                icon={balanceImg}
                title="Your $HAVEN balance"
                // description={`$ ${(HAVENPrice * BNBPrice).toFixed(6)}`}
                description={`$ ${(currentBalance).toFixed(6)}`}
                delay="500"
              />
            </Grid>
            <Grid item xs={12}>
              <div
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <SendTokenBox
                  sendToken={sendToken}
                  setAddress={setAddress}
                  setAmount={setAmount}
                  address={address}
                  amount={''}
                />
              </div>
            </Grid>
          </> : <div style={{ width: '100%', height: 300 }}></div>}
        </Grid>
      </StyledRowArea>
      {/* <RewardCalButton className="reward-cal-button" onClick={() => setShowModal(true)}>
        Reward Calculator
      </RewardCalButton> */}
      <RewardCalcModal open={showModal} setOpen={setOpenModal} />
      <Footer />
      {show && <IconButton style={{ background: '#479cf3', position: 'fixed', bottom: 20, right: 20 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUpwardIcon style={{ color: 'white' }} />
      </IconButton>}
    </Page>
  )
}

const StyledRowArea = styled.div`
      width: 100%;
      display: -ms-flexbox;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
      padding: 60px 20px;
      @media (min-width: 960px) {
        padding: 60px 80px;
      }
      @media (min-width: 1440px) {
        padding: 60px 140px;
      }
      @media (min-width: 1640px) {
        padding: 60px 160px;
      }
      `

const StyledDetail = styled.div`
      -ms-flex: 0 0 25%;
      flex: 0 0 25%;
      width: 100%;
      justify-content: center;
      align-items: center;
      display: flex;
      `
const Footer = styled.div`
      width: 100%;
      height: 120px;
      background: #81cd2c;

      bottom: 0;
      `
const RewardCalButton = styled.a`
      position: fixed;
      top: 50%;
      right: -48px;
      background: #81cd2c;
      -webkit-transform: rotate(
      90deg
      );
      transform: rotate(
      90deg
      );
      color: #fff;
      padding: 10px;
      border-radius: 0 0 5px 5px;
      font-size: 16px;
      letter-spacing: 0;
      z-index: 1;
      `
export default Home
