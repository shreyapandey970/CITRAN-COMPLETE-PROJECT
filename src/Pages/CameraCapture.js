// CameraCapture.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { AuthContext } from '../AuthContext';

const isGetUserMediaSupported = () => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

const BrowserSupportCheck = () => {
  useEffect(() => {
    if (isGetUserMediaSupported()) {
      console.log('getUserMedia is supported in this browser.');
    } else {
      console.log('getUserMedia is not supported in this browser.');
    }
  }, []);

  return null;
};

const CameraCapture = () => {
  
const { currentUser } = useContext(AuthContext);
  console.log("CurrentUser in CC: ",currentUser);
  const [isCameraReady, setCameraReady] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let videoStream;
    const startCamera = async () => {
      try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
          setCameraReady(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast.error("Error accessing camera. Please ensure camera permissions are granted and try again.");
      }
    };

    startCamera();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = async() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageURL = canvas.toDataURL('image/jpeg');
    console.log('Captured image:', imageURL);

    try {
      const imageDocRef = doc(db, 'images', currentUser.uid); // Assuming you want to store images per user
      await setDoc(imageDocRef, { imageURL }); // Store imageURL in Firestore

      toast.success("Images are captured as a precautionary measure against malpractices");
      toast.success("Image captured successfully!!");
      
      // Navigate after a delay (you can adjust the delay as needed)
      setTimeout(() => {
        navigate("/login");
        setIsCaptured(true);
      }, 5000);
    } catch (error) {
      console.error('Error storing image:', error);
      toast.error("Error storing image. Please try again later.");
    }

  };

  if (isCaptured) {
    return <p id="camecap">{message}</p>;
  }

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="square"></div>
      <img src={require('../Images/HEY.gif')} id="camcapture" />
      <p id="came">LOOK INTO THE CAMERA!!</p>
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline className="video-element" />
        <br /><br />
        <button onClick={handleCapture} className="capture-button">
          Capture
        </button>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default CameraCapture;



