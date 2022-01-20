import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as bsc from '@binance-chain/bsc-use-wallet'
import metamaskLogo from '../../assets/img/metamask-fox.svg'
import bscLogo from '../../assets/img/bsc.png'
import trustLogo from '../../assets/img/trustwallet.png'

import binancechainLogo from '../../assets/img/binancechain.jpg'
import MathWalletLogo from '../../assets/img/MathWallet.jpeg'
import safepalLogo from '../../assets/img/safepal.jpg'
import tokenpocketLogo from '../../assets/img/tokenpocket.png'
import walletconnectLogo from '../../assets/img/walletconnect.png'

import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'
import WalletCard from './components/WalletCard'
import Button from '../Button'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = bsc.useWallet()

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal>
      <ModalTitle text="Connect to a wallet" />
      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <WalletCard
              icon={
                <img src={metamaskLogo} alt="Metamask" style={{ height: 28 }} />
              }
              onConnect={() => connect('injected')}
              title="Metamask"
            />
            {/* <Spacer />
            <WalletCard
              icon={<img src={bscLogo} alt="BSC" style={{ height: 32 }} />}
              onConnect={() => connect('bsc')}
              title="BSC wallet"
            /> */}
            <WalletCard
              icon={<img src={trustLogo} alt='Trust Wallet' style={{ height: 28 }} />}
              onConnect={() => connect('walletconnect')}
              title="Trust Wallet"
            />
            <WalletCard
              icon={
                <img src={safepalLogo} alt="SafePal Wallet" style={{ height: 28 }} />
              }
              onConnect={() => connect('injected')}
              title="SafePal Wallet"
            />
            <WalletCard
              icon={
                <img src={tokenpocketLogo} alt="TokenPocket Wallet" style={{ height: 28 }} />
              }
              onConnect={() => connect('injected')}
              title="TokenPocket Wallet"
            />
            <WalletCard
              icon={
                <img src={MathWalletLogo} alt="Math Wallet" style={{ height: 28 }} />
              }
              onConnect={() => connect('injected')}
              title="Math Wallet"
            />
            <WalletCard
              icon={
                <img src={binancechainLogo} alt="Binance Chain Wallet" style={{ height: 28 }} />
              }
              onConnect={() => connect('injected')}
              title="Binance Chain Wallet"
            />
            <WalletCard
              icon={<img src={walletconnectLogo} alt='Wallet Connect' style={{ height: 28 }} />}
              onConnect={() => connect('walletconnect')}
              title="Wallet Connect"
            />

          </StyledWalletCard>
        </StyledWalletsWrapper>
      </ModalContent>

      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
      </ModalActions>
    </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: block;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

const StyledWalletCard = styled.div`
  font-family: 'Print Char 21';
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.7);
  flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
`
export default WalletProviderModal
