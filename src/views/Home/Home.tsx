import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Page from '../../components/Page'
import TopBar from '../../components/TopBar'
import { buyAddress } from '../../constants/tokenAddresses';
import { Grid, makeStyles } from '@material-ui/core';

const StyledIcon = styled.img`
  width: 100px;
`
const StyledTopArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
`

const StyledLogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledTitle = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 1rem;
`

const StyledTokenName = styled.div`
  text-align: center;
  font-weight: 800;
  font-size: 24px;
  padding: 10px;
`

const StyledDetailsTitle = styled.div`
  text-align: center;
  font-size: 2rem;
  margin-bottom: .5rem;
  font-weight: 800;
  line-height: 1.2;
`

const StyledDetails = styled.div`
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: .5rem;
  font-weight: 800;
  line-height: 1.2;
`

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

const StyledHomeContainer = styled.div`
  padding: 0 50px;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
  },
  gridRoot: {
    width: '100%'
  }
}));

const Home: React.FC = () => {
  AOS.init();
  const classes = useStyles();
  // const buyAddress =
  //   'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x0E3EAF83Ea93Abe756690C62c72284943b96a6Bc'
  return (
    <Page>
      <TopBar />
      <StyledHomeContainer>
        <StyledTopArea>
          <Grid container>
            <Grid item sm={12} md={4}></Grid>
            <Grid item sm={12} md={4} classes={{ root: classes.gridRoot }}>
              <div className="bounce" style={{ width: '100%', }}>
                <Paper elevation={3} style={{ padding: 40 }} classes={{ root: classes.root }}>
                  <StyledLogoContainer>
                    <StyledIcon src="/assets/image/logo.png" />
                  </StyledLogoContainer>
                  <StyledTokenName>$HAVEN</StyledTokenName>
                  <StyledTitle>Passive income made simple</StyledTitle>
                  <StyledExternalLink href={buyAddress} target="__blank">
                    Buy $HAVEN
                  </StyledExternalLink>
                </Paper>
              </div>
            </Grid>
            <Grid item sm={12} md={4}></Grid>
          </Grid>
        </StyledTopArea>
        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="bounce"
          style={{ width: '100%', padding: '100px 0' }}
        >
          <Paper elevation={3} style={{ padding: 40, paddingBottom: 100 }}>
            <StyledDetailsTitle>You are not connected or not using Binance Smart Chain network</StyledDetailsTitle>
            <StyledDetails>To use the app, make sure:</StyledDetails>
            <StyledDetails>You are using the Binance Smart Chain network You need to connect wallet to continue</StyledDetails>
            <div style={{ marginTop: 50 }}>
              <StyledDetails>Please switch to BSC Network if you use:</StyledDetails>
              <StyledDetails>Metamask</StyledDetails>
              <StyledDetails>TrustWallet</StyledDetails>
            </div>
          </Paper>
        </div>
      </StyledHomeContainer>
    </Page>
  )
}

export default Home
