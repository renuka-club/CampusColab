import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import imagePlaceholder from '../../Assets/1.jpg';

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "https://campuscolab.onrender.com";

    const cleanMediaUrl = (url) => {
    if (!url) return null;
    
    // If URL already contains the base URL, return as-is
    if (url.includes(BASE_URL)) {
      return url;
    }
    
    // Remove any duplicate path segments
    const cleanPath = url.replace(/^\/+/, '').replace(/.*media\//, '');
    return `${BASE_URL}/media/${cleanPath}`;
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = sessionStorage.getItem("accessToken");
      const teachername = localStorage.getItem("teachername");

      if (!token || !teachername) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `${BASE_URL}/api/add-course?teachername=${encodeURIComponent(teachername)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
      }

      const data = await response.json();
      const formattedCourses = data.map((course) => ({
        id: course.id,
        title: course.name,
        description: course.description,
        attachment: course.attachment ? cleanMediaUrl(course.attachment) : imagePlaceholder,
        instructor: course.instructor || "Not specified",
        duration: course.duration ? `${course.duration} weeks` : "N/A",
        startDate: course.start_date || "Not scheduled",
        courseView: course.venue || "Online",
      }));

      setCourses(formattedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleContent = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDelete = async (courseId, courseTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
      return;
    }

    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(`${BASE_URL}/api/delete-course/${courseId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Course deleted successfully!");
        setCourses(courses.filter(course => course.id !== courseId));
      } else {
        throw new Error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5">
        Error loading courses: {error}
        <button 
          className="btn btn-primary ms-3"
          onClick={fetchCourses}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 display-4">Course </h2>

      <div className="d-flex flex-column align-items-center">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div
              className="card mb-4 shadow-lg w-100"
              key={course.id}
              style={{
                maxWidth: "1200px",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.01)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <div
                className="card-header d-flex justify-content-between align-items-center bg-light"
                onClick={() => toggleContent(index)}
                style={{ cursor: "pointer" }}
              >
                <h5 className="mb-0 text-primary fw-bold">{course.title}</h5>
                <span className="text-primary fs-4 fw-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {openIndex === index && (
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Instructor:</strong> {course.instructor}</p>
                      <p><strong>Duration:</strong> {course.duration}</p>
                      <p><strong>Start Date:</strong> {course.startDate}</p>
                      <p><strong>Format:</strong> {course.courseView}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Description:</strong> {course.description}</p>
                      {course.attachment && (
                        <div className="mt-3">
                          <img 
                            src={course.attachment} 
                            className="img-fluid rounded"
                            alt={course.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = imagePlaceholder;
                            }}
                            style={{ 
                              maxHeight: "200px",
                              objectFit: "cover",
                              width: "100%"
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => handleDelete(course.id, course.title)}
                  >
                    Delete Course
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="alert alert-info text-center">
            No courses available. Would you like to create one?
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCourse;