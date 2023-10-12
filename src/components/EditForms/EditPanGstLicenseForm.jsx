import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const EditPanGstLicenseForm = () => {
  const [panNumber, setPanNumber] = useState("")
  const [gstinNumber,setGstinNumber] = useState("")
  const [panGst,setPanGst] = useState({})
  const [licenseNumber, setLicenseNumber] = useState("")
  const [issuingAuthority,setIssuingAuthority] = useState("")
  const [expirationDate,setExpirationDate] = useState("")
  const [license,setLicense] = useState({})
  const location = useLocation()
  const [panLoading,setPanLoading] = useState(false)
  const [licenseLoading,setLicenseLoading] = useState(false)

  const getPanGst = async()=>{
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
    let response = await axios.get(`http://localhost:4500/getPanGst`,config)
    response = await response.data
    setPanGst(response.data)
    console.log(response)
  }
  useEffect(()=>{
    getPanGst()
  },[])

  useEffect(()=>{
    setPanNumber(panGst?.panNumber || '');
    setGstinNumber(panGst?.gstinNumber || '');
},[panGst])


const getLicense = async()=>{
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
  let response = await axios.get(`http://localhost:4500/getLicense`,config)
  response = await response.data
  setLicense(response.data)
  console.log(response)
}
useEffect(()=>{
  getLicense()
},[])

useEffect(()=>{
  setLicenseNumber(license?.licenseNumber || '');
  setIssuingAuthority(license?.issuingAuthority || '');
  setExpirationDate(license?.expirationDate || '')
},[license])

  const updatePanGst = async(e)=>{
    e.preventDefault()
    setPanLoading(true)
    let response = await axios.patch(`http://localhost:4500/updatePanGst/${panGst?._id}`, {
      panNumber,gstinNumber
    });
    setPanLoading(false)
    alert(response.data.message)
  }

  const updateLicense = async(e)=>{
    e.preventDefault()
    setLicenseLoading(true)
    let response = await axios.patch(`http://localhost:4500/updateLicense/${license?._id}`, {
      licenseNumber,issuingAuthority,expirationDate
    });
    setLicenseLoading(false)
    alert(response.data.message)
  }


  return (
    <div>
      <div className='container'>
      <form onSubmit={updatePanGst}>
      <label>
        PAN Number:
        </label>
        <input
          type="text"
          name="panNumber"
          value={panNumber}
          onChange={(e)=>setPanNumber(e.target.value)}
        />
      <label>
        GSTIN Number:
        </label>
        <input
          type="text"
          name="gstinNumber"
          value={gstinNumber}
          onChange={(e)=>setGstinNumber(e.target.value)}
        />
      <button type="submit">{panLoading?"Loading...":"Edit PAN/GSTIN"}</button>
    </form>
      </div>
      <div className='container'>
      <form onSubmit={updateLicense}>
      <label>
        License Number:
        </label>
        <input
          type="text"
          name="licenseNumber"
          value={licenseNumber}
          onChange={(e)=>setLicenseNumber(e.target.value)}
          required
        />
      
      <label>
        Issuing Authority:
        </label>
        <input
          type="text"
          name="issuingAuthority"
          value={issuingAuthority}
          onChange={(e)=>setIssuingAuthority(e.target.value)}
          required
        />
      
      <label>
        Expiration Date:
        </label>
        <input
          type="date"
          name="expirationDate"
          value={expirationDate}
          onChange={(e)=>setExpirationDate(e.target.value)}
          required
        />
      <button type="submit">{licenseLoading?"Loading...":"Update License"}</button>
    </form>
      </div>
    </div>
  )
}

export default EditPanGstLicenseForm  