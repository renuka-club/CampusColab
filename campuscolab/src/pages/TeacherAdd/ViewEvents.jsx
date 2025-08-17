import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import imagePlaceholder from '../../Assets/1.jpg';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "https://campuscolab.onrender.com";

  // Improved URL cleaning function
  const cleanMediaUrl = (url) => {
  if (!url) return null;
  
  // If already a complete URL, return as-is
  if (url.startsWith('http')) return url;
  
  // Remove ALL leading slashes
  const cleanPath = url.replace(/^\/+/g, '');
  
  // Check if path already contains media directory
  if (cleanPath.startsWith('media/')) {
    return `${BASE_URL}/${cleanPath}`;
  }
  
  // Default case - add media prefix
  return `${BASE_URL}/media/${cleanPath}`;
};
  

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = sessionStorage.getItem("accessToken");
      const teachername = localStorage.getItem("teachername");

      if (!token) {
        throw new Error("Authentication required - No token found");
      }
      if (!teachername) {
        throw new Error("Teacher name not found in local storage");
      }

      const response = await fetch(
        `${BASE_URL}/api/add-event?teachername=${encodeURIComponent(teachername)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch events: ${response.status}`);
      }

      const data = await response.json();
      
      // Enhanced event formatting with better error handling for attachments
      const formattedEvents = data.map((event) => {
        let attachmentUrl = imagePlaceholder;
        try {
          if (event.attachment) {
            attachmentUrl = cleanMediaUrl(event.attachment);
          }
        } catch (error) {
          console.error("Error processing attachment URL:", error);
        }

        return {
          id: event.id,
          title: event.event_name || "Untitled Event",
          description: event.description || "No description available",
          attachment: attachmentUrl,
          date: event.date || "Date not specified",
          postedBy: event.organizer || "Unknown organizer",
          venue: event.venue || "Venue not specified",
          time: event.time || "Time not specified",
          eventType: event.event_type || "General",
        };
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId, eventTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      return;
    }
  
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication required");
      }
  
      const response = await fetch(`${BASE_URL}/api/delete-event/${eventId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        alert("Event deleted successfully!");
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert(error.message || "Failed to delete event");
    }
  };

  useEffect(() => {
    fetchEvents();
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
        <strong>Error loading events:</strong> {error}
        <button 
          className="btn btn-primary ms-3"
          onClick={fetchEvents}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📢 Events and Hackathons</h2>
      
      {events.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {events.map((event) => (
            <div className="col" key={event.id}>
              <div 
                className="card h-100 shadow-lg" 
                style={{ 
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"} 
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <img 
                  src={event.attachment} 
                  className="card-img-top"
                  alt={event.title}
                  style={{ 
                    height: "200px", 
                    objectFit: "cover",
                    backgroundColor: "#f8f9fa" // Fallback background
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = imagePlaceholder;
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text"><strong>Venue:</strong> {event.venue}</p>
                  <p className="text-muted">
                    <i className="bi bi-calendar-check me-2"></i>
                    {event.date} <i className="bi bi-clock ms-2 me-2"></i>
                    {event.time}
                  </p>
                  <p className="text-muted">
                    <i className="bi bi-person-fill me-2"></i>
                    Organizer: {event.postedBy}
                  </p>
                  <p className="text-muted">
                    <strong>Type:</strong> {event.eventType}
                  </p>
                  <p className="card-text mb-3">{event.description}</p>
                  <button 
                    className="btn btn-danger mt-auto"
                    onClick={() => handleDelete(event.id, event.title)}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Delete Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="alert alert-info">
            No events found. Would you like to create one?
          </div>
          <button 
            className="btn btn-primary"
            onClick={fetchEvents}
          >
            Refresh Events
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewEvents;