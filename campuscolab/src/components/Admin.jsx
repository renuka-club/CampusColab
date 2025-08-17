import { useContext, useState } from 'react';
import { RiLockPasswordFill } from "react-icons/ri";

import Button from '@mui/material/Button';
import { FaUserShield } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

const Admin = () => {
    const navigate=useNavigate();
    const context = useContext(MyContext);

    const [formData, setFormData] = useState({
      username: "",
      password: ""
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClick= async()=>{

      const endpoint="https://campuscolab.onrender.com/api/adminloginview";
      const payload={
        username:formData.username,
        password:formData.password
      }
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include" 
        });
      const data = await response.json();
      if (response.ok) {
        context.setIsAuthenticated(true);
            if (data.username) {
              localStorage.setItem("username", data.username);
          }
          if (data.access) {
              sessionStorage.setItem("accessToken", data.access
                
              );
              console.log(data.access)
            
          } else {
              console.warn("No access token received.");
          } 
          alert("Login Succesfull!"+data.username,data.access);
          navigate('/admin-view' ,{ state: { role: "Admin" } })
          } else{
            alert(data.message || "Invalid Credentials");
          }
      }catch (error) {
        console.error("Error:", error);
      }
       
    }
  return (
    <div>
        <div className='contain' style={{width:'400px',height:'300px'}}>
         
         <div className='name'>
          <h1>Admin</h1>
         </div>
          <div className="input">
          <div className='img'><FaUserShield />
          </div>
            <input type="text" name="username" placeholder="Admin Name" value={formData.username} onChange={handleChange} />
          </div>

          <div className="input">
          <div className='img'><RiLockPasswordFill />
          </div>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
            
          </div>
          <Button variant="contained" onClick={handleClick}>Login</Button>
         
        </div>
    </div>
  )
}

export default Admin
