import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import * as bsc from '@binance-chain/bsc-use-wallet'
import mainImg from '../../../assets/img/logo.png'
import Button from '../../../components/Button'
import { Grid, useMediaQuery } from '@material-ui/core'

interface HeaderProps {
    account?: any,
    balance?: any
}

const Header: React.FC<HeaderProps> = ({ account, balance }) => {
    const [show, setShow] = useState(false);
    const { reset } = bsc.useWallet()
    const handleSignOutClick = useCallback(() => {
        reset()
    }, [reset])

    // const isMobile = useMediaQuery({
    //     query: '(max-width: 767px)'
    // })
    const isMobile = useMediaQuery('(max-width: 767px)');

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleScroll = (event: Event) => {
        if (window.pageYOffset > 140) setShow(true);
        else setShow(false);
    }

    const getAccountAddress = () => {
        if (account) {
            // var address =
            //     account.toString().substring(0, 8) +
            //     '...' +
            //     account.toString().substr(account.length - 8)
            // return address
            return isMobile ?
                account.toString().substring(0, 8) +
                '...' +
                account.toString().substr(account.length - 8)
                :
                account.toString();
        }
        return ''
    }

    const myBalance = '$HAVEN ' + balance

    return (
        <StyledHeadArea className={show ? "header-scrolled" : ""}>
            <Grid container>
                <Grid item xs={12} sm={12} md={4}>
                    <LogoArea>
                        <img style={{ width: 50, height: 50 }} src={mainImg} />
                    </LogoArea>
                </Grid>
                {!show && <>
                    <Grid item xs={12} sm={12} md={4}>
                        <RowArea>
                            <AddressArea>
                                <StyledInfo>{`${getAccountAddress()} (${myBalance})`}</StyledInfo>
                            </AddressArea>
                        </RowArea>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <RowArea>
                            <StyledSignoutButtonArea>
                                <Button
                                    onClick={handleSignOutClick}
                                    text="Sign out"
                                    variant="secondary"
                                />
                            </StyledSignoutButtonArea>
                        </RowArea>
                    </Grid>
                </>}
            </Grid>
        </StyledHeadArea>
    )
}

export default Header

const StyledHeadArea = styled.div`
width: 100%;
display: flex;
top: 0;
justify-content: space-between;
position: -webkit-sticky;
position: fixed;
top: 0px;
z-index: 1000;
// padding: 10px 200px;
`
const LogoArea = styled.div`
// width: 25%;
    width: 100%;
    justify-content: center;
    display: flex;
    padding: 10px 0;
`

const RightArea = styled.div`
width: 75%;
display: flex;
align-items: center;
justify-content: space-around;
`
const StyledInfo = styled.div`
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-size: 15px;
  line-height: 16px;
  font-weight: bold;
  margin: auto;
  text-align: left;
  cursor: pointer;
  overflow-wrap: anywhere;
`

const StyledSignoutButtonArea = styled.div`
// width: 100%;
// justify-content: center;
// display: flex;
// padding: 10px 0;
`

const AddressArea = styled.div`
background-color: #81cd2c;
color: #fff;
border-radius: 100px;
padding: 12px 20px;
`

const RowArea = styled.div`
width: 100%;
justify-content: center;
display: flex;
padding: 10px 0;
`