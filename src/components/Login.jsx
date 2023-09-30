import axios from 'axios';
import React, { useState } from 'react'
import "./styles.css"

const Login = ({route}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = async(e) => {
        e.preventDefault()
        if(!email || !password){
          alert("Please fill all fields")
          return
        }
        let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/${route}`,{email,password})
        response = await response.data.message
        alert(response)
        if(response ==="Succesfully login"){
            setEmail("")
            setPassword("")
        }
      };
  return (
    <div className="container" >
      <form>
        <div>
          <label>Email Id:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        <button onClick={handleSignin}>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default Login