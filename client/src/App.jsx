import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryMonthly from "./pages/CategoryMonthly";
import CategoryWeekly from "./pages/CategoryWeekly";
import SubCategoryMonthly from './pages/SubCategoryMonthly'
import ErrorPage from "./pages/ErrorPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/category-monthly" element={<CategoryMonthly />} />
        <Route path="/category-weekly" element={<CategoryWeekly />} />
        <Route path="/subcategory-monthly" element={<SubCategoryMonthly />} />
        <Route path="/*" element={<ErrorPage/>} />

      </Routes>
    </Router>
  );
};

export default App;
