import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function BankDetailsForm() {
  const [accountNumber, setAccountNumber] = useState('')
  const [bankName,setBankName] = useState("")
  const [ifscCode,setIfcsCode] = useState("")
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
    if(!accountNumber || !bankName || !ifscCode){
        alert("Please fill all the field")
        return
    }
    setLoading(true)
    let response = await axios.post("http://localhost:4500/saveBankDetails",
    {accountNumber,bankName,ifscCode,id:businessId || salesId || shopId}
    )

    response = await response.data.message
    setLoading(false)
    alert(response)
    if(response==="Account has been added"){
        setAccountNumber("")
        setBankName("")
        setIfcsCode("")
    }
    
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="accountNumber"
          value={accountNumber}
          placeholder='Account Number'
          onChange={(e)=>setAccountNumber(e.target.value)}
          required
        />
        <input
          type="text"
          name="bankName"
          value={bankName}
          placeholder='Bank Name'
          onChange={(e)=>setBankName(e.target.value)}
          required
        />
        <input
          type="text"
          name="ifscCode"
          value={ifscCode}
          placeholder='IFSC code'
          onChange={(e)=>setIfcsCode(e.target.value)}
          required
        />
      <button type="submit">{loading?"Loading...":"Submit Bank Details"}</button>
    </form>
    </div>
  );
}

export default BankDetailsForm;
