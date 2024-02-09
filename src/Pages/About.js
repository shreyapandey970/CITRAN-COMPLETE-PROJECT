import React, {useState, useEffect, useRef} from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const About = () => {
  const [number, setNumber] = useState(0);
  const numberRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start the animation when the element is in view
          startAnimation();
          observer.disconnect(); // Disconnect the observer once it's triggered
        }
      });
    });

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    const interval = setInterval(() => {
      setNumber((prevNumber) => {
        if (prevNumber < 80) {
          return prevNumber + 1;
        } else {
          clearInterval(interval);
          return prevNumber;
        }
      });
    }, 50);
  }  

  return (
    <> 
    <div>
      <br/>
      <Navbar />
    </div>
    <div>
      <h2 id="vision">OUR VISION</h2>
      <p id="vtag">Cryptocurrency <br/> in Every Wallet</p>
      <img src={require('../Logo/logo.png')} height={350} id="aboutimg" />
      <img src={require('../Images/space.gif')} id="mission" />

      <h2 id="missions">OUR MISSION</h2>
      <p id="mtag">Accelerate the world's<br/> transition to <br/>cryptocurrency. </p>
      

      <h2 id="matters">WHY IT MATTERS</h2>
      <p id="matttag">We believe it is your basic <br/> right to control your money, <br/> data and identity.</p>
      <br/>
      <img src={require('../Images/partnerbg.jpg')} id="partner" />
      <h2 id="partners">OUR PARTNERS</h2>
      <p id="ptag">Reaching the next billion users with <br/> the world's best partners</p>
      
      <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src={require('../Images/cryptopartner.png')} alt="Crypto.com" id="partner1"  />
        </div>
        <div class="flip-card-back">
          <h1>Crypto.com Arena</h1>
        </div>
      </div>
    </div>

    <div class="flip-card-1">
      <div class="flip-card-inner-1">
        <div class="flip-card-front-1">
          <img src={require('../Images/cognizantpartner.png')} alt="Cognizant" id="partner2"  />
        </div>
        <div class="flip-card-back-1">
          <h1>Cognizant</h1>
        </div>
      </div>
    </div>

    <div class="flip-card-2">
      <div class="flip-card-inner-2">
        <div class="flip-card-front-2">
          <img src={require('../Images/ufcpartner.png')} alt="UFC" id="partner3"  />
        </div>
        <div class="flip-card-back-2">
          <h1>Ultimate Fighting Championship</h1>
        </div>
      </div>
    </div>
    

      <p id="f">Founded in</p>
      <p id="u">Users</p>
      <span id="founded">2023</span>
      <p id="andcounting">& counting...</p>
    </div>
    <div ref={numberRef} className="number-container">
      
      {number > 0 && <span>{number}M </span>}
    </div>
    <div>
      <br/>
      <img src={require('../Images/contactus.gif')} id="contactus" />
      <p id="ctag">Have Queries? </p>
      <p id="cctag">Contact Us</p>
      <p id="cgoldtag"> anywhere in the world</p>
      <a href="ContactUs" className='btn'><p/>Learn More </a>
      
    </div>
    <p id="filler"></p>
    <Footer />
    
    </>

  )
}

export default About
