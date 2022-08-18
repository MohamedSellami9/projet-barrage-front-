import { useState , useEffect,PureComponent} from "react";
import axios from '../../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./chart.scss";
import moment from "moment";




const Chart2 = ({dates, aspect, title }) => {
   const [data, setData] = useState([]);
   const [formData, setFormData] = useState(
    {
      Date: "2022-08-04 00:00:00",
        field: "apports"
    }
)
const URL="/barrages/date/";


 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.post(URL, JSON.stringify({"date": formData.Date}),{
      headers: { 'Content-Type': 'application/json' },
  } );
    setData(response.data);

   } ,[formData])
  console.log(formData.Date)
  function fields(){  
    const o=data[0]
  if (Boolean(o)){
  return((Object.keys(o)).filter(function(value, index, arr){ 
    return !((value === "_id") || (value === "Nom_Fr")|| (value === "Nom_Ar") || (value === "Date")|| (value === "id_barrage")|| (value === "Annee_prod")
    || (value === "fonctionnel")|| (value === "Cap_tot_act") || (value === "Cote") || (value === "Bassin_versant")|| (value === "Longitude")|| (value === "Latitude")|| (value === "Cap_tot_init") );
}));
  }return([])}


  function Options({table}){
   return(table?.map(item=>(<option value={item}>{item}</option>)))}
  
function Optionsdate({table}){
   return(table?.map(item=>(<option value={item}>{moment(item)
    .format("ll")
    .slice(0, 12)}</option>)))}

    function handleChange(event) {
      console.log(event)
      const {name, value} = event.target
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [name]: value
          }
      })
  }
  
  class CustomizedAxisTick extends PureComponent {
    render() {
      const { x, y, stroke, payload } = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={0} textAnchor="end" fill="#666" transform="rotate(-90)" fontSize={14}>
            {payload.value}
          </text>
        </g>
      );
    }
  }

  return (
    <div className="chart">
      <div className="selectflex">
        <div className="selectsub">
      <label htmlFor="date">Choose country barrage:<tab/></label>
      <select class="custom-select" name="Date" id="date" value={formData.Date} onChange={handleChange}>
    <Optionsdate table={dates} />
</select>
</div>
<div className="selectsub">
<label htmlFor="field">Choose an index:<tab/></label>
<select name="field" id="field"  value={formData.field} onChange={handleChange}>
    <Options table={fields()} />   
</select>
</div>
</div>
      <div className="title" id="title">{title}</div>
      
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
          barSize={5}
        >
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          <XAxis dataKey="Nom_Fr" scale="point" interval={0} padding={{ left: 10, right: 10 } } tick={<CustomizedAxisTick />}   />
          <YAxis />
          
          <Tooltip />
      
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey={formData.field} fill="#8884d8"  />
        
            
        </BarChart>
        
      </ResponsiveContainer>
    
    
      </div>
    
  );
};

export default Chart2;
