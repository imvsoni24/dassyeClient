import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EditSalesProfile = () => {

    const [data,setData] = useState({})
    const [fullName, setFullName] = useState('');
    const [position,setPosition] = useState("")
    const [companyName,setCompanyName] = useState("")
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const [otpLoading,setOtpLoading] = useState(false)
    const [verifyLoading,setVerifyLoading] = useState(false)
    const [isEdited,setIsEdited] = useState(true)
    const [passLoading,setPassLoading] = useState(false)

    
    

    const getProfile = async()=>{
        const salesId = localStorage.getItem("Sales id")
        const config = {
            headers: { 'Sales-Id': salesId },
          };
        let response = await axios.get("http://localhost:4500/getSalesProfile",config) 
        response = await response.data
        response = await response.data
        setData(response)
    }
    useEffect(()=>{
        getProfile()
    },[])

    useEffect(()=>{
        setFullName(data?.fullName || '');
        setPosition(data?.position || '');
        setCompanyName(data?.companyName || '');
        setMobileNumber(data?.mobileNumber || '');
        setEmail(data?.email || '');
    },[data])

      const handleSendOtp = async(e) => {
        e.preventDefault()
        setOtpLoading(true)
        let response = await axios.post(`http://localhost:4500/sendSalesOTP`,{email})
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
        let response = await axios.post(`http://localhost:4500/verifySalesOTP`,{otp})
        response = await response.data.message
        alert(response)
        setVerifyLoading(false)
        if(response==="OTP verified"){
            setIsEdited(false)
        }
      };

      const handleUpdate = async(e)=>{
        e.preventDefault()
        setLoading(true)
        let response = await axios.patch(`http://localhost:4500/updateSalesProfile/${data?._id}`, {
      fullName,
      position,
      companyName,
      mobileNumber,
      email,
    });
    response = await response.data
        let message = await response.message
        setLoading(false)
        alert(message)
      }

      const UpdatePassword = async(e)=>{
        e.preventDefault()
        setPassLoading(true)
        let response = await axios.patch(`http://localhost:4500/updateSalesPassword/${data?._id}`, {
        password
    });
    response = await response.data
        let message = await response.message
        setPassLoading(false)
        alert(message)
        setPassword("")
      }


  return (
    <div>
    <div className='container'>
      <form>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            placeholder='Update Your Name'
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            value={position}
            placeholder='Update Your Position'
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            placeholder='Update Your Company Name'
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
        <label>Mobile Number</label>
          <input
            type="tel"
            value={mobileNumber}
            placeholder='Update Your Mobile Number'
            onChange={(e) => setMobileNumber(e.target.value)}
          />    
        </div>
        <div>
        <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder='Update Your Email Id'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOtp}>{otpLoading?"Loading...":"Send OTP"}</button>
        </div>
        <div>
          <input
            type="text"
            value={otp}
            placeholder='Verify OTP'
            onChange={(e) => setOtp(e.target.value)}
          />
          <button disabled={otp.length===0  } onClick={handleVerifyOtp}>{verifyLoading?"Loading...":"Verify OTP"}</button>
        </div>
        <button disabled={data?.email!==email && isEdited} className='submit' onClick={handleUpdate} >
          {loading?"Loading...":"Update"}
        </button>
      </form>
    </div>
         <div className='container'>
            <div>
            <input
              type="password"
              value={password}
              placeholder='Update Your Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button disabled={password.length===0} className='submit' onClick={UpdatePassword} >
          {passLoading?"Loading...":"Update"}
        </button>
            </div>
    </div>
  )
}

export default EditSalesProfile