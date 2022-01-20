import { useContext } from 'react'
import { Context } from '../contexts/TokenContractProvider'

const useTokenContract = () => {
  const  tokenContract  = useContext(Context)
  return tokenContract
}

export default useTokenContract
