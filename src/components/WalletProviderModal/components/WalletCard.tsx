import React from 'react'
import Button from '../../Button'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'
import styled from 'styled-components'

interface WalletCardProps {
  icon: React.ReactNode
  onConnect: () => void
  title: string
}

const StyledConnectButton = styled.div`
  width: 100px;
`
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #eff4f5;
  height: 48px;
  margin-bottom: 8px;
  letter-spacing: .03em;
  line-height: 1;
  border-radius: 16px;
  outline: 0;
  transition: background-color .2s ease 0s,opacity .2s ease 0s;
  padding: 0 24px;
  border: 0;
`
const StyledIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => (
  <StyledContainer className="connect-title" onClick={onConnect}>
    <CardTitle text={title} />
    <StyledIconContainer>{icon}</StyledIconContainer>
  </StyledContainer>
  // <Card>
  //   <CardContent onClick={onConnect}>
  //     <CardIcon>{icon}</CardIcon>
  //     <CardTitle text={title} />
  //     <Spacer />
  //     <StyledConnectButton>
  //       <Button onClick={onConnect} text="Connect" />
  //     </StyledConnectButton>
  //   </CardContent>
  // </Card>
)

export default WalletCard
