import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import * as bsc from '@binance-chain/bsc-use-wallet'
import Button from '../../components/Button'
import Container from '../Container'
import { buyAddress } from '../../constants/tokenAddresses'

interface PageHeaderProps {
  icon: React.ReactNode
  title?: string
  description?: string
  account?: string
  balance?: number
  price?: number,
  totalSupply?: number
}

const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  title,
  description,
  account,
  balance,
  price,
  totalSupply
}) => {
  const { reset } = bsc.useWallet()
  
  const handleSignOutClick = useCallback(() => {
    reset()
  }, [reset])

  const getAccountAddress = () => {
    if (account) {
      var address =
        account.toString().substring(0, 8) +
        '...' +
        account.toString().substr(account.length - 8)
      return address
    }
    return ''
  }

  const myBalance = 'HAVEN ' + balance
  const token = '(' + (balance * price).toFixed(2) + ' $)'

  // const buyAddress =
  //   'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x0E3EAF83Ea93Abe756690C62c72284943b96a6Bc'

    // console.log('totalSupply ', totalSupply, balance, (balance / totalSupply) * 1000000000 * 100)

  return (
    <Container size="sm">
      <StyledPageHeader>
        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle>{title}</StyledTitle>
        <StyledText>Your Reward Share</StyledText>
        {totalSupply && <StyledText>{`${(balance / totalSupply * 1000000000 * 100).toFixed(3)} %`}</StyledText>}
        <StyledDescription>Buy More To Increase Your BNB Reward Share!</StyledDescription>
        <StyledDescription>Passive Income Made Simple!</StyledDescription>
        <StyledSignoutButtonArea>
          <StyledExternalLink href={buyAddress} target="__blank">
            Buy $HAVEN
          </StyledExternalLink>
        </StyledSignoutButtonArea>
      </StyledPageHeader>
    </Container>
  )
}

const StyledExternalLink = styled.a`
  align-items: center;
  background-color: #81cd2c;
  border-radius: 20px;
  color: #fff;
  display: flex;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  height: 42px;
  justify-content: center;
  margin-top: 10px;
  text-decoration: none;
`

const StyledSignoutButtonArea = styled.div`
  margin-top: 10px;
  width: 80%;
`

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
  padding-top: ${(props) => props.theme.spacing[2]}px;
  margin: 0 auto;
  font-size: 27px;
  @media (max-width: 767px) {
    padding-top: ${(props) => props.theme.spacing[2]}px;
  };
  width: 350px;
  max-width: 400px;
`

const StyledText = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  flex: 1 1 0%;
  line-height: 15px;
  text-align: center;
  color: #81cd2c;
  @media (max-width: 767px) {
  }
  padding: 5px;
`

const StyledDescription = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  flex: 1 1 0%;
  line-height: 15px;
  text-align: center;
  color: #81cd2c;
  @media (max-width: 767px) {
  }
  padding: 5px;
`
const StyledTitle = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 35px;
  color: #81cd2c;
  line-height: 44px;
  padding: 16px 0px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  @media (max-width: 767px) {
  }
`

const StyledIcon = styled.div`
  text-align: center;
  position: relative;
  margin-top: 0px;
  @media (max-width: 767px) {
    left: 0px;
  }
`

export default PageHeader
