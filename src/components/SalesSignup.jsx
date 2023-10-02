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
  const [Toggle,setToggle] = useState(true)
  const [loading,setLoading] = useState(false)
  const [otpLoading,setOtpLoading] = useState(false)
  const [verifyLoading,setVerifyLoading] = useState(false)



  const handleSendOtp = async(e) => {
    e.preventDefault()
    setOtpLoading(true)
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/sendSalesOTP`,{email})
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
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/verifySalesOTP`,{otp})
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
    if(!fullName || !position || !mobileNumber || !email || !password){
        alert("Please fill all the field")
        return
    }
    setLoading(true)
    let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/salesSignup`,{fullName,position,companyName,mobileNumber,email,password})
    response = await response.data.message
    alert(response)
    setLoading(false)
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

  const toggle = ()=>{
    setToggle(false)
  }

  let url = `https://img.freepik.com/free-vector/happy-salesman-character-with-flat-design_23-2147875426.jpg`
  return (<>

  {Toggle? <div className='container'>
    <div><h1 className='profile'>Sales Profile</h1></div>
    <div><img src={url} alt='sales person'/></div>
    <div>
      <form>
        <div>
          <input
            type="text"
            required
            value={fullName}
            placeholder='Enter Your Full Name'
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            required
            value={position}
            placeholder='Enter Your Position'
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={companyName}
            placeholder='Enter Your Company Name'
            onChange={(e) => setCompanyName(e.target.value)}
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
    </div>  :     <Login route="salesLogin" profile={"Sales"} url={url} />
}
    
  </>);
};

export default SalesSignup;
