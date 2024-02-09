import React, {useContext, useState} from 'react'
import Navbar from '../Components/Navbar'
import PhoneInput from 'react-phone-input-2';
import Footer from '../Components/Footer';
import { doc, setDoc, arrayUnion } from "firebase/firestore"; 
import { db } from '../firebase';
import { AuthContext } from '../AuthContext';
import { toast, Toaster } from 'react-hot-toast';



const ContactUs = () => {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userResponseRef = doc(db, 'userresponse', currentUser.uid);
  
  try {
    await setDoc(userResponseRef,  { submissions: arrayUnion(formData) }, { merge: true }); // Store form data in Firestore
    console.log('Form data submitted successfully:', formData);
    toast.success("Thankyou for sharing your feedback/query. We will get back to you shortly.");
    // You can show a success message or redirect the user to a thank you page here
  } catch (error) {
    console.error('Error submitting form data:', error);
    toast.error("Oops....! We apologize but your feedback/query was not recorded. Please try after sometime.");
    // Handle error
  }
}

  return (
   <>
    <div>
      
        <br/>
        <Navbar />
    </div>
    <div id="contactus-container">
    
    </div>
    <div>
    <Toaster toastOptions={{ duration: 4000 }} />
        <p id="cutext">CONTACT US</p>
        <form action="#" method="post" onSubmit={handleSubmit}>
            <div>
                <input type="text" id="name" name="name" placeholder="Enter Name"  value={formData.name} 
              onChange={handleInputChange} required   />
            </div>
            <div class="form-group">
                <input type="email" id="email" name="email" placeholder="Enter Email" value={formData.email} 
              onChange={handleInputChange} required />
            </div>
            <div id="phoneinput">
            <PhoneInput
                  country={"in"}
                  id="phonein"
                  inputProps={{
                    name: "phone",
                    required: true,
                    id:"phone",
                  }}
                  value={formData.phone}
                  onChange={(phone) => setFormData({ ...formData, phone })}
              />
            </div>
            <div>
                <textarea id="message" placeholder="Enter Your Query / Feedback and let us know your thoughts" name="message"  value={formData.message} 
              onChange={handleInputChange}  required></textarea>
            </div>
            
            <div class="form-group">
                <input type="submit" value="Submit" id="submitbtn" />
            </div>
          </form>
    </div>
    <img src={require('../Images/contactus.jpeg')} id="cubg" />

    <p id="faq">FAQs</p>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div class="faq-container">
  <div class="faq-item">
    <div class="faq-question"> What is CITRAN?</div>
    <div class="faq-answer">
    CITRAN stands for CRYPTO, INVEST, TRACK, and ANALYSIS. It is a comprehensive platform designed to monitor, analyze, and manage cryptocurrency investments securely.
    </div>
  </div>

  <div class="faq-item">
    <div class="faq-question">What are the primary features of CITRAN?</div>
    <div class="faq-answer">
    CITRAN offers functionalities such as real-time tracking of cryptocurrency prices, historical data analysis, investment support through a built-in chatbot, and advanced security measures to protect user data.
    </div>
  </div>

  <div class="faq-item">
    <div class="faq-question">How does CITRAN ensure the security of user data?</div>
    <div class="faq-answer">
    CITRAN incorporates robust security features to prevent the leak, misuse, or manipulation of confidential user data, ensuring a secure and trustworthy platform for managing cryptocurrency investments.
    </div>
  </div>

  <div class="faq-item">
    <div class="faq-question"> Is CITRAN integrated with blockchain technology?</div>
    <div class="faq-answer">
    Currently, CITRAN is a Phase-I website that has not integrated blockchain technology. However, the platform is committed to staying updated on the latest developments and exploring blockchain integration in the future.
    </div>
  </div>

  <div class="faq-item">
    <div class="faq-question">Can I track multiple cryptocurrencies on CITRAN?</div>
    <div class="faq-answer">
    Yes, CITRAN provides users with a centralized platform to track various cryptocurrencies, view their prices, monitor market trends, and set alerts for specific price thresholds.
    </div>
  </div>

  <div class="faq-item">
    <div class="faq-question">Are there any risks associated with trading cryptocurrencies on CITRAN?</div>
    <div class="faq-answer">
    While CITRAN offers comprehensive tools for managing cryptocurrency investments, it's essential to understand that trading in cryptocurrencies carries inherent risks. Users should be aware of potential market volatility and take necessary precautions to protect their investments.
    </div>
  </div>

  <div class="faq-item">
    <div class="faq-question"> Is CITRAN suitable for both beginners and experienced cryptocurrency traders?</div>
    <div class="faq-answer">
    Absolutely! CITRAN is designed to cater to users of all levels, from beginners to experienced traders, providing them with the tools and resources needed to monitor, analyze, and manage their cryptocurrency investments effectively.
    </div>
  </div>

  <div class="faq-item">
    <div class="faq-question">Where does my clicked photo redirect?</div>
    <div class="faq-answer">
      It is redirected to the site's Database that keeps a track of the activity performed each time a user logs in.
    </div>
  </div>

  <div class="faq-item">
    <div class="faq-question">Can I buy Crypto and trade it?</div>
    <div class="faq-answer">
      You can definitely purchase the cryptocurrency. Unfortunately, you cannot trade it since we are yet to develop our site on that front.
    </div>
  </div>

  <div class="faq-item">
    <div class="faq-question">Is CITRAN linked to my bank Account?</div>
    <div class="faq-answer">
      No. CITRAN is not linked to your bank Account. However, you can link your Crypto Wallet once we provide the facility.
    </div>
  </div>

</div>

    <Footer />
    
    </>
  )
}

export default ContactUs
