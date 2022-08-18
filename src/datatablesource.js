/* eslint-disable eqeqeq */

export const userColumns = [
  { field: "_id", headerName: "ID", width: 70,hide: true },
  
  {field: "dateCreated",
  headerName: "Date Created",
  flex:2,
  renderCell: (params) => {
    const date = new Date(params.row.createdAt);

    return (
      
      <div className="cellWithImg">
        {date.toLocaleString()}
      </div>
    );
  }
  },

  {
    field: "username",
    headerName: "Username",
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex:2,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          
          {params.row.email}
        </div>
      );
    },
  },
  {
    field: "number",
    headerName: "Phone number",
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          
          {params.row.num}
        </div>
      );
    },
  },
  {
    field: "Permissions",
    headerName: "Permissions",
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          
           {(params.row?.roles==="Admin")?<div className="deleteButton">Admin</div>
           :(params.row?.roles==="Editor")?<div className="viewButton">Editor</div>:<div className="user">User</div>}
          
         
        </div>
      );
    
    },
  },
  
];

//temporary data











export const userRows = [
  {
    id: 1,
    username: "Snow",
    status: "111",
    email: "1snow@gmail.com"
  },
  {
    id: 2,
    username: "Jamie Lannister",
    email: "2snow@gmail.com",
    status: "101",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    email: "3snow@gmail.com",
    status: "000",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    email: "4snow@gmail.com",
    status: "100",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
