/*/*Whatever currency user chooses shall be applied to the whole website */
/*Using Contexg API */

import React, { createContext, useContext, useState, useEffect } from 'react';

const Crypto = createContext();

const CryptoContext = ({children}) => {
    const [currency,setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [watchlist, setWatchlist] = useState([]);
    
    useEffect(()=>{
        if(currency === "INR") 
            setSymbol("₹");
        else if(currency === "USD")
            setSymbol("$");
    }, [currency]);


  return (
    <Crypto.Provider value={{currency,symbol,setCurrency, watchlist,}}>
        {children}
    </Crypto.Provider>
  )
};

export default CryptoContext;

export const CryptoState =() =>{
    return useContext(Crypto)
}
