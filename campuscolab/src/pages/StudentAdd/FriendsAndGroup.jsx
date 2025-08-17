import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import homelog from '../../Assets/homelog.jpg';
import home from '../../Assets/homevertical.jpg';

const FriendsAndGroup = () => {
  // Sample data for friends
  const [friends] = useState([
    { id: 1, name: "Alice Johnson", avatar: home, status: "Online" },
    { id: 2, name: "Bob Smith", avatar: home, status: "Offline" },
    { id: 3, name: "Charlie Davis", avatar: home, status: "Online" },
  ]);

  // Sample data for groups
  const [groups] = useState([
    { id: 1, name: "Robotics Club", description: "Join the robotics club to build, program, and compete.", avatar: homelog },
    { id: 2, name: "Debate Society", description: "Debate on current issues and hone your public speaking skills.", avatar: homelog },
    { id: 3, name: "Art Club", description: "Explore your creative side with art workshops and exhibitions.", avatar: homelog },
  ]);

  // State to track active tab: "friends" or "groups"
  const [activeTab, setActiveTab] = useState("friends");

  // CSS styles defined as a JS object
  const styles = {
    container: {
      marginTop: "40px",
      maxWidth: "1000px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    card: {
      width:"1000px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "none",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    },
    header: {
      backgroundColor: "transparent",
      borderBottom: "none",
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    },
    tabButton: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "20px",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.3s, color 0.3s",
      cursor: "pointer",
    },
    activeTabButton: {
      backgroundColor: "#007bff",
      color: "#fff",
    },
    inactiveTabButton: {
      backgroundColor: "transparent",
      color: "#007bff",
      border: "2px solid #007bff",
    },
    listItem: {
      backgroundColor: "transparent",
      border: "none",
      padding: "15px",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      borderBottom: "1px solid #f0f0f0",
    },
    avatar: {
      borderRadius: "50%",
      width: "50px",
      height: "50px",
    },
    listGroup: {
      padding: "0",
      margin: "0",
    },
  };

  return (
    <div className="container" style={styles.container }>
      <div style={styles.card} className="card">
        {/* Tab Heading */}
        <div style={styles.header}>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "friends" ? styles.activeTabButton : styles.inactiveTabButton),
            }}
            onClick={() => setActiveTab("friends")}
          >
            Friends
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "groups" ? styles.activeTabButton : styles.inactiveTabButton),
            }}
            onClick={() => setActiveTab("groups")}
          >
            Groups
          </button>
        </div>

        {/* Tab Content */}
        <div className="card-body">
          {activeTab === "friends" ? (
            <ul className="list-group" style={styles.listGroup}>
              {friends.map((friend) => (
                <li key={friend.id} className="list-group-item" style={styles.listItem}>
                  <img src={friend.avatar} alt={friend.name} style={styles.avatar} />
                  <div>
                    <h6 className="mb-0">{friend.name}</h6>
                    <small className={friend.status === "Online" ? "text-success" : "text-muted"}>
                      {friend.status}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="list-group" style={styles.listGroup}>
              {groups.map((group) => (
                <li key={group.id} className="list-group-item" style={styles.listItem}>
                  <img src={group.avatar} alt={group.name} style={styles.avatar} />
                  <div>
                    <h6 className="mb-0">{group.name}</h6>
                    <small className="text-muted">{group.description}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsAndGroup;
