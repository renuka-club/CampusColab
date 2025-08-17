import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { FaUserShield } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

const Teacher = () => {

    const context = useContext(MyContext);
    const [formData, setFormData] = useState({
        teachername: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleClick = async () => {

        const endpoint = "https://campuscolab.onrender.com/api/teacherlogin";
        const payload = {
            teachername: formData.teachername,
            password: formData.password
        };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include" // Ensure cookies are sent
            });

            const data = await response.json();
            
            if (response.ok) {
                context.setIsAuthenticated(true); // Set authentication state

                // Store the tokens and other details in localStorage/sessionStorage
                if (data.teachername) {
                    localStorage.setItem("teachername", data.teachername);
                }
                if (data.access_token) {
                    sessionStorage.setItem("accessToken", data.access_token);
                    console.log( data.access_token);
                }
                if (data.refresh_token) {
                    sessionStorage.setItem("refreshToken", data.refresh_token);
                }

                alert("Login Successful! Welcome " + data.teachername);
                navigate('/teacher-view', { state: { role: "Teacher" } });
            } else {
                alert(data.message || "Invalid Credentials");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className='contain' style={{ width: '400px', height: '300px' }}>
                <div className='name'>
                    <h1>Teacher</h1>
                </div>
                <div className="input">
                    <div className='img'><FaUserShield /></div>
                    <input
                        type="text"
                        name="teachername"
                        placeholder="Teacher Name"
                        value={formData.teachername}
                        onChange={handleChange}
                    />
                </div>

                <div className="input">
                    <div className='img'><RiLockPasswordFill /></div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <Button variant="contained" onClick={handleClick}>Login</Button>
            </div>
        </div>
    );
}

export default Teacher;
