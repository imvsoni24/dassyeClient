import { Route, Routes } from 'react-router-dom';
import './App.css';
import BusinessSignup from './components/BusinessSignup';
import SalesSignup from './components/SalesSignup';
import ShopSignup from './components/ShopSignup';
import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<BusinessSignup />} />
        <Route path="/sales" element={<SalesSignup />} />
        <Route path="/shop" element={<ShopSignup />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>

    </div>
  );
}

export default App;
