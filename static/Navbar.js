import React from 'react'


const Navbar = () => {
  return (
    <>
        <div id="nav">
        <ul class="nav-menu clearfix unstyled">
            <li><a href="/homepage" class="three-d">
                Home
                <span class="three-d-box"><span class="front">Home</span><span class="back">Home</span></span>
            </a></li>
            <li><a href="http://localhost:5000/prediction" class="three-d">
                Prediction Analysis
                <span class="three-d-box"><span class="front">Prediction Analysis</span><span class="back">Prediction Analysis</span></span>
            </a></li>
            <li><a href="#" class="three-d">
                Buy/Sell
                <span class="three-d-box"><span class="front">Buy/Sell</span><span class="back">Buy/Sell</span></span>
            </a></li>
            <li><a href="/CryptoPatterns" class="three-d">
                Crypto Patterns
                <span class="three-d-box"><span class="front">Crypto Patterns</span><span class="back">Crypto Patterns</span></span>
            </a></li>
            <li><a href="/About" class="three-d">
                About
                <span class="three-d-box"><span class="front">About</span><span class="back">About</span></span>
            </a></li>
            <li><a href="/ContactUs" class="three-d">
                Support
                <span class="three-d-box"><span class="front">Support</span><span class="back">Support</span></span>
            </a></li>
            
        </ul>



        
    </div>

    </>
  )
}

export default Navbar
