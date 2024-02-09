import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const CryptoPattern = () => {
  const [slideIndex, setSlideIndex] = useState(1);

 

  const plusSlides = (n) => {
    let newIndex = slideIndex + n;

    if (newIndex > 12) { // Assuming you have 14 slides based on the JSX provided
      newIndex = 1;
    }

    if (newIndex < 1) {
      newIndex = 12; // Assuming you have 14 slides based on the JSX provided
    }

    showSlides(newIndex);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  const showSlides = (n) => {
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');

    // Reset all slides to hide them
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    // Remove 'active' class from all dots
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }

    // Update slideIndex state based on the passed value
    let newIndex = n;
    if (n > slides.length) {
      newIndex = 1;
    }
    if (n < 1) {
      newIndex = slides.length;
    }
    setSlideIndex(newIndex);

    // Display the current slide and set its corresponding dot as active
    slides[newIndex - 1].style.display = 'block';
    dots[newIndex - 1].className += ' active';
  };

  return (
    <>
      <div>
        <br />
        <Navbar />
        <img src={require('../Images/flash.gif')} id="flash"  />
      </div>
      <div className="slideshow-container">
        {/* Your slides go here with React JSX */}
        {/* For example: */}

        <div className="mySlides fade">
          <img src={require('../Images/symmetrical.png')} class="imagef" alt="Symmetrical" />
          <div className="text">Symmetrical</div>
          <div className="desc">
          The price forms higher lows and lower highs.
There is no clear trend.
It is the end of a trend
          </div>
        </div>

        <div className="mySlides fade">
          <img src={require('../Images/ascending.png')} class="imagef" alt="Ascending" />
          <div className="text">Ascending</div>
          <div className='desc'>The price is forming higher highs and higher lows.
There is horizontal resistance at a certain price level.
The chart pattern is typically found in the middle of an uptrend.</div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/bearishflag.png')} class="imagef" alt="BearishFlag" />
          <div className="text">Bearish Flag</div>
          <div className='desc'>A bearish flag is the complete opposite of a bullish flag crypto chart pattern. It is formed by a sharp downtrend and consolidation with higher highs that ends when the price breaks and drops down. These flags are bearish continuation patterns, so they give a sell signal. </div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/bearishpennant.png')} class="imagef" alt="BearishPennant" />
          <div className="text">Bearish Pennant</div>
          <div className='desc'>A bearish pennant is, naturally, the opposite of a bullish pendant. Its pole is a sharp downward price movement, and it is followed by a price decrease. It gives a sell signal.

Pennants are also defined by trading volume: it should be exceptionally high during the “pole” and then slowly whittle down during consolidation. They usually last between one and four weeks</div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/bearishrectangle.png')} class="imagef" alt="Bearish Rectangle" />
          <div className="text">Bearish Rectangle</div>
          <div className="desc">
          A bearish rectangle is the opposite of the bullish rectangle. It happens when asset price “gets stuck” in between two horizontal levels of support and resistance. A bearish rectangle usually gives a sell signal as it is a sign that the price is likely to continue to fall.
          </div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/bullishflag.png')} class="imagef" alt="BullishFlag" />
          <div className="text">Bullish Flag</div>
          <div className="desc">
          Drastic upward price movement
A brief consolidation period with lower highs
A bullish trend
          </div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/bullishpennant.png')} class="imagef" alt="BullishPennant" />
          <div className="text">Bullish Pennant</div>
          <div className="desc">
          A bullish pennant is a bullish pole chart pattern rather similar to a bullish flag. It also has a pole — a shart uptrend — followed by a brief (or not so brief) consolidation, and then a continued uptrend. Unlike the flag, however, its consolidation period is shaped like a triangle: it has higher lows and lower highs. It gives a buy signal.
          </div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/bullishrectangle.png')} class="imagef" alt="Bullish Rectangle" />
          <div className="text">Bullish Rectangle</div>
          <div className="desc">
          Price consolidation between two horizontal levels of support and resistance.
This chart pattern is typically found at the end of a downtrend.
          </div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/descending.png')} class="imagef" alt="Descending" />
          <div className="text">Descending</div>
          <div className="desc">
          The asset price forms lower highs and lower lows.
You can observe horizontal support.
It is the middle of a downtrend
          </div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/doublebottom.png')} class="imagef" alt="Double Bottom" />
          <div className="text">Double Bottom</div>
          <div className="desc">
          A double bottom is a chart pattern that, as can be seen from its name, is the opposite of the double top. It occurs when the asset price tests the lower horizontal level twice but then pulls back and goes up instead. A double bottom usually gives a buy signal as it is a sign that there will likely be an uptrend.


          </div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/doubletop.png')} class="imagef" alt="DoubleTop" />
          <div className="text">Double Top</div>
          <div className="desc">
          A double top is one of the most common crypto chart patterns. It is characterized by the price shooting up twice in a short period of time — retesting a new high. If it fails to go back to that level and cross over the upper horizontal line, it typically signifies that a strong pullback is coming. This is a bearish reversal pattern that gives a sell signal.
          </div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/fallingwedge.png')} class="imagef" alt="FallingWedge" />
          <div className="text">Falling Wedge</div>
          <div className="desc">
          The asset forms higher highs and lower lows.
You can observe horizontal support.
It is the middle of an uptrend
          </div>
        </div>
        <div className="mySlides fade">
          <img src={require('../Images/risingwedge.png')} class="imagef" alt="RisingWedge" />
          <div className="text">Rising Wedge</div>
          <div className="desc">
        
          </div>
         
        </div>

        {/* Navigation buttons */}
        <a className="prev" onClick={() => plusSlides(-1)}>
          ❮
        </a>
        <a className="next" onClick={() => plusSlides(1)}>
          ❯
        </a>

        {/* Dots for slides */}
        <div id="dots" className='dot'>
          <span className="dot" onClick={() => currentSlide(1)}></span>
          <span className="dot" onClick={() => currentSlide(2)}></span>
          <span className="dot" onClick={() => currentSlide(3)}></span>
          <span className="dot" onClick={() => currentSlide(4)}></span>
          <span className="dot" onClick={() => currentSlide(5)}></span>
          <span className="dot" onClick={() => currentSlide(6)}></span>
          <span className="dot" onClick={() => currentSlide(7)}></span>
          <span className="dot" onClick={() => currentSlide(8)}></span>
          <span className="dot" onClick={() => currentSlide(9)}></span>
          <span className="dot" onClick={() => currentSlide(10)}></span>
          <span className="dot" onClick={() => currentSlide(11)}></span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CryptoPattern;
