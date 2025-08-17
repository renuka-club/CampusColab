import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { default as profilePic } from "../../Assets/home.jpg";
import "./Profile.css";

const Profile = () => {
  const studentname = localStorage.getItem("studentname");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found. Please log in.");
          return;
        }

        const response = await fetch("https://campuscolab.onrender.com/api/studentprofile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ studentname }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch Profile");
        
        setProfileData(data.data);  
      } catch (error) {
        console.error("Error fetching Profile:", error);
      }
    };

    fetchProfile();
  }, [studentname]);

  return (
    <div className="profile-container">
      <div className="profile-section">
        <img src={profilePic} alt="Profile" className="profile-image" />
        <div className="profile-details">
          {profileData ? (
            <>
              <h4>{profileData.studentname}</h4>
              <p><strong>Roll No:</strong> {profileData.rollno}</p>
              <p><strong>Branch:</strong> {profileData.branch}</p>
              <p><strong>Phone:</strong> {profileData.phonenumber}</p>
              <p><strong>College:</strong> {profileData.collagename || "Unknown College"}</p>
              <p><strong>College Code:</strong> {profileData.collagecode || "N/A"}</p>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>
      <button onClick={handleLogout} className="logout-btn" style={{color:"red"}}> Logout</button>
    </div>
  );
};

export default Profile;
