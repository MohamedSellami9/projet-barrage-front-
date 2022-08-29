import Sidebar from "../../components/sidebar/Sidebar";
import "./unauthorized.css"
import { Link } from "react-router-dom";


const Unauthorized=()=> {
  

  return (
    <div className="new" >
    <Sidebar />
    <div className="newContainer">
      <div className="right">
      <div id="unauth">
  <div className="unauth">
    <div className="unauth-404"></div>
    <h1>Unauthorized</h1>
    <p>Oops! You Do Not Have Access To This Page</p>
    <Link to="/">Back to homepage</Link>
  </div>
</div>
      </div>
      
          
        </div>
      </div>

  );
};

export default Unauthorized;
