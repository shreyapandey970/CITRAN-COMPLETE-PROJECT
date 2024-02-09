import React,{useState} from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth , storage, db} from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';


const Register = () => {
  const [err,setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  


  const handleSubmit = async(e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    




    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

     uploadTask.on(
      'state_changed',null,
          (error) => {
                        setErr(true);
                     }, 
      () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                 await updateProfile(res.user,{
                displayName,
                photoURL : downloadURL,
                 });
                await setDoc(doc(db,"users",res.user.uid),{
                id : res.user.uid,
                displayName,
                email,
                photoURL : downloadURL,
                });
                                                                                                                      
               
              // navigate("/");

               setSuccess(true);
               });
            }
        );

        /*toast.success("Please proceed to Login");
        toast.success("Registered Successfully!");
        navigate('/OTP')*/
        setTimeout(() => {
          toast.success("Please proceed to verify your phone number");
          toast.success("Registered Successfully!");
          
        }, 2000);

        // Add another delay before the second toast and navigation
        setTimeout(() => {
          navigate('/OTP');
        }, 4000); // Adjust the delay as need

        }catch(err){
            toast.error("Registration Failed! Either a user with the same name already exists or check for your network connection");
            toast.error("Verify if you have filled out all fields");
            setErr(true);
        }



  }
  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <img src={require('../Images/loginback.jpg')} height={60} width={250} id="convoimg"></img>
      <div id="loginalign"></div>
        <div id="registeritems">
            <div id="registercard">
              <tr></tr>
            <h3>Register</h3>
            <form onSubmit={handleSubmit} id="log">
                <input type="text" placeholder="Enter Display Name" id="input1"/><p></p>
                <input type="email" placeholder="Enter Email" id="input2"/><p></p>
                <input type="password" placeholder="Enter Password" id="input3"/><p></p>
                <input style={{display:"none"}} type="file" id="file" /><p></p>
                
                <label htmlFor="file" ><img id="avatar" src={require('../Images/avtar.png')} height={40} width={40}></img>Add an Avatar</label><p></p>
                <button id="signinbutton">Sign Up</button><p></p>
                
                
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        </div>
    </div>
  )
}

export default Register


//Enable Email/Password Authentication - (Only Email)

//In case of Axios XMLHttp error, CORS Error, Check firebaseDB rules (set to if true) in Storage + FireStore