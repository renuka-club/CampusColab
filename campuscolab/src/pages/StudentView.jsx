import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, } from "react-router-dom";
import Feed from "./StudentAdd/Feed";
import Profile from "./StudentAdd/Profile";

const StudentView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [clickedEvent,setClickedEvent]=useState("Feed");

 
  const componentMapping={
    Profile:<Profile/>,
    Feed:<Feed/>
   }


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  


  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="text-white p-3 d-flex flex-column"
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          transition: "transform 0.3s ease-in-out",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <h4 className="text-center mb-4">Campus Club</h4>
        <ul className="nav flex-column">
              <li className="nav-item">
          <Link className="nav-link text-white d-flex align-items-center" to="/dashboard" style={{ gap: "10px" }}>
            <i className="bi bi-people-fill me-2"></i> Community
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white d-flex align-items-center" onClick={()=>setClickedEvent("Profile")} style={{ gap: "10px" }}>
            <i className="bi bi-person-circle me-2"></i> Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white d-flex align-items-center" to="/settings" style={{ gap: "10px" }}>
            <i className="bi bi-gear-fill me-2"></i> Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white d-flex align-items-center" onClick={()=>setClickedEvent("Feed")} style={{ gap: "10px" }}>
            <i className="bi bi-rss-fill me-2"></i> Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white d-flex align-items-center" to="/LikedPosts" style={{ gap: "10px" }}>
            <i className="bi bi-heart-fill me-2"></i> Liked Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white d-flex align-items-center" to="/SavedPosts" style={{ gap: "10px" }}>
            <i className="bi bi-bookmark-fill me-2"></i> Saved Posts
          </Link>
        </li>
      </ul>
        
        <button className="btn btn-outline-light mt-auto" >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? "250px" : "0px",
          transition: "margin-left 0.3s ease-in-out",
          width: "100%",
          padding: "20px",
        }}
      >
        <nav className="navbar text-white px-3" style={{ background: "linear-gradient(135deg, #1e3c72, #2a5298)" }}>
          <button className="btn btn-outline-light" onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </button>
          <span className="navbar-brand mx-auto"  style={{color:'white', fontWeight:"200px"}}>Community Buzz</span>
        </nav>

        {/* Profile & Post Section */}
        <div className="container mt-4 d-flex flex-column align-items-center">
        <div className="container mt-4 d-flex flex-column align-items-left">
        {clickedEvent && componentMapping[clickedEvent] }
        </div>
        </div>

       
      </div>
    </div>
  );
};

export default StudentView;
