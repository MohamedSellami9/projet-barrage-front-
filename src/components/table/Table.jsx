import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatableBarrage";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from '../../api/axios';
const BARRAGE_URL = '/getBarrages/date';

const List = () => {
  const [bool, setBool] = useState(false);
  const [data, setData] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.post(BARRAGE_URL, JSON.stringify({"date":"2022-07-31 00:00:00"}),{
      headers: { 'Content-Type': 'application/json' },
  } );
    setData(response.data);

   } ,[])
  
  return (
    <div className="datatable">
      <div className="datatableTitle">
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        getRowId={(row) => row._id}
      />
    </div>
  );

};

export default List;
