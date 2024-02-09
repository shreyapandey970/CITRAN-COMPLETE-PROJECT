import React from 'react'

const Footer = () => {
  return (
    <>
    <div className="container-fluid">
    
    </div>
    <div>
    <img src={require('../Logo/logo.png')} id="footimg" />
    <hr id="hr"></hr>
    <a href="https://www.instagram.com/"><img src={require('../Images/instagram.jpg')} id="footimg1" /></a>
    <a href="https://facebook.com/"><img src={require('../Images/facebook.jpg')} id="footimg3" /></a>
    <a href="https://twitter.com/"><img src={require('../Images/X.png')} id="footimg2" /></a>
    <a href="https://telegram.org/"><img src={require('../Images/telegram.jpg')} id="footimg4" /></a>
    <a href="https://mail.google.com/"><img src={require('../Images/gmail.png')} id="footimg5" /></a>


    <div className="footer">
    <div className="container">
       
        <div className="footer-section">
            <h4 className="footerhead">About Us</h4>
            <p>CITRAN is a platform designed for monitoring, analyzing, and managing cryptocurrency investments, offering users real-time data insights & security features.</p>
        </div>
        
        
        <div className="footer-section">
            <h4 className="footerhead">Contact Us</h4>
            <ul>
                <li>Address: 123 Street, City, Country</li>
                <li>Email: citran@gmail.com</li>
                <li>Phone: +1234567890</li>
            </ul>
        </div>
        
       
        <div className="footer-section">
            <h4 className="footerhead">Services</h4>
            <ul>
                <li ><a href="/CryptoPatterns" id="fs">Pattern Analysis</a></li>
                <li ><a href="/buysell" id="fs">Buy/Sell Analysis</a></li>
                <li><a href="http://localhost:5000/prediction" id="fs">Prediction Analysis</a></li>
            </ul>
        </div>
        
        
        <div className="footer-section">
            <h4 className="footerhead">Partners</h4>
           
            <ul>
                <li ><a href="https://www.cryptoarena.com/" id="fs">Crypto.com Arena</a></li>
                <li ><a href="https://www.cognizant.com/in/en" id="fs">Cognizant</a></li>
                <li><a href="https://www.ufc.com/" id="fs">UFC</a></li>
            </ul>
        </div>
    </div>
   
    <div className="text-center py-4">
        <p className="copyright">&copy; 2023 CITRAN. All Rights Reserved.</p>
    </div>
    </div>
</div>
    </>
  )
}

export default Footer
