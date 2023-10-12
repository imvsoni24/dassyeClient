import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function PanGstinForm() {
  const [panNumber, setPanNumber] = useState("")
  const [gstinNumber,setGstinNumber] = useState("")
  const location = useLocation()
  const [loading,setLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(location.pathname==="/businessprofile"){
      var businessId = localStorage.getItem("Business id");
    }else if(location.pathname==="/shopprofile"){
      var shopId = localStorage.getItem("Shop id");
    }
    if(!panNumber){
        alert("Please add PAN number")
        return
    }
    setLoading(true)
    let response = await axios.post("http://localhost:4500/savePanGstin",
    {panNumber,gstinNumber,id: businessId || shopId}
    )

    response = await response.data.message
    setLoading(false)
    alert(response)
    if(response==="Details has been added"){
        setPanNumber("")
        setGstinNumber("")
    }
    
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="panNumber"
          value={panNumber}
          placeholder='PAN Number'
          onChange={(e)=>setPanNumber(e.target.value)}
        />
        <input
          type="text"
          name="gstinNumber"
          value={gstinNumber}
          placeholder='GSTIN Number'
          onChange={(e)=>setGstinNumber(e.target.value)}
        />
      <button type="submit">{loading?"Loading...":"Submit PAN/GSTIN "} </button>
    </form>
    </div>
  );
}

export default PanGstinForm;
