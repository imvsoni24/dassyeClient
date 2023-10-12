import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EditPanAadhaar = () => {
    const [panNumber, setPanNumber] = useState("")
    const [aadhaarNumber,setAadhaarNumber] = useState("")
    const [loading,setLoading] = useState(false)
    const [panAadhaar,setPanAadhaar] = useState({})

    const getPanAadhaar = async()=>{
          var salesId = localStorage.getItem("Sales id")
            const config = {
                headers: { 'id': salesId },
              };
        let response = await axios.get(`http://localhost:4500/getPanAadhaar`,config)
        response = await response.data
        setPanAadhaar(response.data)
        console.log(response)
      }
      useEffect(()=>{
        getPanAadhaar()
      },[])
      
      useEffect(()=>{
        setPanNumber(panAadhaar?.panNumber || '');
        setAadhaarNumber(panAadhaar?.aadhaarNumber || '');
      },[panAadhaar])

      const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        let response = await axios.patch(`http://localhost:4500/updatePanAadhaar/${panAadhaar?._id}`, {
          panNumber,aadhaarNumber
        });
        setLoading(false)
        alert(response.data.message)
      }

  
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
      <button type="submit">{loading?"Loading...":"Edit Details "} </button>
    </form>
    </div>
  )
}

export default EditPanAadhaar