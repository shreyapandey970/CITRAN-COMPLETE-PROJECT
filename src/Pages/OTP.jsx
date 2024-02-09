import React, { useState, useContext } from 'react';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { toast, Toaster } from 'react-hot-toast';
import { CgSpinner } from "react-icons/cg";
import CameraCapture from './CameraCapture';
import { AuthContext } from '../AuthContext';


const OTP = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  

  function onCaptchaVerify() {
    
    if (!window.recaptchaVerifier) {
      const auth = getAuth();
      
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha");
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
      console.log("Callback");
    }
  };

  function onSignup() {
    setLoading(true);
    onCaptchaVerify();
   
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Failed to send OTP. Please try again.");
      });
     
    
  }

  function onOTPVerify() {
    setLoading(true);
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        toast.success("OTP verification successful!");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("OTP verification failed. Please check your OTP.");
      });

      console.log("OTP: ",currentUser);
  }

  return (
    <section id="flag">
      
    <img src = {require("../Images/200w.gif")} id="cryptofall" alt="cryptofall"></img>

      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container" data-sitekey="6LcOlT0oAAAAACX3fD8TfO4taU27Rbore3YW3Jac"></div>
        {user ? (
          <CameraCapture currentUser={user} />
        ) : (
          <div>
            <h1 id="factor">2-Factor Authentication</h1><br/><br/><br/>
             {showOTP ? (
              <>
                <label
                  htmlFor="otp"
                  className="otptext"
                >
                  Enter OTP sent on +{ph}
                </label><br/><br/>
                <input
                  type="password"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="otp-container"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  autoFocus="on"
                /><br/><br/>
                <button
                  onClick={onOTPVerify}
                  className="otpbutton"
                >
                 
                  {loading ? (
                  <CgSpinner size={23} className="mt-1 animate-spin" />
                    ) : null}
                  <span style={{ display: loading ? 'none' : 'inline' }}>
                    Verify OTP
                 </span>
                </button>

              </>
            ) : (
              <>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                  id="verifystat"         
                >
                  Verify your phone number
                </label><br/><br/>
                <PhoneInput
                  country={"in"}
                  value={ph}
                  onChange={setPh}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                    id:"phinput",
                  }}
                />
                <br/>
                <button
                  onClick={onSignup}
                  id="sendbutton"
                >
                  {loading ? (
                  <CgSpinner size={23} className="mt-1 animate-spin" />
                    ) : null}
                  <span style={{ display: loading ? 'none' : 'inline' }}>
                    Send code via SMS
                 </span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OTP;
