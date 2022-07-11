import Navbar from "./components/Navbar";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AlertState from "./context/Alert/AlertState";
import Alert from "./components/Alert";
import DataState from "./context/Data/DataState";
import Search from "./components/Search";
import Addtolist from "./components/Addtolist";
import PlaylistView from "./components/PlaylistView";
import PlayList from "./components/PlayList";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "rgba(33,37,41,1)" }}>
      <DataState>
        <AlertState>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/addtolist" element={<Addtolist />} />
            <Route exact path="/playlist" element={<PlayList />} />
          </Routes>
        </AlertState>
      </DataState>
    </div>
  );
}

export default App;
