import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

const SelectCourses = () => {
  const [courses] = useState([
    {
      title: "Artificial Intelligence",
      instructor: "Dr. John Doe",
      duration: "10 Weeks",
      startDate: "2025-03-15",
      courseView: "Global",
      description: "Learn about AI, ML, and their applications in business and research.",
      attachment: "/uploads/ai_course_syllabus.pdf",
    },
    {
      title: "Data Science & Analytics",
      instructor: "Prof. Jane Smith",
      duration: "12 Weeks",
      startDate: "2025-04-01",
      courseView: "Local",
      description: "Covers data wrangling, visualization, and predictive modeling.",
      attachment: "/uploads/data_science_outline.docx",
    },
    {
      title: "Cloud Computing",
      instructor: "Mr. Alan Turing",
      duration: "8 Weeks",
      startDate: "2025-05-10",
      courseView: "Global",
      description: "Explore cloud computing fundamentals and DevOps integration.",
      attachment: "/uploads/cloud_intro.pptx",
    },
  ]);

  const [openIndex, setOpenIndex] = useState(null);
  const [joinedCourses, setJoinedCourses] = useState([]);

  const toggleContent = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleJoinCourse = (course) => {
    if (!joinedCourses.find((c) => c.title === course.title)) {
      setJoinedCourses([...joinedCourses, course]);
      alert(`You have joined the course: ${course.title}`);
    } else {
      alert(`You have already joined ${course.title}`);
    }
  };

  return (
    <div className="container d-block mt-5">
      {/* Main Heading */}
      <div className="text-center mb-4">
        <h2 className="font-weight-bold text-uppercase" style={{ fontSize: "35px", letterSpacing: "1px" }}>
          Course List
        </h2>
      </div>

      {/* Course Boxes */}
      <div className="d-flex flex-column align-items-center">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div
              className="card mb-4 shadow-lg"
              key={index}
              style={{ width: "95%", maxWidth: "1200px", borderRadius: "12px" }}
            >
              <div
                className="card-header d-flex justify-content-between align-items-center"
                onClick={() => toggleContent(index)}
                style={{ cursor: "pointer", backgroundColor: "#f8f9fa", padding: "15px 20px" }}
              >
                <h5 className="mb-0 text-primary font-weight-bold">{course.title}</h5>
                <span style={{ color: "#007bff", fontSize: "20px", fontWeight: "bold" }}>
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {openIndex === index && (
                <div className="card-body">
                  <p><strong>Instructor:</strong> {course.instructor}</p>
                  <p><strong>Duration:</strong> {course.duration}</p>
                  <p><strong>Start Date:</strong> {course.startDate}</p>
                  <p><strong>Course View:</strong> {course.courseView}</p>
                  <p><strong>Description:</strong> {course.description}</p>
                  <p>
                    <strong>Attachment:</strong>{" "}
                    <a href={course.attachment} target="_blank" rel="noopener noreferrer" className="text-primary font-weight-bold">
                      {course.attachment.split("/").pop()} 📄
                    </a>
                  </p>
                  <button className="btn btn-outline-primary mt-2" onClick={() => handleJoinCourse(course)}>
                    Join
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-danger">No courses available.</p>
        )}
      </div>

      {/* Joined Courses Section */}
      {joinedCourses.length > 0 && (
        <div className="mt-5">
          <h3 className="text-success font-weight-bold">Joined Courses</h3>
          <ul className="list-group mt-3">
            {joinedCourses.map((course, index) => (
              <li key={index} className="list-group-item">
                <strong>{course.title}</strong> - {course.instructor} ({course.duration})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectCourses;
