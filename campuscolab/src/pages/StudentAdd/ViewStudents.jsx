import { useEffect, useState } from 'react';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found. Please log in.");
        return;
      }
      const response = await fetch("https://campuscolab.onrender.com/api/studentview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Fetched Data:", data);
  
      if (!response.ok) throw new Error("Failed to fetch students");
      setStudents(data.data);
    } catch (error) {
      console.error("Error fetching Students:", error);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedStudent) return;
  
    try {
      const response = await fetch(`https://campuscolab.onrender.com/api/studentdelete/${selectedStudent}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
        },
      });
  
      if (!response.ok) throw new Error("Failed to delete Student");
  
      // Refresh Student list after deletion
      setStudents(prevStudents => prevStudents.filter(student => student.studentname !== selectedStudent));
      
      // Reset selectedStudent after deletion
      setSelectedStudent(null);
    } catch (error) {
      console.error("Error deleting Student:", error);
    }
  };
  

  return (
    <div className="container-fluid mt-4">
      <hr />

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Manage Students</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Student Name</th>
                  <th>Subject</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                   <td>{student.studentname}</td>  
                    <td>{student.branch}</td>       
                    <td>{student.address|| "N/A"}</td> 
                    <td>{student.phonenumber}</td>  
                    
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteStudentModal"
                        onClick={() => setSelectedStudent(student.studentname)}
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
      <div id="deleteStudentModal" className="modal fade" tabIndex="-1" aria-hidden="true" style={{ marginTop: '100px' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Delete Student</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this Student?</p>
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

export default ViewStudents;
