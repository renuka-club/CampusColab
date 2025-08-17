import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

const TeacherForm = () => {
  // State for a single teacher


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

  const [teachers, setTeachers] = useState([]);

  const [teacher, setTeacher] = useState({
    name: '',
    branch: '',
    phonenumber: '',
    address: '',
    password: '',
  });

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

  const handleChange = (field, value) => {
    setTeacher({
      ...teacher,
      [field]: value,
    });
  };

  
  const handleSubmit = async (e) => {
    if (!window.confirm("Are you sure you want to add this teacher?")) {
      return;
    }
    e.preventDefault();

    const endpoint = "https://campuscolab.onrender.com/api/teachercreate";
    
    const payload = {
      teachername: teacher.name,
      branch: teacher.branch,
      phonenumber: teacher.phonenumber,
      address: teacher.address,
      password: teacher.password,
    };

    try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, 
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Teacher added successfully:");
      
      setTeacher({
        name: '',
        branch: 'CSE',
        phonenumber: '',
        address: '',
        password: '',
      });
    } else {
      console.error("Error adding teacher:", result);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className="container-fluid mt-5 px-lg-5">
      <h2 className="text-center text-primary">
        Add New <span className="invoice_type">Teacher</span>
      </h2>
      <hr />

      <div id="response" className="alert alert-success d-none">
        <button className="btn-close" data-bs-dismiss="alert"></button>
        <div className="message"></div>
      </div>

      <form id="Add-Teacher" onSubmit={handleSubmit}>
        <input type="hidden" name="action" value="Add-Teacher" />

        {/* Teacher Form Fields */}
        <div className="table-responsive mt-4">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>Teacher name</th>
                <th>Branch</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={teacher.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Teacher Name"
                  />
                </td>
                <td>
                  <FormControl fullWidth>
                    <InputLabel></InputLabel>
                    <Select
                      value={teacher.branch}
                      onChange={(e) => handleChange('branch', e.target.value)}
                    >
                      <MenuItem value="CSE">CSE</MenuItem>
                      <MenuItem value="ECE">ECE</MenuItem>
                      <MenuItem value="IT">IT</MenuItem>
                      <MenuItem value="CSM">CSM</MenuItem>
                      <MenuItem value="MECH">MECH</MenuItem>
                      <MenuItem value="CIVL">CIVL</MenuItem>
                      <MenuItem value="MRB">MRB</MenuItem>
                      <MenuItem value="EEE">EEE</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={teacher.phonenumber}
                    onChange={(e) => handleChange('phonenumber', e.target.value)}
                    placeholder="+91..."
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={teacher.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="address"
                  />
                </td>
                <td>
                  <input
                    type="password"
                    className="form-control"
                    value={teacher.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="password"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-end mt-4">
          <button type="submit" className="btn-success px-4">
            Add Teacher
          </button>
        </div>
      </form>
      <h2 className="text-center text-primary">
        Added  <span className="invoice_type">Teachers</span>
      </h2>
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Branch</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((teachers) => (
            <StyledTableRow
              key={teachers.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {teachers.teachername}
              </StyledTableCell>
              <StyledTableCell align="right">{teachers.branch}</StyledTableCell>
              <StyledTableCell align="right">{teachers.address}</StyledTableCell>
              <StyledTableCell align="right">{teachers.phonenumber}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
};

export default TeacherForm;