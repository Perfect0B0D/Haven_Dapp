import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer'

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <StyledMain>{children}</StyledMain>
    {/* <Footer /> */}
  </StyledPage>
)

const StyledPage = styled.div`
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 32px;
`

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
export default Page
