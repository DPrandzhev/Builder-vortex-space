import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Survey from "./pages/Survey";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-fitness-light">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
