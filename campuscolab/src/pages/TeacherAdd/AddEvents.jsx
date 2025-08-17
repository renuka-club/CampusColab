import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const AddEvents = () => {
  const teachername=localStorage.getItem("teachername");

  const [formData, setFormData] = useState({
    eventName: "",
    organizer: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    eventType: "Hackathon",
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
  
    const formDataToSend = new FormData();
    formDataToSend.append("teachername", teachername);
    formDataToSend.append("event_name", formData.eventName);
    formDataToSend.append("organizer", formData.organizer);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("venue", formData.venue);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("event_type", formData.eventType);
  
    if (file) {
      formDataToSend.append("attachment", file);
    }
  
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await fetch("https://campuscolab.onrender.com/api/add-event", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
  
      if (response.ok) {
        alert("Event added successfully!");
        setFormData({
          eventName: "",
          organizer: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          venue: "",
          description: "",
          eventType: "Hackathon",
        });
        setFile(null);
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert("Failed to add event. Check console for details.");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while adding the event.");
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{marginTop:'100px'}}>
      <div className="container-md">
        <div className="card shadow-lg p-4" style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 className="text-center fw-bold">Add Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Event Name</label>
              <input type="text" className="form-control" name="eventName" value={formData.eventName} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Organizer Name</label>
              <input type="text" className="form-control" name="organizer" value={formData.organizer} onChange={handleChange} required />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Time</label>
                <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Venue</label>
              <input type="text" className="form-control" name="venue" value={formData.venue} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Event View</label>
              <select className="form-select" name="eventType" value={formData.eventType} onChange={handleChange}>
                <option>Global</option>
                <option>Local</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Event Type</label>
              <select className="form-select" name="eventType" value={formData.eventType} onChange={handleChange}>
                <option>Hackathon</option>
                <option>Fest</option>
                <option>Seminar</option>
                <option>Workshop</option>
                <option>Webinar</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Poster</label>
              <input type="file" className="form-control" name="fileinput" onChange={handleFileChange} />
            </div>

            <button type="submit" className="btn btn-success w-100">Submit Event</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvents;