import './App.scss';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Login from './Pages/Login';
import Register from './Pages/Register';
import OTP from './Pages/OTP';
import CameraCapture from './Pages/CameraCapture';
import ContactUs from './Pages/ContactUs';
import About from './Pages/About';
import CryptoPatterns from './Pages/CryptoPatterns';
import Chatbot from './Components/Chatbot';
import NotFoundPage from './Pages/NotFoundPage';


function App() {

  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    
    if(!currentUser){
      
      return <Navigate to = "/login" />
    }
    return children
  };
  

  return (
    <div>
    <BrowserRouter>
        <Header />
        
        <Routes>
          
          <Route path="/">

            <Route index element={<ProtectedRoute>
              <Homepage />
              </ProtectedRoute>} />

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path='otp' element={<OTP />} />
              <Route path='capture' element={<CameraCapture />} />
              <Route path='homepage' element={<Homepage/>} exact/>
              <Route path='coins/:id' element={<CoinPage/>} />
              <Route path="contactus" element={<ContactUs />} />
              <Route path="about" element={<About />} />
              <Route path="cryptopatterns" element={<CryptoPatterns />} />
              <Route path="chatbot" element={<Chatbot />} />
              
              <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>

        <Chatbot />
    </BrowserRouter>
    </div>
  );
}

export default App;
