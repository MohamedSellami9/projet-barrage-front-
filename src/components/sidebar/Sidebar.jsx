import "./sidebar.scss";
import "./sidebar.css";
import logo from './logo.png';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { Link,useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import useLogout from "../../hooks/useLogout";
import WavesIcon from '@mui/icons-material/Waves';

const Sidebar = () => {
  const navigate=useNavigate();
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
          <span className="logo"><img src={logo} alt="logo" /></span>
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
          {auth?.roles==="Admin" && <p className="title">ADMIN</p>}
          {auth?.roles==="Admin" && <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>}
          {((auth?.roles==="Editor") ||(auth?.roles==="Admin") )&& <p className="title">EDITOR</p>}
          {((auth?.roles==="Editor") ||(auth?.roles==="Admin") )&&<Link to="/barrages" style={{ textDecoration: "none" }}>
          <li>
            <WavesIcon className="icon" />
            <span>Barrages</span>
          </li>
          </Link>}
          <p className="title">USER {auth?.roles? `:  ${auth?.roles}`:""}</p>
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
    </div>
  );
};

export default Sidebar;
