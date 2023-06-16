import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Filter from "./pages/Filter"
import CreateGroup from "./pages/CreateGroup"
import MyGroups from "./pages/MyGroups"
import Schedule from "./pages/Schedule"
import GroupPage from './pages/GroupPage';
import "primeicons/primeicons.css";
        
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
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
              element={<Filter />}
              //NOT enabling the user authentication check first because i(yuhao) cannot log in
              // element={<Review />}
            />
            <Route
              path="/group/:groupID"
              element={<GroupPage />}
              //NOT enabling the user authentication check first because i(yuhao) cannot log in
              // element={<Review />}
            />
              <Route path="/creategroup" element={<CreateGroup />} />
              <Route path="/mygroups" element={<MyGroups />} />
              <Route path="/schedule" element={<Schedule />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
