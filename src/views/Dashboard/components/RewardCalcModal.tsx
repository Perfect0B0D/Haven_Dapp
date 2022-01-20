import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import * as bsc from '@binance-chain/bsc-use-wallet'
import mainImg from '../../../assets/img/logo.png'
import Button from '../../../components/Button'
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import { Dialog, Grid, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useBNBPrice, useTokenBalance } from '../../../hooks/useTokenBalance'
import { buyAddress } from '../../../constants/tokenAddresses'
import { useBalance, useBNBReward, usePrice, useTotalSupply } from '../../../hooks/useValues'

interface RewardCalcModalProps {
    open?: boolean,
    setOpen?: Function
}
const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
            background: '#81cd2c'
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        titleContainer: {
            background: '#81cd2c'
        }
    });

const useStyles = makeStyles(theme => ({
    dlg: {
        maxWidth: 850
    },
    closeIcon: {
        color: 'white'
    },
    table: {
        minWidth: 800,
    },
    dialogContent: {
        overflowX: 'hidden',
        padding: 20,
    }
}));

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    const cls = useStyles();
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {/* <Typography variant="h6">{children}</Typography> */}
            <div><Typography variant="h6" style={{ color: 'white' }}>{children}</Typography></div>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon classes={{ root: cls.closeIcon }} />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const RewardCalcModal: React.FC<RewardCalcModalProps> = ({ open, setOpen }) => {
    // const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [amount, setAmount] = useState('');
    const wallet = bsc.useWallet()

    const bnbPrice = useBNBPrice();
    const tokenBalance = useTokenBalance(wallet.account);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { havenPrice } = usePrice();
    const currencyBalance = useBalance(wallet.account);
    const reward = useBNBReward(wallet.account);
    const totalSupply = useTotalSupply(wallet.account);

    const calcReward = (bnbValue: number) => {
        return bnbValue * 0.1 / 100;
    }

    // const buyAddress =
    //     'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x0E3EAF83Ea93Abe756690C62c72284943b96a6Bc'

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} classes={{ paperWidthSm: classes.dlg }}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <TitleArea>HAVEN Investment & Rewards Calculator</TitleArea>
            </DialogTitle>
            <DialogContent dividers classes={{ root: classes.dialogContent }}>
                <InputArea>
                    <StyledLabel>
                        Enter BNB Amount to Invest
                    </StyledLabel>
                    <StyledInputContainer>
                        <input
                            placeholder="Input BNB Amount to Invest"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </StyledInputContainer>
                </InputArea>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"><TableLabel>Existing</TableLabel></TableCell>
                                <TableCell align="center"><TableLabel>New</TableLabel></TableCell>
                                <TableCell align="center"><TableLabel>Total</TableLabel></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center"><TableLabel>{`$HAVEN Balance`}</TableLabel></TableCell>
                                <TableCell align="center">{`${currencyBalance.toFixed(6)}`}</TableCell>
                                <TableCell align="center">{`${havenPrice !== 0 ? parseFloat(amount) / havenPrice : 0}`}</TableCell>
                                <TableCell align="center">{`${havenPrice !== 0 ? parseFloat(amount) / havenPrice + currencyBalance : currencyBalance}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"><TableLabel>{`Reward Share %`}</TableLabel></TableCell>
                                <TableCell align="center">{`${reward / totalSupply * 100} %`}</TableCell>
                                <TableCell align="center">{`${calcReward(parseFloat(amount)) * 72  / totalSupply * 100} %`}</TableCell>
                                <TableCell align="center">{`${reward + calcReward(parseFloat(amount)) * 72 / totalSupply * 100} %`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"><TableLabel>{`Every 72 hours Rewards in BNB*`}</TableLabel></TableCell>
                                <TableCell align="center">{`${reward.toFixed(6)}`}</TableCell>
                                <TableCell align="center">{`${(calcReward(parseFloat(amount)) * 72).toFixed(6)}`}</TableCell>
                                <TableCell align="center">{`${((reward + calcReward(parseFloat(amount))) * 72).toFixed(6)}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"><TableLabel>{`Yearly Rewards in BNB*`}</TableLabel></TableCell>
                                <TableCell align="center">{`${(reward * 120).toFixed(6)}`}</TableCell>
                                <TableCell align="center">{`${(calcReward(parseFloat(amount)) * 72 * 120).toFixed(6)}`}</TableCell>
                                <TableCell align="center">{`${(reward + calcReward(parseFloat(amount)) * 72 * 120).toFixed(6)}`}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <ButtonContainer>
                    {/* <Button onClick={handleClose} size="sm">
                        Buy HAVEN
                    </Button> */}
                    <StyledExternalLink href={buyAddress} target="__blank">
                        Buy $HAVEN
                    </StyledExternalLink>
                </ButtonContainer>
                <StyledBottomText>*These are only Estimates and not a Financial Advice.</StyledBottomText>
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={handleClose}>
                    Save changes
                </Button>
            </DialogActions> */}
        </Dialog>
    )
}

export default RewardCalcModal

const TitleArea = styled.div`
    padding: 9px;
`;

const InputArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0 20px;
`
const StyledLabel = styled.div`
    align-items: center;
    display: flex;
    font-size: 1rem;
    font-weight: 700;
`
const StyledInputContainer = styled.div`
    width: 50%;
    align-items: center;
    display: flex
`
const ButtonContainer = styled.div`
    padding: 10px 200px;
`
const StyledBottomText = styled.div`
    font-size: 12px;
    text-align: center;
    padding: 20px;
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
const TableLabel = styled.span`
    align-items: center;
    font-size: 1.2rem;
    font-weight: 800;
`