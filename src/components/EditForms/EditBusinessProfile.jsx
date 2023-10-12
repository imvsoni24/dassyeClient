import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EditBusinessProfile = () => {

    const [data,setData] = useState({})
    const [businessName, setBusinessName] = useState('');
    const [distributorName,setDistributorName] = useState('')
    const [location,setLocation] = useState("")
    const [website,setWebsite] = useState("")
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
        const businessId = localStorage.getItem("Business id")
        const config = {
            headers: { 'Business-Id': businessId }, // Send email as a custom header
          };
        let response = await axios.get("http://localhost:4500/getBusinessProfile",config) 
        response = await response.data
        response = await response.data
        setData(response)
    }
    useEffect(()=>{
        getProfile()
    },[])

    useEffect(()=>{
        setBusinessName(data?.businessName || '');
        setDistributorName(data?.distributorName || '');
        setLocation(data?.location || '');
        setWebsite(data?.website || '');
        setMobileNumber(data?.mobileNumber || '');
        setEmail(data?.email || '');
    },[data])

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
            setIsEdited(false)
        }
      };

      const handleUpdate = async(e)=>{
        e.preventDefault()
        setLoading(true)
        let response = await axios.patch(`http://localhost:4500/updateBusinessProfile/${data?._id}`, {
      businessName,
      distributorName,
      location,
      website,
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
        let response = await axios.patch(`http://localhost:4500/updateBusinessPassword/${data?._id}`, {
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
          <label>Business Name</label>
          <input
            type="text"
            required
            value={businessName}
            placeholder='Update Your Business Name'
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <div>
          <label>Distributor Name</label>
          <input
            type="text"
            required
            value={distributorName}
            placeholder='Update Your Distributor Name'
            onChange={(e) => setDistributorName(e.target.value)}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            required
            value={location}
            placeholder='Update Your Location'
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
        <label>Website Url</label>
          <input
            type="text"
            value={website}
            placeholder='Update Your Website URL'
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
        <label>Mobile Number</label>
          <input
            type="tel"
            required
            value={mobileNumber}
            placeholder='Update Your Mobile Number'
            onChange={(e) => setMobileNumber(e.target.value)}
          />    
        </div>
        <div>
        <label>Email</label>
          <input
            type="email"
            required
            value={email}
            placeholder='Update Your Email Id'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOtp}>{otpLoading?"Loading...":"Send OTP"}</button>
        </div>
        <div>
          <input
            type="text"
            required
            value={otp}
            placeholder='Verify OTP'
            onChange={(e) => setOtp(e.target.value)}
          />
          <button disabled={otp.length===0  } onClick={handleVerifyOtp}>{verifyLoading?"Loading...":"Verify OTP"}</button>
        </div>
        <button disabled={data.email!==email && isEdited} className='submit' onClick={handleUpdate} >
          {loading?"Loading...":"Update"}
        </button>
      </form>
    </div>
         <div className='container'>
            <div>
            <input
              type="password"
              required
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

export default EditBusinessProfile