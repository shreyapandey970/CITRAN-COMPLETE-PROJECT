import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api'
import AliceCarousel from 'react-alice-carousel';
import {Link} from "react-router-dom";


export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}


const Carousel = () => {    
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();
    const fetchTrendingCoins = async() => {
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };

    console.log(trending);  //all the trending coins

    useEffect(() => {
        fetchTrendingCoins();    //will fetch the coins and store it in an array
    }, [currency]);

    const items =  trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;

        return(
            <Link to={`/coins/${coin.id}`} style={{textDecoration : "none",}}>
                <img src={coin?.image}
                alt = {coin.name}
                height="80"
                style={{marginBottom:10}} />
                <br />
                <span id="profit">{coin?.symbol}
                    &nbsp;
                    <span style={{color: profit > 0 ? "green" : "red", fontWeight: 500,}}>
                        {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <br />
                <span id="profit">
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    })

    const responsive = {
        0: {  //0pxls or higher
            items:2,
        },
        512: {   //512pxls or higher
            items:4,
        },
    };

  return (
    <div id="carousel">
      <AliceCarousel
           mouseTracking
           infinite
           autoPlayInterval={1000} //1000 milli seconds
           animationDuration={1500}
           disableDotsControls
           disableButtonsControls
           responsive = {responsive}
           autoPlay
           items={items}
      />
    </div>
  )
}

export default Carousel
