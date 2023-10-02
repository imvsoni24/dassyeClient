import axios from 'axios';
import React, {useState } from 'react'
import "./styles.css"


const Login = ({route,profile,url}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false)
    

    const handleSignin = async(e) => {
        e.preventDefault()
        if(!email || !password){
          alert("Please fill all fields")
          return
        }
        setLoading(true)
        let response = await axios.post(`https://odd-boa-shoe.cyclic.cloud/${route}`,{email,password})
        response = await response.data.message
        alert(response)
        setLoading(false)
        setEmail("")
        setPassword("")
      };

  return (
    <div className="container" >
      <div><h1 className='profile'>{profile} Profile</h1></div>
      <div><img src={url} alt={profile}/></div>
      <form>
        <div>
          <input
            type="email"
            value={email}
            placeholder='Enter Your Email Id'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder='Enter Your Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        <button className='submit' onClick={handleSignin} disabled={email.length===0 || password.length===0} >
          {loading?"Loading...":"Log in"}
        </button>
        <div className='or'>Or</div>
        <button className='submit'>Sign up</button>
      </form>
    </div>
  )
}

export default Login