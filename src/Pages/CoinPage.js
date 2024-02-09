import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { Typography, makeStyles } from '@material-ui/core';
import CoinInfo from '../Components/CoinInfo';
import ReactHtmlParser from "react-html-parser";
import Navbar from '../Components/Navbar';
import {Button} from '@material-ui/core';
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import {toast, Toaster} from 'react-hot-toast';
import { AuthContext } from '../AuthContext';
import Sidebar from './Sidebar';


const CoinPage = () => {
  const { currentUser } = useContext(AuthContext);
  const {id} = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol, user, watchlist} = CryptoState();
  





  const fetchCoin = async() => {
    const {data} = await axios.get(SingleCoin(id));
    console.log(SingleCoin(id));
    setCoin(data);
  };
  console.log(coin);

  useEffect(()=>{
    fetchCoin();
  },[]);

  const useStyles = makeStyles((theme)=>({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
        color:"white",
        
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
      color:"white",
    },
    description: {
      width: "90%",
      fontFamily: "cursive",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
      color:"white",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      color:"#BA8437",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },

  }));

 
  const inWatchlist = watchlist.includes(coin?.id); 

  const addToWatchList = async () => {
    const coinRef = doc(db, "watchlist", currentUser.uid);
  
    try {
      const docSnap = await getDoc(coinRef);
      const watchlistData = docSnap.data();
  
      if (watchlistData && watchlistData.coins) {
        console.log("Coins in watchlist:", watchlistData.coins);
        console.log("Coin ID to add:", coin?.id);
  
        // Check if the coin ID is already in the watchlist
        if (watchlistData.coins.includes(coin?.id)) {
          console.log("Already there : ", watchlistData.coins.includes(coin?.id));
          toast.error("Coin is already in the watchlist.");
          return;
        }
      }
  
      // Prepare the updated watchlist array with arrayUnion
      const updatedCoins = arrayUnion(coin?.id);
      const updatedPrice = arrayUnion(coin?.market_data.current_price[currency.toLowerCase()]);
      
      // Update the Firestore document with the updated watchlist array
      await setDoc(coinRef, { coins: updatedCoins, prices: updatedPrice }, { merge: true });
    
    

      console.log("User uid:", currentUser.uid);
      toast.success("Added to Watchlist");
    } catch (error) {
      console.error("Error adding to Watchlist:", error);
      toast.error("Couldn't Add to Watchlist. Please check your network connection.");
    }
  
  }

  const classes = useStyles();

  return (
    <>
    <br/>
    <Navbar />
    
    <br/><br/>
    <Toaster toastOptions={{ duration: 4000 }} />
    <div className={classes.container}>
      <div className={classes.sidebar}>
    
      <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {
                coin?.market_data.current_price[currency.toLowerCase()]
              }
            </Typography>
            
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              }
              M
            </Typography>
          </span>

              
                <Button 
                variant = "outlined"
                style={{
                  width: "89%",
                  height: 40,
                  backgroundColor: "#EEBC1D",
                  color:"black",
                  fontWeight:"bold"
                }}
                onClick={addToWatchList}
                >
                  {inWatchlist ? "Remove from Watchlist" : "Add To Watchlist"}</Button>
             
                  <Sidebar />


          </div>
      </div>
      
      {coin && <CoinInfo coin={coin} />}

    </div>
    </>
  )
}

export default CoinPage;
