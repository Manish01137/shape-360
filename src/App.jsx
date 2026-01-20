import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
