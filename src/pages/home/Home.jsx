import Sidebar from "../../components/sidebar/Sidebar";

import "./home.scss";

import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect,useState } from "react";
import axios from '../../api/axios';
import Chart2 from "../../components/chart2/Chart2";


const BARRAGE_URL="/barrages/names"
const Home = () => {
  const [alldata, setAlldata] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response1 = await axios.get(BARRAGE_URL);
    setAlldata(response1.data);   
   } ,[]) 
   console.log(alldata) 
   const [date, setDate] = useState([]);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(async () => {
     const response1 = await axios.get("/barrages/datee");
     setDate(response1.data);   
    } ,[]) 
    console.log(date) 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="charts">
          <Chart names={alldata} title="All years" aspect={2.5} />

        </div>
        <div className="charts">
          <Chart2 dates={date} title="Chart2" aspect={2.5} />

        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
