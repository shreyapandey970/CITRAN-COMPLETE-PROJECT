import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import Banner from '../Components/Banner/Banner';
import CoinsTable from '../Components/CoinsTable';
import { AuthContext } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'


const Homepage = () => {
  const { currentUser } = useContext(AuthContext);
  console.log('CurrentUser: ', currentUser);

  if(!currentUser)
  {
    return <Navigate to="/login" />
  }

  return (
    <>
      <img src={currentUser.photoURL || 'https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png'} alt="Profile" id="profilepic" />
      <p id="pp">{currentUser.displayName || 'Guest'}</p>
      <button onClick={()=>signOut(auth)} className="image-button"  ><img src={require('../Images/logout.png')} id="logout" /></button>
      
      <Navbar />
      <Banner />
      
      <CoinsTable />
      <Footer />
    </>
  );
};

export default Homepage;
