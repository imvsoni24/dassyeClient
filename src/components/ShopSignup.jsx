import React, { useState } from 'react';
import axios from "axios"
import Login from './Login';

const ShopSignup = () => {
  const [shopName, setShopName] = useState('');
  const [location,setLocation] = useState("")
  const [typeOfShop,setTypeOfShop] = useState("")
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleSendOtp = async(e) => {
    e.preventDefault()
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/sendShopOTP`,{email})
    response = await response.data.message
    alert(response)
    if(response ==="OTP sent successfully"){
        alert("Please verify otp")
    }
  };

  const handleVerifyOtp = async(e) => {
    e.preventDefault()
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/verifyShopOTP`,{otp})
    response = await response.data.message
    alert(response)
    if(response==="OTP verified"){
        setIsOtpVerified(true)
        alert("Please signup")
    }
  };

  const handleSignup = async(e) => {
    e.preventDefault()
    if(!shopName || !location || !mobileNumber || !email || !password){
        alert("Please fill all the field")
        return
    }
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/shopSignup`,{shopName,location,typeOfShop,mobileNumber,email,password})
    console.log(response)
    response = await response.data.message
    alert(response)
    if(response ==="Registered successfully"){
        alert("Please login")
        setShopName("")
        setLocation("")
        setTypeOfShop("")
        setMobileNumber("")
        setEmail("")
        setOtp("")
        setPassword("")
        setIsOtpVerified(false)
    }
  };

  return (<>
    <div className='container'>
    <div><h1>Shop Profile</h1></div>
    <div><img src='https://www.shutterstock.com/shutterstock/photos/1290022027/display_1500/stock-vector-shop-logo-good-shop-logo-1290022027.jpg' alt=''/></div>
    <div>
      <form>
        <div>
          <label>Shop Name:</label>
          <input
            type="text"
            required
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
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
          <label>Type of shop:</label>
          <input
            type="text"
            value={typeOfShop}
            onChange={(e) => setTypeOfShop(e.target.value)}
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
    <Login route="shopLogin" />
  </>);
};

export default ShopSignup;
