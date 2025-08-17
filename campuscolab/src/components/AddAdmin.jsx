import Button from '@mui/material/Button';
import { useContext, useEffect, useRef, useState } from 'react';
import { CiBarcode } from "react-icons/ci";
import { FaBuilding, FaUserShield } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import { MyContext } from '../App';


const AddAdmin = () => {
  const [collageName, setcollageName] = useState("");
  const [colleges, setColleges] = useState([]);
  const [allData, setAllData] = useState({ AP: [], TS: [] });
  const [selectedState, setSelectedState] = useState("AP");
  const [showDropdown, setShowDropdown] = useState(false);
  const context = useContext(MyContext);

  

  // State to store form data
  const [formData, setFormData] = useState({
    adminname: "",
    password: "",
    collageName: "",
    collagecode: "",
  });
  
  // State for error messages
  const [errorMessage, setErrorMessage] = useState("");

  const dropdownRef = useRef(null);  // Reference for dropdown box

  useEffect(() => {
    fetch("/indian_college_list.json")
      .then(response => response.json())
      .then(data => {
        setAllData({ AP: data.AP || [], TS: data.TS || [] });
        setColleges(data.AP || []);
      })
      .catch(error => console.error("Error loading data:", error));
  }, []);

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setColleges(allData[state]);
    setcollageName("");
    setShowDropdown(false); // Hide dropdown when state changes
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (e.target.name === "collageName") {
      setcollageName(e.target.value);
      setShowDropdown(true);
    }
  };

  const handleCollegeClick = (collegeName) => {
    setcollageName(collegeName);
    setFormData((prev) => ({ ...prev, collageName: collegeName }));
    setShowDropdown(false);
  };


  const handleClick = async () => {
    if (!window.confirm("Are you sure you want to add this admin?")) {
      return;
    }
  
    const endpoint = "https://campuscolab.onrender.com/api/adminlogin";
    const payload = {
      username: formData.adminname,
      password: formData.password,
      collagename: formData.collageName,
      collagecode: formData.collagecode,
    };
  
    console.log("Payload:", payload);
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Error response:", data);
        setErrorMessage(data.message || "Invalid Credentials");
        return;
      }
  
      // Clear previous errors if successful
      setErrorMessage("");

    
      // Prevent multiple calls to setIsAuthenticated
      if (!context.isAuthenticated) {
        context.setIsAuthenticated(true);
      }
  
      if (data.username) {
        localStorage.setItem("username", data.username);
        console.log("Username stored:", localStorage.getItem("username"));
      }
  
      window.alert("Successfully Registered " + data.username);
      
  
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const filteredColleges = colleges.filter((college) =>
    college?.toLowerCase().includes(collageName?.toLowerCase())
  );

  return (
    <div>
      <div className='contain' style={{ width: '600px', height: '550px' }}>
        <div className='name'>
          <h1> Page to Add Admins</h1>
        </div>
        
        {/* Display error message if any */}
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
            {errorMessage}
          </div>
        )}
        
        <div className="input">
          <div className='img'><FaUserShield /></div>
          <input type="text" name="adminname" placeholder="Admin Name" value={formData.adminname} onChange={handleChange} required/>
        </div>

        <div className="input">
          <div className='img'><RiLockPasswordFill /></div>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
        </div>

        <div className="input">
          <div className='img'><RiLockPasswordFill /></div>
          <select value={selectedState} onChange={handleStateChange} >
            <option value="AP">Andhra Pradesh</option>
            <option value="TS">Telangana</option>
          </select>
        </div>

        <div className="input" ref={dropdownRef}>
          <div className='img'><FaBuilding /></div>
          <input
            type="text"
            name='collageName'
            placeholder="Search college..."
            value={formData.collageName}
            onChange={handleChange}
            onFocus={() => setShowDropdown(true)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid gray",
              borderRadius: "5px",
            }}
          />

          {/* Scrollable dropdown list below the input */}
          {showDropdown && filteredColleges.length > 0 && (
            <ul
              style={{
                position: "absolute",
                marginTop:"90%",
                background: "#fff",
                border: "1px solid transparent",
                borderRadius: "5px",
                maxHeight: "300px",
                overflowY: "auto",
                width: "100%",
                padding: "10px",
                listStyleType: "none",
                zIndex: 1000,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
              }}
            >
              {filteredColleges.map((college, index) => (
                <li
                  key={index}
                  onClick={() => handleCollegeClick(college)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid transparent",
                    fontSize: "16px",
                  }}
                >
                  {college}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="input">
          <div className='img'><CiBarcode /></div>
          <input type="text" name="collagecode" placeholder="College Code" value={formData.collagecode} onChange={handleChange} required/>
        </div>

        <Button variant="contained" onClick={handleClick}>Register</Button>
      </div>
    </div>
  );
}

export default AddAdmin;
