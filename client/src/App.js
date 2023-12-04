import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "./Components/Pages/Connection";
import Loading from "./Components/Loading/Loading";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connection />}>
        </Route>
        <Route path="/Loading" element={<Loading />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
