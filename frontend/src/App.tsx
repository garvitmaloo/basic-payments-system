import { Routes, Route } from "react-router-dom";

import HomeScreen from "./screen/Home";
import Cart from "./screen/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
