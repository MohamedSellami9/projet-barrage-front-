import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Notfound.css"


const Notfound=()=> {
  

  return (
    <div className="new" >
      <Sidebar />
      <div className="newContainer">
        <div className="right">
        <div id="notfound">
		<div className="notfound">
			<div className="notfound-404"></div>
			<h1>404</h1>
			<h2>Oops! Page Not Be Found</h2>
			<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
			<Link to="/">Back to homepage</Link>
		</div>
	</div>
        </div>
        
            
          </div>
        </div>
 
  );
};

export default Notfound;
