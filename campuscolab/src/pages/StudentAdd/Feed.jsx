import { useEffect, useState } from "react";
import "./Feed.css";

const Feed = () => {
  const [feedData, setFeedData] = useState({ courses: [], events: [] });
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found. Please log in.");
          return;
        }

        const response = await fetch("https://campuscolab.onrender.com/api/feed/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch feed data");

        const data = await response.json();
        setFeedData(data);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      }
    };

    fetchFeedData();
  }, []);

  return (
    <div className="feed-container">
      <nav className="navbar">
        <h2 className="logo">Community Buzz</h2>
        <div className="nav-tabs">
          <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>📰 All</button>
          <button className={activeTab === "liked" ? "active" : ""} onClick={() => setActiveTab("liked")}>❤️ Liked</button>
          <button className={activeTab === "saved" ? "active" : ""} onClick={() => setActiveTab("saved")}>🔖 Saved</button>
        </div>
      </nav>

      {/* Display Feed */}
      <div className="feed">
        {feedData.courses.map((course) => (
          <div key={`course-${course.id}`} className="post">
            <h4>📘 Course: {course.name}</h4>
            <p>{course.description}</p>
            <p><b>Start Date:</b> {course.start_date}</p>
            <p><b>Duration:</b> {course.duration} weeks</p>
            <p><b>Type:</b> {course.event_type}</p>
          </div>
        ))}

        {feedData.events.map((event) => (
          <div key={`event-${event.id}`} className="post">
            <h4>🎉 Event: {event.event_name}</h4>
            <p>{event.description}</p>
            <p><b>Date:</b> {event.date} | <b>Time:</b> {event.time}</p>
            <p><b>Venue:</b> {event.venue}</p>
            <p><b>Type:</b> {event.event_type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
