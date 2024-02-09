import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@material-ui/core';
import { db } from '../firebase'; // Assuming you have set up Firebase in your project
import { AuthContext } from '../AuthContext';
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore"; 
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { useParams } from 'react-router-dom';




function Sidebar() {
  const [watchlist, setWatchlist] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [showFlashCard, setShowFlashCard] = useState(false);
  const {currency, coins, symbol} = CryptoState();
  const [showFlashCard1, setShowFlashCard1] = useState(false);
  const [coin, setCoin] = useState();
  const [coinPrices, setCoinPrices] = useState({});
  const {id} = useParams();

  const fetchCoin = async() => {
    const {data} = await axios.get(SingleCoin(id));
    console.log(SingleCoin(id));
    setCoin(data);
  };
  console.log(coin);

 


  useEffect(() => {
    fetchCoin();

    const fetchWatchlist = async () => {
      try {
        const coinRef = doc(db, "watchlist", currentUser.uid);
        
        const unsubscribe = onSnapshot(coinRef, (doc) => {
          if (doc.exists()) {
            const watchlistData = doc.data();
            setWatchlist(watchlistData.coins || []);
            const coinPrices = doc.data();
            setCoinPrices(watchlistData.prices || []);
            
          } else {
            setWatchlist([]);
            setCoinPrices([]);
          }
        });
  
        return unsubscribe; // Unsubscribe when component unmounts
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };
  
    const unsubscribe = fetchWatchlist();
  
   
  }, [currentUser.uid]); // Dependency array ensures useEffect runs when currentUser.uid changes
  
  const openNav = () => {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  const closeNav = () => {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  const buy = async() =>{
    try{
        setShowFlashCard(true);
        console.log("In Buy");
      
    }
    catch(error)
    {
        console.log("Error");
    }
  }

  
  
 


  const deleteCoin = async (coin) => {
    try {
      const coinRef = doc(db, "watchlist", currentUser.uid);
      const docSnap = await getDoc(coinRef);
      const watchlistData = docSnap.data();
     
      // Check if the coin exists in the watchlist
      if (watchlistData && watchlistData.coins && watchlistData.coins.includes(coin)) {
        // Remove the coin from the watchlist
        const updatedCoins = watchlistData.coins.filter(item => item !== coin);
      
  
        // Update the Firestore document with the updated watchlist array
        await setDoc(coinRef, { coins: updatedCoins }, { merge: true });
  
       

        console.log("Coin removed from watchlist:", coin);

       
      } else {
        console.log("Coin not found in watchlist:", coin);
      }
    } catch (error) {
      console.error("Error deleting coin from watchlist:", error);
    }
  }
  
  let total = 0;

  return (
    <div>
      <div id="mySidebar" className="sidebar">
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
        <img src={currentUser.photoUrl || 'https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png'} height="150px" width="150px" id="watchlistpp" alt="ProfilePic" />
        <ul>
          {watchlist.map((coin, index) => (
            <li key={index}>
               <Button 
                variant="outlined"
                style={{
                  marginLeft: "-15px",
                  backgroundColor: "#FF0000", // Red color for delete button
                  color: "white"
                }}
                onClick={() => deleteCoin(coin)}>-</Button>  
              &nbsp;&nbsp;
              
             
              {coin}
              
              
            </li>
          ))}

         
        </ul>
        <br/>
        <Button 
                variant="outlined"
                style={{
                  marginLeft: "-15px",
                  backgroundColor: "green", // Red color for delete button
                  color: "white",
                  marginLeft:"65px",
                }}
                onClick={() => buy()}
               >BUY NOW</Button>
               
               {showFlashCard && <div className="overlay" />}
                {showFlashCard && (
                  <div className="flash-card">
                    <ul>
                      {watchlist.map((coin, index) => (
                       
                        <li key={index}>
                          {coin} &nbsp; 
                          {symbol}{coinPrices[index]}
                          {console.log(total += coinPrices[index])} 
                        </li>                                    
                      ))}                   
                  </ul>
                    
                    <br/>
                    <b id="total">Total: {symbol}{total.toFixed(2)}</b>
                    
                    <br/><br/>

                    <button id="getback" onClick={() => setShowFlashCard(false)}>Get Back</button> &nbsp;
                    <button onClick={() => setShowFlashCard1(true)}>Make Payment</button>
                  </div>
                )}


                

                {showFlashCard1 && (
                  <div className="flash-card">
                    Choose a Payment Option:
                    <ul className="btn-group">
                            <a href="https://paytm.com/">Paytm</a>
                            <a href="https://payments.google.com/gp/w/u/0/home/activity?sctid=2946663328725127">GPay</a>
                            <a href="https://www.phonepe.com/">PhonePe</a>
                    </ul>
                    <button onClick={() => setShowFlashCard1(false)}>Cancel</button>
                  </div>
                )}

              
      
      </div>

      <br/>
      <div>
        <Button 
          variant="outlined"
          id="main"
          style={{
            width: "89%",
            height: 40,
            backgroundColor: "#EEBC1D",
            color: "black",
            fontWeight: "bold"
          }}
          onClick={openNav}>See Watchlist</Button>  
      </div>
    </div>
  );
}

export default Sidebar;
