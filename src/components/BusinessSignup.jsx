import React, { useState } from 'react';
import axios from "axios"
import Login from './Login';
import { Link } from 'react-router-dom';
import {IoNavigateOutline} from "react-icons/io5"

const BusinessSignup = () => {
  const [businessName, setBusinessName] = useState('');
  const [distributorName,setDistributorName] = useState('')
  const [location,setLocation] = useState("")
  const [website,setWebsite] = useState("")
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
    let response = await axios.post(`http://localhost:4500/sendBusinessOTP`,{email})
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
    let response = await axios.post(`http://localhost:4500/verifyBusinessOTP`,{otp})
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
    if(!businessName || !distributorName || !location || !mobileNumber || !email || !password){
      alert("Please fill all the field")
      return
    }
    setLoading(true)
    let response = await axios.post(`http://localhost:4500/businessSignup`,{businessName,distributorName,location,website,mobileNumber,email,password})
    response = await response.data.message
    alert(response)
    setLoading(false)
    if(response ==="Registered successfully"){
        alert("Please login")
        setBusinessName("")
        setDistributorName("")
        setLocation("")
        setWebsite("")
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

  let url = `https://img.freepik.com/free-vector/elegant-circle-logo-icon_126523-971.jpg`

  return (<>

    {Toggle? <div className="container" >
    <div><h1 className='profile'><Link className='navigate' to="/businessprofile">Business Profile<IoNavigateOutline/></Link></h1></div>
    <div><img src={url} alt='Business'/></div>
    <div>
      <form>
        <div>
          <input
            type="text"
            required
            value={businessName}
            placeholder='Enter Your Business Name'
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            required
            value={distributorName}
            placeholder='Enter Your Distributor Name'
            onChange={(e) => setDistributorName(e.target.value)}
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
            value={website}
            placeholder='Enter Your Website URL'
            onChange={(e) => setWebsite(e.target.value)}
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
    </div> : <Login route="businessLogin" profile={"Business"} url={url} state={Toggle} />}
  </>);
};

export default BusinessSignup;
