import { createContext, useState } from "react";
import "./App.css";
import Addmovie from "./Components/Addmovie";
import Header from "./Components/Header";
import Movie from "./Components/Movie";
import Movies from "./Components/Movies";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

export const context = createContext();
function App() {
  const [user, setuser] = useState(false);
  const [username,setusername]=useState("");
  return (
    <context.Provider value={{ user, setuser,username,setusername }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/AddMovie" element={<Addmovie />} />
          <Route path="/Movie/:id" element={<Movie />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
}

export default App;
