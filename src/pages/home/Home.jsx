import Sidebar from "../../components/sidebar/Sidebar";

import "./home.scss";

import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect,useState } from "react";
import axios from '../../api/axios';
import Chart2 from "../../components/chart2/Chart2";


const BARRAGE_URL="/getBarrages/names"
const Home = () => {
  const [alldata, setAlldata] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response1 = await axios.get(BARRAGE_URL);
    setAlldata(response1.data);   
   } ,[]) 
   const [date, setDate] = useState([]);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(async () => {
     const response1 = await axios.get("/getBarrages/datee");
     setDate(response1.data);   
    } ,[]) 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="charts">
          <Chart names={alldata} title="" aspect={2.5} />

        </div>
        <div className="charts">
          <Chart2 dates={date} title="" aspect={2.5} />

        </div>
        <div className="listContainer">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
