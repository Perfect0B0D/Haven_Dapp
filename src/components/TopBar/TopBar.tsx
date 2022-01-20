import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import * as bsc from '@binance-chain/bsc-use-wallet'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import mainImg from '../../assets/img/logo.png';
import Button from '../Button';
import useModal from '../../hooks/useModal'
import WalletProviderModal from '../WalletProviderModal'
import AccountModal from './components/AccountModal'
import { Grid } from '@material-ui/core';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const RedCheckbox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    maxWidth: 500,
    borderRadius: 20,
  }
}));

const TopBar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory()

  const { account } = bsc.useWallet()

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (event: Event) => {
    if (window.pageYOffset > 140) setShow(true);
    else setShow(false);
  }

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  const getAccountAddress = () => {
    if (account) {
      var address =
        account.toString().substring(0, 8) +
        '...' +
        account.toString().substr(account.length - 8)
      return address
    }
  }

  if (account) {
    history.push('/dashboard')
  } else {
    history.push('/')
  }

  const [show, setShow] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [invalid, setInvalid] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!checked) {
      setInvalid(true);
      return;
    }
    setOpen(false);
    handleUnlockClick();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
    setChecked(event.target.checked);
    setInvalid(false);
  };

  return (
    <StyledHeadArea className={show ? "header-scrolled" : ""}>
      <Grid container>
        <Grid item  xs={12} sm={12} md={6}>
          <HomeRightArea>
            <LogoArea>
              <img style={{ width: 50, height: 50 }} src={mainImg} />
            </LogoArea>
          </HomeRightArea>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <HomeRightArea>
            <StyledSignoutButtonArea>
              <Button
                disabled={false}
                onClick={handleClickOpen}
                size="lg"
                text="Connect to a wallet"
              />
              {/* <AccountButton /> */}
            </StyledSignoutButtonArea>
          </HomeRightArea>
        </Grid>
      </Grid>
      {/* <LogoArea>
        <img style={{ width: 50 }} src={mainImg} />
      </LogoArea>
      <HomeRightArea>
        <StyledSignoutButtonArea>
          <Button
            disabled={false}
            onClick={handleClickOpen}
            size="lg"
            text="Connect to a wallet"
          />
        </StyledSignoutButtonArea>
      </HomeRightArea> */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        classes={{ paperScrollPaper: classes.dialogPaper }}
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>{"Disclaimer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ fontSize: 12 }}>
            {`Trading cryptocurrencies carries a `}
            <StyledText>high level of risk</StyledText>
            {`, and may not be suitable for all investors. `}
            <StyledText>Before deciding to trade cryptocurrency</StyledText>
            {` you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose. ICO's, IEO's, STO's and any other form of offering will not guarantee a return on your investment.`}
            <br /><br /><StyledText>You should be aware of all the risks associated with cryptocurrency trading, and seek advice from an independent financial advisor</StyledText><br /><br />
            {`Any opinions, news, research, analyses, prices, or other information contained on this website is provided as general market commentary, and does not constitute investment advice. The safehaven.finance and its affiliates will not accept liability for any loss or damage, including without limitation to, any loss of profit, which may arise directly or indirectly from use of or reliance on such information. All opinions expressed on this site are owned by the respective writer and should never be considered as advice in any form.

The safehaven.finance and its affiliates makes no representation or warranties as to the accuracy and or timelines of the information contained herein. A qualified professional should be consulted before making any financial decisions.
 `}<br /><br />
            <FormControlLabel
              control={invalid ? <RedCheckbox checked={checked} onChange={handleChange} name="checked" /> : <GreenCheckbox checked={checked} onChange={handleChange} name="checked" />}
              label={<StyledText style={{ color: invalid ? '#f00' : '#81cd2c' }}>I understand and accept that I will trade/invest haven at my own risks</StyledText>}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: '20px 100px' }}>
          <Button onClick={handleClose}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </StyledHeadArea>
  )
}


const StyledHeadArea = styled.div`
width: 100%;
display: flex;
top: 0;
// justify-content: space-between;
position: -webkit-sticky;
position: fixed;
top: 0px;
z-index: 1000;
// padding: 10px 200px;
`
const LogoArea = styled.div`
width: 25%;
justify-content: center;
display: flex;
`
const HomeRightArea = styled.div`
// width: 75%;
// display: flex;
// align-items: center;
// justify-content: flex-end;
justify-content: center;
    display: flex;
    padding: 10px 0;
    width: 100%;
`
const StyledSignoutButtonArea = styled.div`
`

const StyledText = styled.span`
  color: #81cd2c;
  font-weight: 800;
  font-size: 12px;
`

export default TopBar
