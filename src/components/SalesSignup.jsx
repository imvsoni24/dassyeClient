import React, { useState } from 'react';
import axios from "axios"
import Login from './Login';

const SalesSignup = () => {
  const [fullName, setFullName] = useState('');
  const [position,setPosition] = useState("")
  const [companyName,setCompanyName] = useState("")
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleSendOtp = async(e) => {
    e.preventDefault()
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/sendSalesOTP`,{email})
    response = await response.data.message
    alert(response)
    if(response ==="OTP sent successfully"){
        alert("Please verify otp")
    }
  };

  const handleVerifyOtp = async(e) => {
    e.preventDefault()
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/verifySalesOTP`,{otp})
    response = await response.data.message
    alert(response)
    if(response==="OTP verified"){
        setIsOtpVerified(true)
        alert("Please signup")
    }
  };

  const handleSignup = async(e) => {
    e.preventDefault()
    if(!fullName || !position || !mobileNumber || !email || !password){
        alert("Please fill all the field")
        return
    }
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/salesSignup`,{fullName,position,companyName,mobileNumber,email,password})
    response = await response.data.message
    alert(response)
    if(response ==="Registered successfully"){
        alert("Please login")
        setFullName("")
        setPosition("")
        setCompanyName("")
        setMobileNumber("")
        setEmail("")
        setOtp("")
        setPassword("")
        setIsOtpVerified(false)
    }
  };

  return (<>
    <div className='container'>
    <div><h1>Sales Profile</h1></div>
    <div><img src='https://img.freepik.com/free-vector/happy-salesman-character-with-flat-design_23-2147875426.jpg' alt='sales person'/></div>
    <div>
      <form>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            required
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
    <Login route="salesLogin" />
  </>);
};

export default SalesSignup;
