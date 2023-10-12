import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function LicenseForm() {
  const [licenseNumber, setLicenseNumber] = useState("")
  const [issuingAuthority,setIssuingAuthority] = useState("")
  const [expirationDate,setExpirationDate] = useState("")
  const location = useLocation()
  const [loading,setLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(location.pathname==="/businessprofile"){
      var businessId = localStorage.getItem("Business id");
    }else if(location.pathname==="/salesprofile"){
      var salesId = localStorage.getItem("Sales id")
    }else if(location.pathname==="/shopprofile"){
      var shopId = localStorage.getItem("Shop id");
    }
    if(!licenseNumber || !issuingAuthority || !expirationDate){
        alert("Please fill all the field")
        return
    }
    setLoading(true)
    let response = await axios.post("http://localhost:4500/saveLicense",
    {licenseNumber,issuingAuthority,expirationDate, id: businessId || shopId || salesId}
    )

    response = await response.data.message
    setLoading(false)
    alert(response)
    if(response==="License has been added"){
        setLicenseNumber("")
        setIssuingAuthority("")
        setExpirationDate("")
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="licenseNumber"
          value={licenseNumber}
          placeholder='License Number'
          onChange={(e)=>setLicenseNumber(e.target.value)}
          required
        />
        <input
          type="text"
          name="issuingAuthority"
          value={issuingAuthority}
          placeholder='Issuing Authority'
          onChange={(e)=>setIssuingAuthority(e.target.value)}
          required
        />
        <input
          type="date"
          name="expirationDate"
          value={expirationDate}
          onChange={(e)=>setExpirationDate(e.target.value)}
          required
        />
      <button type="submit">{loading?"Loading...":"Submit License"}</button>
    </form>
    </div>
  );
}

export default LicenseForm;
