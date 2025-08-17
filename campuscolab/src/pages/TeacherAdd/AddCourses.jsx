import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const AddCourses = () => {

  const teachername = localStorage.getItem("teachername");

  const [formData, setFormData] = useState({
    courseName: "",
    instructor: "",
    duration: "",
    description: "",
    startDate: "",
    eventType: "Global",
  });

  const [file, setFile] = useState(null);

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
   e.preventDefault();

    if (!teachername) {
      alert("Teacher not logged in. Please log in again.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("teachername", teachername);
    formDataToSend.append("name", formData.courseName);
    formDataToSend.append("instructor", formData.instructor);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("start_date", formData.startDate);
    formDataToSend.append("event_type", formData.eventType);
    if (file) {
      formDataToSend.append("attachment", file);
    }

    try {
      const token = sessionStorage.getItem("accessToken"); // Fetch auth token if required
      const response = await fetch("https://campuscolab.onrender.com/api/add-course", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure authentication
        },
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Course added successfully!");
        setFormData({
          courseName: "",
          instructor: "",
          duration: "",
          description: "",
          startDate: "",
          eventType: "Global",
        });
        setFile(null);
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert("Failed to add course. Check console for details.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred while adding the course.");
    }
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "40px" }}>
      <div className="container-md">
        <div className="card shadow-lg p-4" style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 className="text-center fw-bold">Add Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Course Name</label>
              <input type="text" className="form-control" name="courseName" value={formData.courseName} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Instructor Name</label>
              <input type="text" className="form-control" name="instructor" value={formData.instructor} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Duration (Weeks)</label>
              <input type="number" className="form-control" name="duration" value={formData.duration} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Course View</label>
              <select className="form-select" name="eventType" value={formData.eventType} onChange={handleChange}>
                <option>Global</option>
                <option>Local</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
            </div>

            {/* Upload Attachment */}
            <div className="mb-3">
              <label className="form-label">Upload Attachment</label>
              <input type="file" className="form-control" name="fileInput" onChange={handleFileChange} />
              {file && <small className="text-muted">Selected File: {file.name}</small>}
            </div>

            <button type="submit" className="btn btn-success w-100">Submit Course</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourses;