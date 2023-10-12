import axios from 'axios'
import React, { useState } from 'react'

const PanAadhaarForm = () => {
    const [panNumber, setPanNumber] = useState("")
  const [aadhaarNumber,setAadhaarNumber] = useState("")
  const [loading,setLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
      var salesId = localStorage.getItem("Sales id")
    if(!panNumber || !aadhaarNumber){
        alert("Please add all details")
        return
    }
    setLoading(true)
    let response = await axios.post("http://localhost:4500/savePanAadhaar",
    {panNumber,aadhaarNumber,id: salesId}
    )

    response = await response.data.message
    setLoading(false)
    alert(response)
    if(response==="Details has been added"){
        setPanNumber("")
        setAadhaarNumber("")
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
          value={aadhaarNumber}
          placeholder='Aadhaar Number'
          onChange={(e)=>setAadhaarNumber(e.target.value)}
        />
      <button type="submit">{loading?"Loading...":"Submit Details "} </button>
    </form>
    </div>
  )
}

export default PanAadhaarForm