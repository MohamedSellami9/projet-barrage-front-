import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from '../../api/axios';
const USER_URL = '/users';

const Datatable = () => {

  const [bool, setBool] = useState(false);
  const [data, setData] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.get(USER_URL)
    setData(response.data)
    
  },[bool])
  console.log(data)
  const handleDelete = (id) => {

    axios.delete(USER_URL, { data: { "id": `${id}` }})
    setBool((prev)=>(!prev))
  };

  function hundlecommit(e){
    console.log(e.row)
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex:1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/edit/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
     
        className="datagrid"
        rows={data}
        onCellEditCommit={hundlecommit}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;