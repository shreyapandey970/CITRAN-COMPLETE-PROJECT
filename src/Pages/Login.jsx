import React, {useState} from 'react'
import { useNavigate , Link} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {toast, Toaster} from 'react-hot-toast';

const Login = () => {

  const [err,setErr] = useState(false);
  const navigate = useNavigate();
  const [i, setI] = useState(0);


  const handleSubmit = async(e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    
    try{
      
      
        await signInWithEmailAndPassword(auth, email, password)
        navigate("/Homepage")
      
      
     
  

    }catch(err){
      setErr(true);
      // Increment the number of login attempts
      setI(prevI => prevI + 1);
    
      if (i >= 5) {
        //console.log("No attempts left");
        toast.error("No Attempts Left! Please try again after 24hrs.  ");
      }
    
      console.log(i); // Log the number of attempts
      toast.error("Login Failed! Please verify your credentials");

  }
  }

  return (
    
        <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <img src={require('../Images/loginback.jpg')} height={60} width={250} id="convoimg"></img>
            <div id="loginalign"></div>
              <div id="registeritems">
                <div id="registercard">
                  <br></br>
                <h3>Login</h3>
                   <form onSubmit={handleSubmit} id="log">
                
                     <input type="email" placeholder="Enter Email" id="input1" /><p></p>
                    <input type="password" placeholder="Enter Password" id="input2"/><br></br><br></br>
            
                    <button id="signinbutton">Login</button><p></p>
                   
                </form>
                <p>New to CITRAN? <Link to="/register">Register</Link></p>
                
            </div>
        </div>
      </div>
    
  )
}

export default Login;
