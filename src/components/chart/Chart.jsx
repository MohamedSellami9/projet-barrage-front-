import { useState , useEffect} from "react";
import axios from '../../api/axios';
import "./chart.scss";
import moment from 'moment';
import Select from 'react-select';
import {
  AreaChart,
  Brush ,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const Chart = ({names, aspect, title }) => {
  const CustomizedAxisTick = ({ x, y, payload }) => {
    const dateTip = moment(payload.value)
    .format("ll")
    .slice(0, 12);
       return (
      <g transform={`translate(${x},${y})`}>
     <text x={23} y={0} dy={14} fontSize="0.90em" fontFamily="bold" textAnchor="end" fill="#363636">
       {dateTip}</text>
      </g>
     );
    }
    
   const [data, setData] = useState([]);
   const [formData, setFormData] = useState(
    {
      country: "sarrat",
        field: "apports"
    }
)
let url=`/barrages/name/${formData.country}`

 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.get(url);
    setData(response.data.reverse());

   } ,[url])
  
  console.log(data)
 
  function fields(){  
    const o=data[0]
  if (Boolean(o)){
  return((Object.keys(o)).filter(function(value, index, arr){ 
    return !((value === "_id") || (value === "Nom_Fr")|| (value === "Nom_Ar") || (value === "Date")|| (value === "id_barrage")|| (value === "Annee_prod")
    || (value === "fonctionnel")|| (value === "Cap_tot_act") || (value === "Cote") || (value === "Bassin_versant")|| (value === "Longitude")|| (value === "Latitude")|| (value === "Cap_tot_init"));
}));
  
  }return([])}
  function Options({table}){
    return(table?.map(item=>(<option value={item}>{item}</option>)))}
  
    function handleChange(e) {
      console.log(e)
      const {name, value} = e.target
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [name]: value
          }
      })
  }
  const xAxisTickFormatter = (timestamp_measured) => {
    return moment(timestamp_measured)
      .format("ll")
      .slice(0, 12);
     }


  return (
    <div className="chart">
 <div className="selecta">
        <div className="select">
      <label htmlFor="country">Choose country barrage:<tab/></label>
      <select name="country" id="country" value={formData.country} onChange={handleChange}>
    <Options table={names} />
</select>

</div>
<div className="select">
<label htmlFor="field">Choose an index:<tab/></label>
<select name="field" id="field"  value={formData.field} onChange={handleChange}>
    <Options table={fields()} />   
</select>
</div>
</div>
      <div className="title" id="title">{title}</div>
      
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={150}
          data={data.reverse()}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="Date" stroke="gray" tick={CustomizedAxisTick} />
          <YAxis  />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={formData.field}
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
          <Brush tickFormatter={xAxisTickFormatter} dataKey="Date" />
        </AreaChart>
        
      </ResponsiveContainer>
    
    
      </div>
    
  );
};

export default Chart;
