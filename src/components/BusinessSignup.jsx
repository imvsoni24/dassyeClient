import React, { useState } from 'react';
import axios from "axios"
import Login from './Login';

const BusinessSignup = () => {
  const [businessName, setBusinessName] = useState('');
  const [location,setLocation] = useState("")
  const [website,setWebsite] = useState("")
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleSendOtp = async(e) => {
    e.preventDefault()
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/sendBusinessOTP`,{email})
    response = await response.data.message
    alert(response)
    if(response ==="OTP sent successfully"){
      alert("Please verify otp")
    }
    
  };

  const handleVerifyOtp = async(e) => {
    e.preventDefault()
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/verifyBusinessOTP`,{otp})
    response = await response.data.message
    alert(response)
    if(response==="OTP verified"){
        setIsOtpVerified(true)
        alert("Please signup")
    }
  };

  const handleSignup = async(e) => {
    e.preventDefault()
    if(!businessName || !location || !mobileNumber || !email || !password){
      alert("Please fill all the field")
      return
    }
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/businessSignup`,{businessName,location,website,mobileNumber,email,password})
    response = await response.data.message
    alert(response)
    if(response ==="Registered successfully"){
        alert("Please login")
        setBusinessName("")
        setLocation("")
        setWebsite("")
        setMobileNumber("")
        setEmail("")
        setOtp("")
        setPassword("")
        setIsOtpVerified(false)
    }
  };

  return (<>
    <div className="container" >
    <div><h1>Business Profile</h1></div>
    <div><img src='https://img.freepik.com/free-vector/elegant-circle-logo-icon_126523-971.jpg' alt='Business'/></div>
    <div>
      <form>
        <div>
          <label>Business Name:</label>
          <input
            type="text"
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Website:</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="tel"
            required
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />    
        </div>
        <div>
          <label>Email Id:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button disabled={email.length===0} onClick={handleSendOtp}>Send OTP</button>
        </div>
        <div>
          <label>OTP:</label>
          <input
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button disabled={otp.length===0} onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        <button onClick={handleSignup} disabled={!isOtpVerified}>
          Sign Up
        </button>
      </form>
    </div>
    </div>
    <Login route="businessLogin" />
  </>);
};

export default BusinessSignup;
