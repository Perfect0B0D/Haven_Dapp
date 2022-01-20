import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


const StyledTokenArea = styled.div`
  box-sizing: border-box;
  margin: 0px;
  width: 100%;
  position: relative;
  border: 1px solid #81cd2c;
  border-radius: 20px;
  font-family: 'Nunito';
  text-align:center;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  padding: 10px 0px;
  color: black;
  font-family: 'Nunito';
  vertical-align: middle;
  margin-bottom:15px;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  font-size:20px;
`
interface ReadContractItemProps {
  timeValue: any 
}

const SendTokenBox: React.FC<ReadContractItemProps> = ({ timeValue }) => {
  return (
    <StyledTokenArea>
      {timeValue}
    </StyledTokenArea>
  )
}

export default SendTokenBox
