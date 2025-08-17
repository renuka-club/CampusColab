import { createContext, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddAdmin from './components/AddAdmin';
import Chat from "./components/Chat";
import Login from './components/Login';
import LoginPages from './components/LoginPages';
import View from './components/View';
import StudentView from './pages/StudentView';
import TeacherForm from './pages/TeacherAdd/TeacherForm';

export const MyContext = createContext();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("accessToken") ? true : false;
  });


  const values = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return (   
          <Router>
          <MyContext.Provider value={values}>
            <Routes>
              <Route path="/chatapp" element={<Chat userId={1} receiverId={2} />} />
              <Route path="/" element={<LoginPages />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addadmin" element={<AddAdmin />} />
              <Route path="/admin-view" element={isAuthenticated ? <View /> : <Navigate to="/" />} />
              <Route path="/teacher-view" element={isAuthenticated ? <View /> : <Navigate to="/" />} />
              <Route path="/student-view" element={isAuthenticated ? <View /> : <Navigate to="/" />} />
              <Route path="/teacheradd" element={isAuthenticated ? <TeacherForm /> : <Navigate to="/" />} />
              <Route path="/student-events" element={isAuthenticated ? <StudentView /> : <Navigate to="/" />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MyContext.Provider>
        </Router>    
  );
}

export default App;