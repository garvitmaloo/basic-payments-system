import { Routes, Route } from "react-router-dom";

import HomeScreen from "./screen/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
    </Routes>
  );
}

export default App;
