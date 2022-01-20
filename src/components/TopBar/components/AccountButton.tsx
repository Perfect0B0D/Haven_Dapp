import React, { useCallback } from 'react'
import styled from 'styled-components'
import * as bsc from '@binance-chain/bsc-use-wallet'
import useModal from '../../../hooks/useModal'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import Button from '../../Button'
import { useHistory } from 'react-router-dom'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const history = useHistory()
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account } = bsc.useWallet()

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

  return (
    <StyledAccountButton>
      {!account ? (
        <Button
          disabled={false}
          onClick={handleUnlockClick}
          size="lg"
          text="Connect to a wallet"
        />
      ) : (
        <Button
          onClick={onPresentAccountModal}
          size="md"
          text={getAccountAddress()}
        />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton
