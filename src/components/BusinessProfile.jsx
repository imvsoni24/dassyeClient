import React, { useEffect, useState } from 'react'
import AddressForm from './BusinessForms/AddressForm';
import BankDetailsForm from './BusinessForms/BankDetailsForm';
import PanGstinForm from './BusinessForms/PanGstinForm';
import LicenseForm from './BusinessForms/LicenseForm';
import axios from 'axios';
import EditBusinessProfile from './EditForms/EditBusinessProfile';
import EditPanGstLicenseForm from './EditForms/EditPanGstLicenseForm';
import EditBankAddress from './EditForms/EditBankAddress';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Profile.module.css'

const BusinessProfile = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [board,setBoard] = useState(null)
  const [entrance,setEntrance] = useState(null)
  const [toggle,setToggle] = useState(true)
  const location = useLocation()

  const handleBoard = async(e)=>{
    const selectedFile = e.target.files[0]
    if(location.pathname==="/businessprofile"){
      var businessId = localStorage.getItem("Business id");
    }else if(location.pathname==="/salesprofile"){
      var salesId = localStorage.getItem("Sales id")
    }else if(location.pathname==="/shopprofile"){
      var shopId = localStorage.getItem("Shop id");
    }
    const formData = new FormData();
    formData.append('file', selectedFile,selectedFile.name);
    formData.append("id",businessId || salesId || shopId)
    formData.append("type","board")
    await uploadImage(formData);
  }

  const handleEntrance = async(e)=>{
    const selectedFile = e.target.files[0]
    if(location.pathname==="/businessprofile"){
      var businessId = localStorage.getItem("Business id");
    }else if(location.pathname==="/salesprofile"){
      var salesId = localStorage.getItem("Sales id")
    }else if(location.pathname==="/shopprofile"){
      var shopId = localStorage.getItem("Shop id");
    }
    const formData = new FormData();
    formData.append('file', selectedFile,selectedFile.name);
    formData.append("id",businessId || salesId || shopId)
    formData.append("type","entrance")
    await uploadImage(formData);
  }

  const uploadImage = async (formData) => {
    try {
      await axios.post("http://localhost:4500/addImage", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      getImage()
      
    } catch (error) {
      console.error(error);
    }
  }

  const getImage = async()=>{
    if(location.pathname==="/businessprofile"){
      var businessId = localStorage.getItem("Business id");
    }else if(location.pathname==="/salesprofile"){
      var salesId = localStorage.getItem("Sales id")
    }else if(location.pathname==="/shopprofile"){
      var shopId = localStorage.getItem("Shop id");
    }
    const config = {
            headers: { 'id': businessId || salesId || shopId },
    };
    let response = await axios.get(`http://localhost:4500/getImage`,config)
    const imageData = response.data.image;
    if (Array.isArray(imageData)) {
      const boardImages = imageData.filter(item => item.type === "board");
      const entranceImages = imageData.filter(item => item.type === "entrance");
      setBoard(boardImages[boardImages.length-1]?.image);
      setEntrance(entranceImages[entranceImages.length-1]?.image);
    }
  }

  useEffect(()=>{
    getImage()
  },[])

  const Toggle = ()=>{
    setToggle(!toggle)
  }


  const handleButtonClick = (formName) => {
    setActiveForm(formName);
  };

  const imagePath = `http://localhost:4500/public/images`

  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem("Business id")
    navigate("/")
  }


  return (
    <div className={styles.container}>
      <h1>Businesses – Distributor Profile </h1>
      <div className={styles.menuIcons}>
      <div onClick = {Toggle}>
        <img src ={toggle?"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/menu.png":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS15T-J6v2WN-9dPqJ0wF9o_qTEpxL0uEz32f1IDEU&s"} alt="menu"/>
      </div>
      <button onClick={handleLogout}>Logout</button>
      </div>
      {toggle? 
      <div className={styles.content}>
      <div className={styles.imageUploads}>
      <label htmlFor="board-input" className={styles.imageBox}>
        Name Board
        {board && <img width="190px" height="180px" src={`${imagePath}/${board}`} alt="Board" />}
      </label>
      <input
        type="file"
        id="board-input"
        accept="image/*"
        onChange={handleBoard}
        style={{ display: 'none' }}
      />  

      <label htmlFor="entrance-input" className={styles.imageBox}>
        Entrance
        {entrance && <img width="190px" height="180px" src={`${imagePath}/${entrance}`} alt="Entrance" />}
      </label>
      <input
        type="file"
        id="entrance-input"
        accept="image/*"
        onChange={handleEntrance}
        style={{ display: 'none' }}
      />
    </div>
      <div className={styles.buttons}>
        <span>Primary Address ( gst address ) ( mandatory )</span>
        <button  onClick={() => handleButtonClick('address')}>
          <div>
          <img  src="https://static-00.iconduck.com/assets.00/location-position-icon-821x1024-e5pyb5ro.png" alt="" />
          <h3>Tap to add address</h3>
          </div>
          <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Dark_blue_right_arrow.svg/800px-Dark_blue_right_arrow.svg.png" alt="" />
        </button>
        {activeForm === 'address' && <AddressForm />}
        <span>Primary Bank Account (mandatory)</span>
        <button onClick={() => handleButtonClick('bankDetails')}>
        <div>
        <img src="https://static.vecteezy.com/system/resources/previews/013/484/907/original/bank-office-building-is-blue-icon-on-transparent-background-3d-rendering-png.png" alt="" />
        <h3>Tap to add bank details</h3>
        </div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Dark_blue_right_arrow.svg/800px-Dark_blue_right_arrow.svg.png" alt="" />
        </button>
        {activeForm === 'bankDetails' && <BankDetailsForm />}
        <span>Manage PAN & GSTIN (mandatory)</span>
        <button onClick={() => handleButtonClick('panGstin')}>
        <div>
        <img src="https://www.professionalutilities.com/images/17.jpg" alt="" />
        <h3>Add PAN/GSTIN</h3>
        </div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Dark_blue_right_arrow.svg/800px-Dark_blue_right_arrow.svg.png" alt="" />
        </button>
        {activeForm === 'panGstin' && <PanGstinForm />}
        <span>LICENSE (mandatory for certain products )</span>
        <button onClick={() => handleButtonClick('license')}>
        <div>
        <img src="https://cdn.pixabay.com/photo/2017/09/27/21/05/license-icon-2793454_1280.png" alt="" />
        <h3>LICENSE Tap to set ,DRUG,other</h3>
        </div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Dark_blue_right_arrow.svg/800px-Dark_blue_right_arrow.svg.png" alt="" />
        </button>
        {activeForm === 'license' && <LicenseForm />}
      </div>
      </div>
       : 

       <div className={styles.content}>
        <button onClick={() => handleButtonClick('profile')}>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
        <div >
        <p>Your profile</p>
        <p>Modify your profile</p>
        </div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Dark_blue_right_arrow.svg/800px-Dark_blue_right_arrow.svg.png" alt="" />
      </button>
      {activeForm === 'profile' && <EditBusinessProfile />}
      <button  onClick={() => handleButtonClick('Details')}>
        <img  src="https://cdn-icons-png.flaticon.com/512/1933/1933920.png" alt="" />
        <div>
        <p>Business profile</p>
        <p>Modify your business profile ( GST,PAN,FSSAI,other license nos etc )</p>
        </div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Dark_blue_right_arrow.svg/800px-Dark_blue_right_arrow.svg.png" alt="" />
      </button>
      {activeForm === 'Details' && <EditPanGstLicenseForm />}
      <button onClick={() => handleButtonClick('address')}>
      <img  src="https://www.freeiconspng.com/thumbs/account-icon/account-icon-32.png" alt="" />
        <div >
        <p>Account setting</p>
        <p>Address, Bank Account Details, etc</p>
        </div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Dark_blue_right_arrow.svg/800px-Dark_blue_right_arrow.svg.png" alt="" />
        </button>
      {activeForm === 'address' && <EditBankAddress />}
      
       </div>
       }
    </div>
  );
}

export default BusinessProfile