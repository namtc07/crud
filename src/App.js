import "./App.css";
import Login from "./components/login";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import CRUD from "./components/CRUD";
import Register from "./components/register";
import CRUDUSer from "./components/CRUDUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route index path="/register" element={<Register />} />
        <Route path="/crud" element={<CRUD />} />
        <Route path="/crud-user" element={<CRUDUSer />} />
      </Routes>
    </div>
  );
}

export default App;
