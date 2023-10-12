import { Route, Routes } from 'react-router-dom';
import './App.css';
import BusinessSignup from './components/BusinessSignup';
import SalesSignup from './components/SalesSignup';
import ShopSignup from './components/ShopSignup';
import Navbar from './components/Navbar';
import Login from './components/Login';
import BusinessProfile from './components/BusinessProfile';
import SalesProfile from './components/SalesProfile';
import ShopProfile from './components/ShopProfile';
import PrivateRoute from './components/privateRoute';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<BusinessSignup />} />
        <Route path="/sales" element={<SalesSignup />} />
        <Route path="/shop" element={<ShopSignup />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/businessprofile' element={<PrivateRoute><BusinessProfile/></PrivateRoute>}/>
        <Route path='/salesprofile' element={<PrivateRoute><SalesProfile/></PrivateRoute>}/>
        <Route path='/shopprofile' element={<PrivateRoute><ShopProfile/></PrivateRoute>}/>
      </Routes>

    </div>
  );
}

export default App;
