import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EditShopProfile = () => {

    const [data,setData] = useState({})
    const [shopName, setShopName] = useState('');
    const [location,setLocation] = useState("")
    const [typeOfShop,setTypeOfShop] = useState("")
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
        const shopId = localStorage.getItem("Shop id")
        const config = {
            headers: { 'Shop-Id': shopId }, // Send email as a custom header
          };
        let response = await axios.get("http://localhost:4500/getShopProfile",config) 
        response = await response.data
        response = await response.data
        setData(response)
    }
    useEffect(()=>{
        getProfile()
    },[])

    useEffect(()=>{
        setShopName(data?.shopName || '');
        setTypeOfShop(data?.typeOfShop || '');
        setLocation(data?.location || '');
        setMobileNumber(data?.mobileNumber || '');
        setEmail(data?.email || '');
    },[data])

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
            setIsEdited(false)
        }
      };

      const handleUpdate = async(e)=>{
        e.preventDefault()
        setLoading(true)
        let response = await axios.patch(`http://localhost:4500/updateShopProfile/${data?._id}`, {
      shopName,
      typeOfShop,
      location,
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
        let response = await axios.patch(`http://localhost:4500/updateShopPassword/${data?._id}`, {
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
          <label>Shop Name</label>
          <input
            type="text"
            required
            value={shopName}
            placeholder='Update Your Shop Name'
            onChange={(e) => setShopName(e.target.value)}
          />
        </div>
        <div>
          <label>Type Of Shop</label>
          <input
            type="text"
            required
            value={typeOfShop}
            placeholder='Update Your Shop Type'
            onChange={(e) => setTypeOfShop(e.target.value)}
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
        <button disabled={data?.email!==email && isEdited} className='submit' onClick={handleUpdate} >
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

export default EditShopProfile