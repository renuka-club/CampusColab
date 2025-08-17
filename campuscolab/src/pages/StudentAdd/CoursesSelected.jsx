import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import imagePlaceholder from "../../Assets/1.jpg";

const BASE_URL = "https://campuscolab.onrender.com";

const CoursesSelected = () => {
  const [studentCourses, setStudentCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const studentName = localStorage.getItem("studentname");
  const token = sessionStorage.getItem("accessToken");

  const cleanMediaUrl = (url) => {
    if (!url) return null;
    // Remove any duplicate 'media/' segments
    const cleanPath = url.replace(/.*media\//, '');
    return `${BASE_URL}/media/${cleanPath}`;
  };

  const fetchStudentCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!studentName || !token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(`${BASE_URL}/api/student-courses/${studentName}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const formattedCourses = data.map(course => ({
        ...course,
        course_details: {
          ...course.course_details,
          cleanAttachment: course.course_details?.attachment 
            ? cleanMediaUrl(course.course_details.attachment)
            : null
        }
      }));
      setStudentCourses(formattedCourses);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentCourses();
  }, [studentName]);

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
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Enrolled Courses</h2>
      
      {studentCourses.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {studentCourses.map((course, index) => (
            <div key={index} className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={course.course_details?.cleanAttachment || imagePlaceholder}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={course.course_details?.name || "Course"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = imagePlaceholder;
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.course_details?.name || "Untitled Course"}</h5>
                  <p className="card-text flex-grow-1">
                    {course.course_details?.description || "No description available."}
                  </p>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">
                      <i className="bi bi-person me-2"></i>
                      {course.course_details?.instructor || "Instructor not specified"}
                    </li>
                    <li className="list-group-item">
                      <i className="bi bi-calendar me-2"></i>
                      Starts: {course.course_details?.start_date || "TBD"}
                    </li>
                    <li className="list-group-item">
                      <i className="bi bi-clock me-2"></i>
                      Duration: {course.course_details?.duration ? `${course.course_details.duration} weeks` : "Not specified"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="alert alert-info">
            You haven't enrolled in any courses yet.
          </div>
          <button 
            className="btn btn-primary mt-3"
            onClick={fetchStudentCourses}
          >
            Refresh Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesSelected;
