import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './Login.css';

import { useRef } from 'react';
import SpotlightCard from './SpotlightCard';
import VariableProximity from './VariableProximity';


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const roleCards = [
  {
    id: 1,
    title: 'Admin Panel',
    description: `Admins oversee the entire CampusColab network, managing multiple colleges, institutions, and user roles. 
    They can create and approve new college registrations, monitor student and faculty interactions, manage security settings, 
    and generate reports on platform usage. Admins ensure smooth communication between colleges, enforce platform policies, 
    and provide technical support when needed. They also have access to analytical dashboards that help track engagement, 
    student performance, and institutional collaborations.`,
  },
  {
    id: 2,
    title: 'Teacher Dashboard',
    description: `Teachers play a vital role in CampusColab by creating, managing, and sharing educational resources across 
    multiple institutions. They can post announcements, schedule lectures, assign coursework, and evaluate student submissions. 
    Teachers also have access to discussion forums where they can collaborate with faculty members from other colleges, 
    participate in inter-college academic projects, and share best teaching practices. Additionally, they can conduct 
    virtual classes, mentor students, and analyze performance trends through interactive reports.`,
  },
  {
    id: 3,
    title: 'Student Portal',
    description: `The Student Portal is a dynamic hub where students can connect with peers and faculty across multiple 
    colleges. They can enroll in courses offered by various institutions, join study groups, and participate in inter-college 
    events. The platform enables students to submit assignments, receive feedback, track their progress, 
    and explore collaborative projects.CampusColab, students can engage in cross-college debates, hackathons, 
    and research initiatives, fostering a community of learning beyond their own institution. The portal also features 
    career guidance, internship opportunities, and forums for academic and extracurricular activities.`,
  },
];

const LoginPages = (props) => {
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const contactRef = useRef(null);
  const containerRef = useRef(null);

  const [selectedCard, setSelectedCard] = useState(null);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleScroll = (section) => {
    const sectionRefs = {
      Home: homeRef,
      About: aboutRef,
      Contact: contactRef,
    };

    if (sectionRefs[section] && sectionRefs[section].current) {
      sectionRefs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h4" sx={{ my: 2 }}>Campus Colab</Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleScroll(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  const container = window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();

  const handleAdmin = () => navigate('/login', { state: { role: "Admin" } });
  const handleStudent = () => navigate('/login', { state: { role: "Student" } });
  const handleTeacher = () => navigate('/login', { state: { role: "Teacher" } });

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" position="fixed" sx={{ backgroundColor: "#1976D2" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold", display: { xs: 'none', sm: 'block' } }}
            >
              Campus Colab
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff', fontWeight: "bold" }}onClick={() => handleScroll(item)}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
      
      <div className='main' ref={homeRef} >
        <h1><div
          ref={containerRef}
          style={{position: 'relative' ,cursor:'pointer'}}
          >
            <VariableProximity
              label={'Welcome to Campus Colab'}
              className={'variable-proximity-demo'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff='linear'
            />
      </div>
        <div className='btn'>
            <Button variant="outlined" onClick={() => handleScroll('About')}>View More</Button>
        </div>
        </h1>
    </div>

      {/* Enroll Section */}
      <div className="login-page" style={{ marginTop: '10px' }}>
        <div className="content">
          <h1 style={{ textAlign: "center", fontSize: "3.5em", marginTop: "100px" }}><div
          ref={containerRef}
          style={{position: 'relative' ,cursor:'pointer',fontFamily:'cursive'}}
          >
            <VariableProximity
              label={'Enroll'}
              className={'variable-proximity-demo'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff='linear'
            />
      </div></h1>
        </div>

        {/* Login Boxes Section */}
        <div className="container" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
          <div className="box admin">
            <h2>Admin</h2>
            <p>Access admin panel and manage users.</p>
            <button className="login-btn admin-btn" onClick={handleAdmin}>Login as Admin</button>
          </div>
          <div className="box teacher">
            <h2>Teacher</h2>
            <p>Manage classes, students, and reports.</p>
            <button className="login-btn teacher-btn" onClick={handleTeacher}>Login as Teacher</button>
          </div>
          <div className="box student">
            <h2>Student</h2>
            <p>View courses, assignments, and grades.</p>
            <button className="login-btn student-btn" onClick={handleStudent}>Login as Student</button>
          </div>
        </div>
      </div>

    <div className='about' id="about-section" ref={aboutRef} style={{ padding: '100px 0' }}>
      <div className='box1'>
        <h1> <VariableProximity
              label={'About Campus Colab'}
              className={'variable-proximity-demo'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff='linear'
            /></h1>
              <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#555' }}>Connecting students, teachers, and institutions seamlessly.</p>
      </div>
      <Box sx={{ minHeight: '80vh', width: '100%', padding: '20px' }}>
        <Grid container spacing={3} justifyContent="center">
          {roleCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={card.id} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  flexGrow: 1,
                  marginTop:'100px',
                  height: '500px', 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: selectedCard === index ? '2px solid #1976D2' : '1px solid #ccc',
                  transition: '0.3s',
                }}
              >
                <CardActionArea onClick={() => setSelectedCard(index)} sx={{ height: '100%' }}>
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
               <h4 style={{fontSize:'1.4rem'}}> {card.title }</h4>
                
                {card.description}
              </SpotlightCard>
                </CardActionArea>
              </Card>
              
            </Grid>
          ))}
        </Grid>
      </Box>
      </div>

     <div id='contact' ref={contactRef} >
      <Footer/>
      </div>
    </div>
  );
};

export default LoginPages;
