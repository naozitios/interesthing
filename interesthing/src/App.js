import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.css';

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import FilterTab from "./pages/FilterTab"
import CreateGroup from "./pages/CreateGroup"
import MyGroups from "./pages/MyGroups"
import Schedule from "./pages/Schedule"
        

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home /> }
              // element={<Home />}
            />
            <Route
              path="/filter"
              element={<FilterTab />}
              //NOT enabling the user authentication check first because i(yuhao) cannot log in
              // element={<Review />}
            />

            <Route
              path="/creategroup"
              element={<CreateGroup />}
            />
            <Route
              path="/mygroups"
              element={<MyGroups />}
            />
            <Route
              path="/schedule"
              element={<Schedule />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
