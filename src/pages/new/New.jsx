import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";



const New = ({ inputs, title }) => {


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
             

              {inputs.map((input) => {
                if (input.type==="radio")
                return(
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <div>
                  <label htmlFor="admin">
                      <input type="radio" id="admin" name="roles" value="Admin"/>
                     Admin</label>
                     <label htmlFor="editor">
                      <input type="radio" id="editor" name="roles" value="Editor"/>
                      Editor</label>
                  </div>

                </div>)
          else
          return(
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input type={input.type} placeholder={input.placeholder} />
            </div>)
            
          
                
  })}


              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
