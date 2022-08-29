import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from '../../api/axios';
import CircleLoader from "react-spinners/CircleLoader";

const USER_URL = '/users';

const Datatable = () => {

  const [bool, setBool] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setIsLoading(true);
    let isMounted = true;
    try {
      const response = await axios.get(USER_URL);
       setData(response.data);
  }
  catch (err) {
  }
  finally {
      isMounted && setIsLoading(false);
  }
  return () => isMounted = false;
  },[bool])
  const handleDelete = (id) => {

    axios.delete(USER_URL, { data: { "id": `${id}` }})
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

  const style={
    height:"400px",

    display:"flex",
    justifyContent:"center",
    alignItems:"center"
}
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Users List
      </div>
      {isLoading
                    ? <div style={style}><CircleLoader
                    color="#3B7DB2"/></div>
                    :
      <DataGrid
     
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
      />}
    </div>
  );
};

export default Datatable;
