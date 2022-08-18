/* eslint-disable react-hooks/exhaustive-deps */
import "./barrageTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../BarrageData";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import TextField from '@mui/material/TextField';
import axios from '../../api/axios';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { tableFooterClasses } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BARRAGES_URL = '/barrages/date';
const NAMES_URL="/barrages/names"
const BarrageTable = () => {
  
  const [open, setOpen] = useState(false);
  const [field, setfield] = useState("");
    const [alldata, setAlldata] = useState([]);
    const [dialog, setDialog] = useState("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
      const response1 = await axios.get(NAMES_URL);
      setAlldata(response1.data);   
      
     } ,[]) 
     console.log(alldata) 

    const [value, setValue] = useState(
      JSON.parse(localStorage.getItem("date"))||Date.now(),      );
    
      const handleChange2 = (newValue) => {
        setValue(newValue);
        localStorage.setItem("date", JSON.stringify(newValue));
      };
  const [bool, setBool] = useState(false);
  const [data, setData] = useState([]);
  const [tab,setTab]=useState([]);
  const [formData, setFormData] = useState("abid")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.post(BARRAGES_URL, JSON.stringify({"date": `${moment(value).format("YYYY-MM-DD")} 00:00:00`}),{
      headers: { 'Content-Type': 'application/json' },
  } );
    console.log(response.data)

    setTab(rows(response.data.filter((item)=>(item.Nom_Fr===formData))));

   // eslint-disable-next-line no-use-before-define
   } ,[bool, value, formData])
   console.log(data);
   
   function handleChange3(e) {
    console.log(e)
    const {value} = e.target
    setFormData(value)
}
   function Options({table}){
    return(table?.map(item=>(<option value={item}>{item}</option>)))}
  
  const handleDelete = (id) => {

    axios.delete(BARRAGES_URL, { data: { "id": `${id}` }})
    setBool((prev)=>(!prev))
  };
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex:1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            
              <div onClick={()=>{
                    setOpen(true)
                    setfield(params.row.index)
                    setDialog(params.row.value)
              }} className="viewButton">Edit</div>
          </div>
        );
      },
    },
  ];
  function rows(data){
  
    const indexes=Object.keys(data[0])
    const values=Object.values(data[0])
    let tab=[];
    for (let i = 0; i < indexes.length; i++) {
      tab[i]={
        index:indexes[i],
        value:values[i],
        _id:i
      }
      
    }

    return(tab.filter(function(value, index, arr){ 
      return !((value.index=== "_id") || (value.index === "Nom_Fr")|| (value.index === "Nom_Ar") || (value.index === "Date")|| (value.index === "id_barrage")|| (value.index === "Annee_prod")
      ||  (value.index === "Cap_tot_act") || (value.index === "Cote") || (value.index === "Bassin_versant")|| (value.index === "Longitude")|| (value.index === "Latitude")|| (value.index === "Cap_tot_init") );
  }));
  }






  const handleCancel = () => {
    setOpen(false);
  };
  const handleSubmit = async() => {
    const response = await axios.put('/barrages', {"Date":`${moment(value).format("YYYY-MM-DD")} 00:00:00`,
    "Nom_Fr":`${formData}`,
    "field":`${field}`,
    "value":`${dialog}`
  });
    setOpen(false);
    setBool((prev)=>(!prev))
  };



  return (
    <div className="datatable">
      <div className="datatableTitle">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      
      <DesktopDatePicker 
      label=""
      inputFormat="dd/MM/yyyy"
      value={value}
      onChange={handleChange2}
      renderInput={(params) => <TextField {...params} />}
      />
          
    </LocalizationProvider>
      <div className="select">
      <label  htmlFor="country">Choose country barrage:</label>
      <select name="country" id="country" value={formData} onChange={handleChange3}>
    <Options table={alldata} />
    </select>
    </div>
        <Link to="/users/new" className="link">
          Add New
        </Link>
 
        
      </div>

      <DataGrid
        className="datagrid"
        rows={tab }
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        getRowId={(row) => row._id}
       
      />
      <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change value of index {field}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            value={dialog}
            onChange={(e)=>{setDialog(e.target.value)}}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
};

export default BarrageTable;
