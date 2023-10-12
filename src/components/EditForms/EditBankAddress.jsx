import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const EditBankAddress = () => {
  const [street,setStreet] = useState("")
  const [city,setCity] = useState("")
  const [state,setState] = useState("")
  const [postal,setPostal] = useState("")
  const [address,setAddress] = useState({})
  const location = useLocation()
  const [accountNumber, setAccountNumber] = useState('')
  const [bankName,setBankName] = useState("")
  const [ifscCode,setIfcsCode] = useState("")
  const [bank,setBank] = useState({})
  const [addressLoading,setAddressLoading] = useState(false)
  const [bankLoading,setBankLoading] = useState(false)

  

  const getAddress = async()=>{
    if(location.pathname==="/businessprofile"){
      var businessId = localStorage.getItem("Business id");
    }else if(location.pathname==="/salesprofile"){
      var salesId = localStorage.getItem("Sales id")
    }else if(location.pathname==="/shoprofile"){
      var shopId = localStorage.getItem("Shop id");
    }
        const config = {
            headers: { 'id': businessId || salesId || shopId },
          };
    let response = await axios.get(`http://localhost:4500/getAddress`,config)
    response = await response.data
    setAddress(response.data)
    console.log(response)
  }
  useEffect(()=>{
    getAddress()
  },[])

  useEffect(()=>{
    setStreet(address?.street || '');
    setCity(address?.city || '');
    setState(address?.state || '')
    setPostal(address?.postal || '')
},[address])

const getBank = async()=>{
  if(location.pathname==="/businessprofile"){
    var businessId = localStorage.getItem("Business id");
  }else if(location.pathname==="/salesprofile"){
    var salesId = localStorage.getItem("Sales id")
  }else if(location.pathname==="/shopprofile"){
    var shopId = localStorage.getItem("Shop id");
  }
      const config = {
          headers: { 'id': businessId || salesId || shopId },
        };
  let response = await axios.get(`http://localhost:4500/getBankDetails`,config)
  response = await response.data
  setBank(response.data)
  console.log(response)
}
useEffect(()=>{
  getBank()
},[])

useEffect(()=>{
  setAccountNumber(bank?.accountNumber || '')
  setBankName(bank?.bankName || "")
  setIfcsCode(bank?.ifscCode)
},[bank])

const updateAddress = async(e)=>{
  e.preventDefault()
  setAddressLoading(true)
  let response = await axios.patch(`http://localhost:4500/updateAddress/${address?._id}`, {
      street,city,state,postal
    });
    setAddressLoading(false)
    alert(response.data.message)
}

const updateBank = async(e)=>{
  e.preventDefault()
  setBankLoading(true)
  let response = await axios.patch(`http://localhost:4500/updateBankDetails/${bank?._id}`, {
      accountNumber,bankName,ifscCode
    });
    setBankLoading(false)
    alert(response.data.message)
}


  return (
    <div>
      <div className='container'>
      <form onSubmit={updateAddress}>
      <label>
        Street Address:</label>
        <input
          type="text"
          name="streetAddress"
          value={street}
          onChange={(e)=>setStreet(e.target.value)}
          required
        />
      
      <label>
        City:</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          required
        />
      
      <label>
        State:</label>
        <input
          type="text"
          name="state"
          value={state}
          onChange={(e)=>setState(e.target.value)}
          required
        />
      
      <label>
        Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          value={postal}
          onChange={(e)=>setPostal(e.target.value)}
          required
        />
      
      <button type="submit">{addressLoading?"Loading...":"Update Address"}</button>
    </form>
      </div>
      <div className='container'>
      <form onSubmit={updateBank}>
      <label>
        Account Number:</label>
        <input
          type="text"
          name="accountNumber"
          value={accountNumber}
          onChange={(e)=>setAccountNumber(e.target.value)}
          required
        />
      
      <label>
        Bank Name:</label>
        <input
          type="text"
          name="bankName"
          value={bankName}
          onChange={(e)=>setBankName(e.target.value)}
          required
        />
      
      <label>
        IFSC Code:</label>
        <input
          type="text"
          name="ifscCode"
          value={ifscCode}
          onChange={(e)=>setIfcsCode(e.target.value)}
          required
        />
      
      <button type="submit">{bankLoading?"Loading...":"Update Bank Details"}</button>
    </form>
      </div>
    </div>
  )
}

export default EditBankAddress