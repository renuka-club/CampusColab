import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { FaUserShield } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';


const Student = () => {



  const context = useContext(MyContext);
  const [formData, setFormData] = useState({
        studentname: "",
        password: ""
      });


 const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
     };
 
 
  const navigate=useNavigate();
 
  const handleClick= async()=>{
 
       const endpoint="https://campuscolab.onrender.com/api/studentlogin";
       const payload={
         studentname:formData.studentname,
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
             if (data.studentname) {
               localStorage.setItem("studentname", data.studentname);
           }
           if (data.access_token) {
            sessionStorage.setItem("accessToken", data.access_token);
           }
           alert("Login Succesfull!"+data.studentname,data.access_token);
           navigate('/student-view' ,{ state: { role: "Student" } })
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
          <h1>Student</h1>
         </div>
          <div className="input">
          <div className='img'><FaUserShield />
          </div>
            <input type="text" name="studentname" placeholder="Student Name" value={formData.studentname} onChange={handleChange} />
          </div>

          <div className="input">
          <div className='img'><RiLockPasswordFill />
          </div>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            
          </div>
          <Button variant="contained" onClick={handleClick}>Login</Button>
         
        </div>
    </div>
  )
}

export default Student
