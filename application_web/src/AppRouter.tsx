import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Forum from "./pages/Forum";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
