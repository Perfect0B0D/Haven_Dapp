import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import StyledCard from './StyledCard'

const StyledArea = styled.div`
  box-sizing: border-box;
  margin: 0px;
  width: 50%;
  position: relative;
  border: 1px solid #81cd2c;
  border-radius: 20px;
  font-family: 'Nunito';
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  padding: 20px 0px;
  color: black;
  font-family: 'Nunito';
  vertical-align: middle;
  @media (max-width: 767px) {
    margin-top: 30px;
    padding: 48px 20px;
  }
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  margin-bottom: 20px;
`

const StyledIconArea = styled.div`
  padding: 0.25rem !important;
  -ms-flex: 0 0 33.333333%;
  flex: 0 0 33.333333%;
`

const StyledInfoArea = styled.div`
  text-align: center;
  padding: 0.5rem !important;
  -ms-flex: 0 0 66.666667%;
  flex: 0 0 66.666667%;
`

const StyledIcon = styled.div`
  text-align: center;
  position: relative;
  margin-top: 0px;
  @media (max-width: 767px) {
    left: 0px;
  }
`
const StyledInfo = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin: 10px;
`

const StyledContent = styled.div`
  min-height: 200px;
  padding: 30px 10px;
`

const StyledTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
`

interface ReadContractItemProps {
  icon: string
  title?: string
  description?: string,
  delay?: string
}

const ReadContractItem: React.FC<ReadContractItemProps> = ({
  icon,
  title,
  description,
  delay
}) => {
  return (
    <div
      data-aos="zoom-in"
      data-aos-delay={delay || "300"}
      style={{display: 'flex', justifyContent: 'center'}}
    >
      <StyledCard>
        <StyledContent>
          <StyledIconArea>
            <StyledIcon>
              <img style={{ height: 120, borderRadius: 25 }} src={icon} />
            </StyledIcon>
          </StyledIconArea>
          <StyledInfoArea>
            <StyledTitle>{title}</StyledTitle>
            <StyledInfo>{description}</StyledInfo>
          </StyledInfoArea>
        </StyledContent>
      </StyledCard>
    </div>
  )
}

export default ReadContractItem
