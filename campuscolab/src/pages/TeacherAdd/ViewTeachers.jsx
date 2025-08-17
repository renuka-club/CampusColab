import { useEffect, useState } from 'react';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found. Please log in.");
      return;
    }
  
    try {
      const response = await fetch("https://campuscolab.onrender.com/api/teacherview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Fetched Data:", data);
  
      if (!response.ok) throw new Error("Failed to fetch teachers");
      setTeachers(data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedTeacher) return;
  
    try {
      const response = await fetch(`https://campuscolab.onrender.com/api/teacherdelete/${selectedTeacher}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
        },
      });
  
      if (!response.ok) throw new Error("Failed to delete teacher");
  
      // Refresh teacher list after deletion
      setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.teachername !== selectedTeacher));
      
      // Reset selectedTeacher after deletion
      setSelectedTeacher(null);
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };
  

  return (
    <div className="container-fluid mt-4">
      <hr />

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Manage Teachers</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Teacher Name</th>
                  <th>Subject</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                   <td>{teacher.teachername}</td>  
                    <td>{teacher.branch}</td>       
                    <td>{teacher.address|| "N/A"}</td> 
                    <td>{teacher.phonenumber}</td>  
                    
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteTeacherModal"
                        onClick={() => setSelectedTeacher(teacher.teachername)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div id="deleteTeacherModal" className="modal fade" tabIndex="-1" aria-hidden="true" style={{ marginTop: '100px' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Delete Teacher</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this teacher?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>
                Delete
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeachers;