/* eslint-disable eqeqeq */

export const userColumns = [

  {
    field: "Nom_Fr",
    headerName: "Barrage Name",
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          
          {params.row.Nom_Fr}
        </div>
      );
    },
  },
  {
    field: "Cap_tot_act",
    headerName: "Cap_tot_act",
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          
          {params.row.Cap_tot_act}
        </div>
      );
    },
  },
  {
    field: "Cote",
    headerName: "Cote",
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          
          {params.row.Cote}
        </div>
      );
    },
  },
  {
    field: "Bassin_versant",
    headerName: "Bassin_versant",
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
           <div className="cellWithImg">
          
          {params.row.Bassin_versant }
        </div>
        </div>
      );
    
    },
},
  {
    field: "Position",
    headerName: "Position",
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
           <div className="cellWithImg">
          
          {params.row.Latitude + " , "+ params.row.Longitude}
        </div>
        </div>
      );
    
    },
  },
  
  {
    field: "Annee_prod",
    headerName: "Annee_prod",
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
           <div className="cellWithImg">
          
          {params.row.Annee_prod }
        </div>
        </div>
      );
    
    },},
  
  
];

//temporary data











