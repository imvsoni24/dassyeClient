import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function AddressForm() {
  const [street,setStreet] = useState("")
  const [city,setCity] = useState("")
  const [state,setState] = useState("")
  const [postal,setPostal] = useState("")
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
    
    
    
    if(!street || !city || !state || !postal){
        alert("Please fill all the field")
        return
    }
    setLoading(true)
    let response = await axios.post("http://localhost:4500/saveaddress",{street,city,state,postal,id: businessId || salesId || shopId }
    )

    response = await response.data.message
    setLoading(false)
    alert(response)
    if(response==="Address has been added"){
        setStreet("")
        setCity("")
        setState("")
        setPostal("")
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="streetAddress"
          value={street}
          placeholder='Street Address'
          onChange={(e)=>setStreet(e.target.value)}
          required
        />
        <input
          type="text"
          name="city"
          value={city}
          placeholder='City'
          onChange={(e)=>setCity(e.target.value)}
          required
        />
        <input
          type="text"
          name="state"
          value={state}
          placeholder='State'
          onChange={(e)=>setState(e.target.value)}
          required
        />
        <input
          type="text"
          name="postalCode"
          value={postal}
          placeholder='Postal Code'
          onChange={(e)=>setPostal(e.target.value)}
          required
        />
      <button type="submit">{loading?"Loading...":"Submit Address"}</button>
    </form>
    </div>
  );
}

export default AddressForm;
