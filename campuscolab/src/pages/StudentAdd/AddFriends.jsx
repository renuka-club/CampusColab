import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import homelog from '../../Assets/homelog.jpg';
import home from '../../Assets/homevertical.jpg';

const AddFriends = () => {
  const [courses] = useState([
    {
      title: "GITAM",
      friends: [
        {
          name: "Alice Johnson",
          mutualFriends: 5,
          location: "New York, USA",
          bio: "Love AI and machine learning.",
          profilePicture: home,
        },
        {
          name: "David Miller",
          mutualFriends: 4,
          location: "San Francisco, USA",
          bio: "AI researcher and enthusiast.",
          profilePicture: homelog,
        },
      ],
    },
    {
      title: "GVP",
      friends: [
        {
          name: "Bob Smith",
          mutualFriends: 8,
          location: "Los Angeles, USA",
          bio: "Software engineer and data scientist.",
          profilePicture: home,
        },
        {
          name: "Eve Adams",
          mutualFriends: 2,
          location: "Boston, USA",
          bio: "Data analyst and visualization expert.",
          profilePicture: home,
        },
      ],
    },
    {
      title: "Mvgr",
      friends: [
        {
          name: "Charlie Brown",
          mutualFriends: 3,
          location: "Chicago, USA",
          bio: "Passionate about cloud technology.",
          profilePicture: homelog,
        },
        {
          name: "Frank Wilson",
          mutualFriends: 6,
          location: "Seattle, USA",
          bio: "Cloud architect and DevOps engineer.",
          profilePicture: homelog,
        },
      ],
    },
  ]);

  const [requestedFriends, setRequestedFriends] = useState([]);
  const [openCourse, setOpenCourse] = useState(null);

  const toggleCourse = (index) => {
    setOpenCourse(openCourse === index ? null : index);
  };

  const handleAddFriend = (friend) => {
    if (!requestedFriends.find((f) => f.name === friend.name)) {
      setRequestedFriends([...requestedFriends, friend]);
      alert(`Friend request sent to: ${friend.name}`);
    } else {
      alert(`Request already sent to ${friend.name}`);
    }
  };

  return (
    <div className="container d-block mt-5">
      {/* Main Heading */}
      <div className="text-center mb-4">
        <h2 className="font-weight-bold " style={{ fontSize: "25px", letterSpacing: "0.5px" }}>
          Friends suggestions based on collages
        </h2>
      </div>

      {/* Course-based Friend List */}
      <div className="d-flex flex-column align-items-center">
        {courses.map((course, index) => (
          <div key={index} className="mb-4" style={{ width: "95%", maxWidth: "600px" }}>
            <div
              className="d-flex justify-content-between align-items-center bg-light p-3 rounded"
              onClick={() => toggleCourse(index)}
              style={{ cursor: "pointer" }}
            >
              <h4 className="text-primary font-weight-bold mb-0">{course.title}</h4>
              <span style={{ fontSize: "20px", fontWeight: "bold", color: "#007bff" }}>
                {openCourse === index ? "−" : "+"}
              </span>
            </div>
            {openCourse === index && (
              <div className="mt-3">
                {course.friends.length > 0 ? (
                  course.friends.map((friend, idx) => (
                    <div className="card mb-3 shadow-lg" key={idx} style={{ borderRadius: "12px" }}>
                      <div className="card-body d-flex align-items-center">
                        <img
                          src={friend.profilePicture}
                          alt={friend.name}
                          className="rounded-circle mr-3"
                          style={{ width: "60px", height: "60px" }}
                        />
                        <div className="flex-grow-1">
                          <h5 className="mb-1 text-primary font-weight-bold">{friend.name}</h5>
                          <p className="mb-1">{friend.mutualFriends} Mutual Friends</p>
                          <p className="mb-1 text-muted">{friend.location}</p>
                          <p className="text-muted">{friend.bio}</p>
                        </div>
                        <button
                          className="btn btn-outline-primary ml-2"
                          onClick={() => handleAddFriend(friend)}
                        >
                          Add Request
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-danger">No friends available for this course.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sent Friend Requests */}
      {requestedFriends.length > 0 && (
        <div className="mt-5">
          <h3 className="text-success font-weight-bold">Sent Friend Requests</h3>
          <ul className="list-group mt-3">
            {requestedFriends.map((friend, index) => (
              <li key={index} className="list-group-item">
                <strong>{friend.name}</strong> - Request Sent
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddFriends;