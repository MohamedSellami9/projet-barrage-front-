import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Edit from "./pages/edit/Edit";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import Notfound from "./pages/Notfound/Notfound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Barrage from './pages/barrage/barrage'
import AuthContext from "./context/AuthProvider";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/">
          
              {/* public routes */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />


            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="users">
              <Route index element={<List />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
                
              />
              <Route
                path="edit/:id"
                element={<Edit inputs={userInputs} title="Edit selected user" />}
                
              />
            </Route>
            </Route>
            



            <Route element={<RequireAuth allowedRoles={["Admin", "Editor"]} />}>
            <Route path="barrages">
              <Route index element={<Barrage />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            </Route>
            <Route path="*" element={<Notfound />} />
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
