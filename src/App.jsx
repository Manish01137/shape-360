import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main style={{ minHeight: "60vh", padding: "40px" }}>
        <h1>Home Page Loaded ✅</h1>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
