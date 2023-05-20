import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/homepage/HomePage";
import CustomMap from "./components/customMap/CustomMap";
import States from "./components/states/States";
import State from "./components/state/State";
import Parties from "./components/parties/Parties";
import Chamber from "./components/chamber/Chamber";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/map" element={<CustomMap></CustomMap>}></Route>
          <Route path="/parties" element={<Parties></Parties>}></Route>
          <Route path="/chamber" element={<Chamber></Chamber>}></Route>
          <Route path="/states" element={<States></States>}></Route>
          <Route path="/states/:stateAbbr" element={<State></State>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
