import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const ViewCoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const BASE_URL = "https://campuscolab.onrender.com";
  const imagePlaceholder = "/default-image.jpg"; // Define a default image

  const toggleContent = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

   const cleanMediaUrl = (url) => {
    if (!url) return null;
    // Remove any duplicate 'media/' segments and ensure proper URL format
    const cleanPath = url.replace(/.*media\//, '');
    return `${BASE_URL}/media/${cleanPath}`;
  };
  const fetchCourses = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const teachername = localStorage.getItem("teachername");

      if (!token) {
        console.error("No access token found. Please log in.");
        return;
      }
      if (!teachername) {
        console.error("No teacher name found. Please log in as a teacher.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/add-course?teachername=${encodeURIComponent(teachername)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Fetched Data:", data);

      if (!response.ok) throw new Error("Failed to fetch courses");

      const fetchedCourses = data.map((course) => ({
        id: course.id,
        title: course.name,
        description: course.description,
        attachment: course.attachment ? cleanMediaUrl(course.attachment) : imagePlaceholder,
        instructor: course.instructor, 
        duration: course.duration || "N/A", 
        startDate: course.start_date || "N/A",
        courseView: course.venue || "Online",
      }));

      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAdd = async (courseName) => {
    const studentName = localStorage.getItem("studentname");
    const token = sessionStorage.getItem("accessToken");
    if (!studentName) {
      alert("No student name found. Please log in.");
      return;
    }
  
    if (!window.confirm(`Are you sure you want to add the course ${courseName}?`)) {
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/api/student-courses/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          student_name: studentName,
          course_name: courseName,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Course added successfully!");
      } else {
        alert(result.message || "Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  
  return (
    <div className="container d-block mt-5">
      <div className="text-center mb-4">
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "35px",
            color: "black",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Course List
        </h2>
      </div>

      <div className="d-flex flex-column align-items-center">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div
              className="card mb-4 shadow-lg"
              key={course.id}
              style={{
                width: "95%",
                maxWidth: "1200px",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "0.3s ease-in-out",
              }}
            >
              <div
                className="card-header d-flex justify-content-between align-items-center"
                onClick={() => toggleContent(index)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#f8f9fa",
                  padding: "15px 20px",
                }}
              >
                <h5 className="mb-0" style={{ color: "#007bff", fontWeight: "bold" }}>
                  {course.title}
                </h5>
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
                  {course.attachment && (
                    <p  style={{display:"flex",flexDirection:"column"}}>
                      <strong>Attachment:</strong>{" "}
                      <img 
                        src={course.attachment} 
                        className="card-img-top" 
                        alt={course.title} 
                        style={{ height: "200px", maxWidth:"400px",objectFit: "cover", width: "100%" }} 
                      />
                    </p>
                  )}
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => handleAdd(course.title)}
                  >
                    Add Course
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-danger">No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewCoursesList;
