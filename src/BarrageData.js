export const userColumns = [

    {
      field: "index",
      headerName: "index",
      flex:1,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            
            {params.row.index}
          </div>
        );
      },
    },
    {
      field: "Value",
      headerName: "Value",
      flex:1,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            
            {params.row.value}
          </div>
        );
      },
    },
   
    
  ];