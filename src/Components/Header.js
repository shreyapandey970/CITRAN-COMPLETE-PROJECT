//ES7
import React from 'react';
import { CryptoState } from '../CryptoContext';

const Header = () => {
  
  const {currency, setCurrency} = CryptoState()
  console.log(currency);

  return (
    <>
        <div id="Header">
           <img src={require('../Logo/logo.png')} height={50} width={70} id="HLOGO"/>
           <img src={require('../Logo/citran.png')} height={40} width={110} id="HLOGO2"/>
           <select id="selectvalues" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="INR">INR</option>
            <option value="USD">USD</option> 
          </select>   
          
        </div>
    </>
  )
}

export default Header
