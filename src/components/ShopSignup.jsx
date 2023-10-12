import React, { useState } from 'react';
import axios from "axios"
import Login from './Login';
import { Link } from 'react-router-dom';
import {IoNavigateOutline} from "react-icons/io5"

const ShopSignup = () => {
  const [shopName, setShopName] = useState('');
  const [location,setLocation] = useState("")
  const [typeOfShop,setTypeOfShop] = useState("")
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [Toggle,setToggle] = useState(true)
  const [loading,setLoading] = useState(false)
  const [otpLoading,setOtpLoading] = useState(false)
  const [verifyLoading,setVerifyLoading] = useState(false)



  const handleSendOtp = async(e) => {
    e.preventDefault()
    setOtpLoading(true)
    let response = await axios.post(`http://localhost:4500/sendShopOTP`,{email})
    response = await response.data.message
    alert(response)
    setOtpLoading(false)
    if(response ==="OTP sent successfully"){
        alert("Please verify otp")
    }
  };

  const handleVerifyOtp = async(e) => {
    e.preventDefault()
    setVerifyLoading(true)
    let response = await axios.post(`http://localhost:4500/verifyShopOTP`,{otp})
    response = await response.data.message
    alert(response)
    setVerifyLoading(false)
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
    setLoading(true)
    let response = await axios.post(`http://localhost:4500/shopSignup`,{shopName,location,typeOfShop,mobileNumber,email,password})
    console.log(response)
    response = await response.data.message
    alert(response)
    setLoading(false)
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

  const toggle = ()=>{
    setToggle(false)
  }

  let url ='https://www.shutterstock.com/shutterstock/photos/1290022027/display_1500/stock-vector-shop-logo-good-shop-logo-1290022027.jpg'

  return (<>

  { Toggle? <div className='container'>
    <div><h1 className='profile'><Link className='navigate' to="/shopprofile">Shop Profile<IoNavigateOutline/></Link></h1></div>
    <div><img src={url} alt='shop'/></div>
    <div>
      <form>
        <div>
          <input
            type="text"
            required
            value={shopName}
            placeholder='Enter Your Shop Name'
            onChange={(e) => setShopName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            required
            value={location}
            placeholder='Enter Your Location'
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={typeOfShop}
            placeholder='Enter Your Shop Type'
            onChange={(e) => setTypeOfShop(e.target.value)}
          />
        </div>
        <div>
          <input
            type="tel"
            required
            value={mobileNumber}
            placeholder='Enter Your Mobile Number'
            onChange={(e) => setMobileNumber(e.target.value)}
          />    
        </div>
        <div>
          <input
            type="email"
            required
            value={email}
            placeholder='Enter Your Email Id'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button disabled={email.length===0} onClick={handleSendOtp}>{otpLoading?"Loading...":"Send OTP"}</button>
        </div>
        <div>
          <input
            type="text"
            required
            value={otp}
            placeholder='Enter OTP'
            onChange={(e) => setOtp(e.target.value)}
          />
          <button disabled={otp.length===0} onClick={handleVerifyOtp}>{verifyLoading?"Loading...":"Verify OTP"}</button>
        </div>
          <div>
            <input
              type="password"
              required
              value={password}
              placeholder='Create Your Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        <button className='submit' onClick={handleSignup} disabled={!isOtpVerified}>
        {loading?"Loading...":"Sign up"}
        </button>
        <div className='or'>Or</div>
        <button onClick={toggle} className='submit'>Log in</button>
      </form>
    </div>
    </div> : <Login route="shopLogin" profile={"Shop"} url={url} />}
    
  </>);
};

export default ShopSignup;
