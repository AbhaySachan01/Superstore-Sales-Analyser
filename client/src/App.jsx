import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Signup from "./components/Signup/index";
import Login from "./components/Login/index";
import ErrorPage from "./components/ErrorPage/index";
import AboutUs from "./components/AboutUs/index";
import Navbar from "./components/Navbar/Navbar";
import CategoryMonthly from "./pages/CategoryMonthly/index";
import CategoryWeekly from "./pages/CategoryWeekly/index";
import SubCategoryMonthly from "./pages/SubCategoryMonthly/index";

function App() { 
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/category-monthly" element={<CategoryMonthly />} />
        <Route path="/category-weekly" element={<CategoryWeekly />} />
        <Route path="/subcategory-monthly" element={<SubCategoryMonthly />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </Router>
  );
}

export default App;
