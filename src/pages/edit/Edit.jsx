/* eslint-disable react-hooks/exhaustive-deps */
import "./Edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from '../../api/axios';
import {  useNavigate } from 'react-router-dom';

const Edit = ({ inputs, title }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [selected, setSelected] = useState();
  const [data, setData] = useState();
  useEffect(async () => {
    const response = await axios.get(`/users/${params.id}`)
    
    await new Promise ((a,b)=>{setData(response.data)
    a()})
  
    setSelected((response?.data?.roles==="Admin")?"Admin":((response?.data?.roles)==="Editor")?"Editor":"User")
  },[])

const handleChange = event => {
    setSelected(event.target.value);
  };
  const hundleclick =async (e)=>{
    e.preventDefault();
     await axios.put('/roles', {"username":`${data.username}`,
  "roles":`${selected}`});
  
  
    navigate('/users', { replace: true });

     }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title} : {data?.username}</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form className="form">
             

              {inputs.map((input) => {
                if (input.type==="radio")
                return(
                <div className="formInput" key={input.id}>
                  <label className="label">{input.label}</label>
                  <div >
                  <label htmlFor="admin">
                      <input type="radio" htmlFor="radio" id="admin" name="roles" value="Admin" checked={selected === "Admin"} onChange={handleChange} />
                     Admin</label>
                     <label htmlFor="editor">
                      <input type="radio" id="editor" name="roles" value="Editor" checked={selected === "Editor"} onChange={handleChange} />
                      Editor</label>
                      <label htmlFor="none">
                      <input type="radio" id="none" name="roles" value="User" checked={selected === "User"} onChange={handleChange} />
                      User</label>
                  </div>

                </div>)
                else return(<></>)
        
  })}


              <button onClick={hundleclick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
