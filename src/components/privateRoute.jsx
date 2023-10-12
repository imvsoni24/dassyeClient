import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const location = useLocation()
    let Id;
    if(location.pathname==="/businessprofile"){
        Id = localStorage.getItem("Business id");
      }else if(location.pathname==="/salesprofile"){
        Id = localStorage.getItem("Sales id")
      }else if(location.pathname==="/shopprofile"){
        Id = localStorage.getItem("Shop id");
      }

      if (location.pathname === '/businessprofile' && !Id) {
        alert("You are not logged in")
        return <Navigate to="/" />;
      } else if (location.pathname === '/salesprofile' && !Id) {
        alert("You are not logged in")
        return <Navigate to="/sales" />;
      } else if (location.pathname === '/shopprofile' && !Id) {
        alert("You are not logged in")
        return <Navigate to="/shop" />;
      }
  
  if(Id){
    return children
  }
}

export default PrivateRoute