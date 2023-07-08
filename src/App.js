import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { RestuarantDetails } from "./pages/RestuarantDetails";

import "./App.css";
import "./styling/Homepage.css";
import "./styling/RestuarantDetails.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/restuarant/:restuarantId"
          element={<RestuarantDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
