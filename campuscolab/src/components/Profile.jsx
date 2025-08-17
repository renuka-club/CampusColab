import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userDetails }) => {
  const { name, role } = userDetails;
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  const handleLogout = () => {
    if (sessionStorage.getItem('accessToken')) {
      sessionStorage.removeItem('accessToken');
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found. Please log in.");
          return;
        }

        const response = await fetch("https://campuscolab.onrender.com/api/profileview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ role, name }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch Profile");
        setProfileData(data.data);
      } catch (error) {
        console.error("Error fetching Profile:", error);
      }
    };

    fetchProfile();
  }, [role, name]);

  return (
    <div>
      <Box sx={{ minWidth: 275 }} style={{ marginTop: "100px" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Account Information of {role}
            </Typography>
            {profileData ? (
              Object.entries(profileData).map(([key, value]) => (
                <Typography key={key} sx={{ mb: 1 }}>
                  <strong>{key}:</strong> {value !== null ? value.toString() : "N/A"}
                </Typography>
              ))
            ) : (
              <Typography>Loading...</Typography>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" style={{ color: "red" }} onClick={handleLogout}>LogOut</Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default Profile;
