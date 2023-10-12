import axios from 'axios';
import React, {useState } from 'react'
import "./styles.css"
import { useNavigate } from 'react-router-dom';


const Login = ({route,profile,url}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    console.log(route)
    

    const handleSignin = async(e) => {
        e.preventDefault()
        if(!email || !password){
          alert("Please fill all fields")
          return
        }
        setLoading(true)
        let response = await axios.post(`http://localhost:4500/${route}`,{email,password})
        response = await response.data
        if(response.id){
          localStorage.setItem(`${profile} id`,response.id)
        }
        alert(response.message)
        setLoading(false)
        setEmail("")
        setPassword("")
        if(response.message==="Successfully login"){
          if(profile==="Business"){
            navigate("/businessprofile")
          }else if(profile==="Sales"){
            navigate("/salesprofile")
          }else if(profile==="Shop"){
            navigate("/shopprofile")
          }
        }
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