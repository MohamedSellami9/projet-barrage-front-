import { useState , useEffect,PureComponent} from "react";
import axios from '../../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./chart.scss";
import moment from "moment";
import CircleLoader from "react-spinners/CircleLoader";
import { nanoid } from 'nanoid'




const Chart2 = ({dates, aspect, title }) => {
   const [data, setData] = useState([]);
   const [formData, setFormData] = useState(
    {
      Date: "2022-08-04 00:00:00",
        field: "apports"
    }
)
const URL="/getBarrages/date/";

const [isLoading, setIsLoading] = useState(true);
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

    setIsLoading(true);
    let isMounted = true;
    try {
      const response = await axios.post(URL, JSON.stringify({"date": formData.Date}),{
        headers: { 'Content-Type': 'application/json' },
    } );
      setData(response.data);
  }
  catch (err) {
      console.error(err);
  }
  finally {
      isMounted && setIsLoading(false);
  }
  return () => isMounted = false;

   } ,[formData])
  function fields(){  
    const o=data[0]
  if (Boolean(o)){
  return((Object.keys(o)).filter(function(value, index, arr){ 
    return !((value === "_id") || (value === "Nom_Fr")|| (value === "Nom_Ar") || (value === "Date")|| (value === "id_barrage")
    || (value === "Longitude")|| (value === "Latitude") );
}));
  }return([])}


  function Options({table}){
   return(table?.map(item=>(<option key={nanoid()} value={item}>{item}</option>)))}
  
function Optionsdate({table}){
   return(table?.map(item=>(<option key={nanoid()} value={item}>{moment(item)
    .format("ll")
    .slice(0, 12)}</option>)))}

    function handleChange(event) {
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
      const { x, y, payload } = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={0} textAnchor="end" fill="#666" transform="rotate(-90)" fontSize={14}>
            {payload.value}
          </text>
        </g>
      );
    }
  }
  const style={
    height:"400px",

    display:"flex",
    justifyContent:"center",
    alignItems:"center"
}
  return (
    <div className="chart">
      <div className="selectflex">
        <div className="selectsub">
      <label htmlFor="date">Choose country barrage:<tab/></label>
      <select className="custom-select" name="Date" id="date" value={formData.Date} onChange={handleChange}>
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

      {isLoading
                    ? <div style={style}><CircleLoader
                    color="#3B7DB2"/></div>
                    :
        <BarChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
          barSize={5}
        >
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#007000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#007000" stopOpacity={0} />
            </linearGradient>
          <XAxis dataKey="Nom_Fr" scale="point" interval={0} padding={{ left: 10, right: 10 } } tick={<CustomizedAxisTick />}   />
          <YAxis />
          
          <Tooltip />
      
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey={formData.field} fill="#439E01"  />
        
            
        </BarChart>}
        
      </ResponsiveContainer>
    
    
      </div>
    
  );
};

export default Chart2;
