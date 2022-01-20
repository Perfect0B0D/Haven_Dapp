import BigNumber from 'bignumber.js'
import { any } from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'


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
  padding: 20px 0px;
  color: black;
  font-family: 'Nunito';
  vertical-align: middle;
  @media (max-width: 767px) {
    margin-top: 30px;
    padding: 48px 20px;
  }
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-bottom: 20px;
  background: white;
`

const StyledTokenAdress = styled.div`
  display: flex;
  margin: 0px;
  padding: 20px 0px;
  padding-left:30px;
`

const StyledLabelArea = styled.div`
  width:20%;
  margin-right: 13px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledInputArea = styled.div`
  width:80%;
  float:left;
`

const StyledComponent = styled(Button)`
  margin:0px;
`
const StyledInputbox = styled.input`
    padding: 7px 15px;
    border: 1px solid #ccc;
    position: relative;
    background: transparent;
    font: 15px/24px "Lato", Arial, sans-serif;
    color: #333;
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 1px;
    :focus {
      outline: none;
   }
`

interface ReadContractItemProps {
  sendToken: any,
  address?: string
  amount?: string
  setAddress: any
  setAmount: any 
}

const SendTokenBox: React.FC<ReadContractItemProps> = ({
  sendToken,
  address,
  setAddress,
  setAmount,
  amount
}) => {
  const changeValue = (event:any) => {
    setAddress(event.target.value);
  }
  const changeAmount = (event:any) => {
    setAmount(event.target.value);
  }

  return (
    <StyledTokenArea>
      <StyledTokenAdress >
      <StyledLabelArea>
        <label htmlFor="" >Recipient (address)</label>
      </StyledLabelArea>
      <StyledInputArea>
        <StyledInputbox type="text" onChange={changeValue} style = {{width:"80%", paddingRight:"30px"}} />
      </StyledInputArea>
      </StyledTokenAdress>
      <StyledTokenAdress>
      <StyledLabelArea>
        <label htmlFor="" >Amount ($HAVEN)</label>
      </StyledLabelArea>
      <StyledInputArea>
        <StyledInputbox type="number" placeholder="0" onChange={changeAmount} style = {{width:"80%", paddingRight:"30px"}} />
      </StyledInputArea>
        
      </StyledTokenAdress>
      <div style={{width:"65%", margin: "auto"}}>
        <StyledComponent onClick={sendToken} >
            <span>
              Send
            </span>
          </StyledComponent>
      </div>
      
    </StyledTokenArea>
    )
}




export default SendTokenBox
