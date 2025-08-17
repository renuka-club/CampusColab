import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import * as React from "react";
import { useEffect, useState } from "react";
import { FaBook, FaCalendarAlt, FaChalkboardTeacher, FaComments, FaEnvelopeOpenText, FaUserGraduate, FaUsers } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Chatbox from "../pages/Chatbox";
import AddFriends from "../pages/StudentAdd/AddFriends";
import CoursesSelected from "../pages/StudentAdd/CoursesSelected";
import FriendsAndGroup from "../pages/StudentAdd/FriendsAndGroup";
import SelectCourses from "../pages/StudentAdd/SelectCourses";
import StudentForm from "../pages/StudentAdd/StudentForm";
import ViewCoursesList from '../pages/StudentAdd/ViewCoursesList';
import ViewStudents from "../pages/StudentAdd/ViewStudents";
import AddCourses from "../pages/TeacherAdd/AddCourses";
import AddEvents from "../pages/TeacherAdd/AddEvents";
import TeacherForm from "../pages/TeacherAdd/TeacherForm";
import ViewCourses from "../pages/TeacherAdd/ViewCourses";
import ViewEvents from "../pages/TeacherAdd/ViewEvents";
import ViewTeachers from "../pages/TeacherAdd/ViewTeachers";
import Profile from "./Profile";
const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  "&.open": {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  "&.open": {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedComponent, setselectedComponent] = useState(null);
  const [userDetails, setUserDetails] = useState({ name: "", role: "" });
  const location = useLocation();
  const role = location.state?.role || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "Admin") {
      setselectedComponent("AddTeachers");
    } else if (role === "Teacher") {
      setselectedComponent("ViewEvents");
    } else {
      setselectedComponent("coursesjoined");
    }
  }, [role]);

  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleUpcoming = () => {
    navigate("/student-events");
  };

  const handleSendToChatbox = () => {
    const userDetails = {
      name: role === "Admin" ? localStorage.getItem("username") : 
            role === "Teacher" ? localStorage.getItem("teachername") : 
            localStorage.getItem("studentname"),
      role: role,
    };
    console.log("Setting userDetails:", userDetails);
    setselectedComponent("Chatbox");  // Set only the component name
    setUserDetails(userDetails);      // Update the user details to be passed as props
  };

  const handleSendToProfile = () => {
    const userDetails = {
      name: role === "Admin" ? localStorage.getItem("username") : 
            role === "Teacher" ? localStorage.getItem("teachername") : 
            localStorage.getItem("studentname"),
      role: role,
    };
    console.log("Setting userDetails:", userDetails);
    setselectedComponent("Profile");  // Set only the component name
    setUserDetails(userDetails);      // Update the user details to be passed as props
  };
  const componentMapping = {
    ViewEvents: <ViewEvents />,
    AddCourses: <AddCourses />,
    AddTeachers: <TeacherForm />,
    AddStudents: <StudentForm />,
    AddEvents: <AddEvents />,
    ViewTeachers: <ViewTeachers />,
    ViewStudents: <ViewStudents />,
    manageStudents: <ViewStudents />,
    ViewCourses: <ViewCourses />,
    ViewCoursesList: <ViewCoursesList />,
    selectcourses: <SelectCourses />,
    coursesjoined: <CoursesSelected />,
    friendsandgroups: <FriendsAndGroup />,
    AddFriends: <AddFriends />,
    Chatbox: <Chatbox userDetails={userDetails} />,
    Back: <ViewEvents />,
    Profile: <Profile userDetails={userDetails} />,
  };

  const username = localStorage.getItem("username");
  const teachername = localStorage.getItem("teachername");
  const studentname = localStorage.getItem("studentname");

  const handleLogout = () => {
    if (sessionStorage.getItem('accessToken')) {
      sessionStorage.removeItem('accessToken');
      navigate('/');
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" className={open ? "open" : ""}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {role === "Teacher"
              ? `${teachername} Dashboard`
              : role === "Student"
              ? `${studentname} Dashboard`
              : `${username} Dashboard`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </DrawerHeader>
        <Divider />

        {/* Admin Dashboard */}
        {role === "Admin" && (
          <List>
            {[{ text: "Profile", icon: <AccountBoxIcon />, action: handleSendToProfile },
              { text: "Add Teachers", icon: <FaChalkboardTeacher />, action: () => setselectedComponent("AddTeachers") },
              { text: "Add Students", icon: <FaUserGraduate />, action: () => setselectedComponent("AddStudents") },
              { text: "Add Workshops", icon: <FaUserGraduate />, action: () => setselectedComponent("AddEvents") },
              { text: "Send Group Message", icon: <FaEnvelopeOpenText />, action: handleSendToChatbox },
              { text: "Logout", icon: <FaEnvelopeOpenText />, action: handleLogout },
              { text: "Back", icon: <ArrowBackIcon />, action: () => setselectedComponent("Back") }].map(({ text, icon, action }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={action}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
                <PopupState variant="popover" popupId="manage-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button {...bindTrigger(popupState)} style={{ color: "black", textTransform: "none" }}>Manage</Button>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={() => { setselectedComponent("ViewTeachers"); popupState.close(); }}>View Teachers</MenuItem>
                        <MenuItem onClick={() => { setselectedComponent("ViewStudents"); popupState.close(); }}>View Students</MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </ListItemButton>
            </ListItem>
          </List>
        )}

        {/* Teacher Dashboard */}
        {role === "Teacher" && (
          <List>
            {[{ text: "Profile", icon: <AccountBoxIcon />, action: handleSendToProfile },
              { text: "Add Courses", icon: <FaBook />, action: () => setselectedComponent("AddCourses") },
            { text: "Add Events", icon: <FaBook />, action: () => setselectedComponent("AddEvents") },
              { text: "View Events", icon: <FaBook />, action: () => setselectedComponent("ViewEvents") },
              { text: "Send Group Message", icon: <FaEnvelopeOpenText />, action: handleSendToChatbox },
              { text: "View Courses", icon: <FaBook />, action: () => setselectedComponent("ViewCourses") },
              { text: "Logout", icon: <FaEnvelopeOpenText />, action: handleLogout }].map(({ text, icon, action }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={action}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        {/* Student Dashboard */}
        {role === "Student" && (
          <List>
            {[{ text: "Profile", icon: <AccountBoxIcon />, action: handleSendToProfile },
              { text: "Upcoming Events", icon: <FaCalendarAlt />, action: handleUpcoming },
              { text: "Select Courses", icon: <FaBook />, action: () => setselectedComponent("ViewCoursesList") },
              { text: "Courses Joined", icon: <FaBook />, action: () => setselectedComponent("coursesjoined") },
              { text: "Friends and Groups", icon: <FaUsers />, action: () => setselectedComponent("friendsandgroups") },
              { text: "Send Message", icon: <FaComments />, action: handleSendToChatbox },
              { text: "Logout", icon: <FaEnvelopeOpenText />, action: handleLogout }].map(({ text, icon, action }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={action}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
      
      {/* Main Content */}
      <Main className={open ? "open" : ""}>{componentMapping[selectedComponent]}</Main>
    </Box>
  );
}
