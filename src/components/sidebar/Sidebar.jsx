import "./sidebar.scss";
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { Link,useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import useLogout from "../../hooks/useLogout";
import AuthContext from "../../context/AuthProvider";
import WavesIcon from '@mui/icons-material/Waves';

const Sidebar = () => {
  const navigate=useNavigate();
  const { dispatch } = useContext(DarkModeContext);
  const { auth } = useContext(AuthContext);
  const logout=useLogout();
  const signOut= async()=>{
      await logout();
      navigate("/");

  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SSM</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" className="li" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>  
          </li>
          </Link>
          <p className="title">ADMIN</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/barrages" style={{ textDecoration: "none" }}>
          <li>
            <WavesIcon className="icon" />
            <span>Barrages</span>
          </li>
          </Link>
          <p className="title">USER</p>
          {auth?.user? <li onClick={signOut} >
            <ExitToAppIcon className="icon" />
            <span >Logout</span>
          </li>:
          <>
          <Link to="/login" className="li" style={{ textDecoration: "none" }}>
            <li >
            <LoginIcon className="icon" />
            <span>Login</span>
          </li>
          </Link>
          <Link to="/register" className="li" style={{ textDecoration: "none" }}>
          <li >
            
              <HowToRegIcon className="icon" />
            <span >Register</span>
       
          </li>   </Link></>
          }
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
