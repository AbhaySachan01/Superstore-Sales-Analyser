import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import Acknowledgement from "./components/Acknowledgement/acknowledgement.jsx";
import Signup from "./components/Signup/index.jsx";
import Login from "./components/Login/index.jsx";
import ErrorPage from "./components/ErrorPage/index.jsx";
import AboutUs from "./components/AboutUs/index.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Learnmore from "./components/Learnmore/learnmore.jsx";
import Colab from "./components/Colab/colab.jsx";
import FileUpload from "./components/automatic/fileupload.jsx";
import Footer from "./components/Footer.jsx";

// Analysis Pages
import CategoryMonthly from "./pages/CategoryMonthly/index.jsx";
import CategoryWeekly from "./pages/CategoryWeekly/index.jsx";
import SubCategoryMonthly from "./pages/SubCategoryMonthly/index.jsx";

// Prediction Pages
import PredictCatM from "./components/Prediction/CategoryMonthlyPrediction.jsx";
import PredictCatW from "./components/Prediction/CategoryWeeklyPrediction.jsx";
import PredictSubCatM from "./components/Prediction/SubCategoryMonthlyPrediction.jsx";
import PredictFuture from "./components/Prediction/CategoryFuturePrediction.jsx";

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
        <Route path="/learnmore" element={<Learnmore />} />
        <Route path="/acknowledgement" element={<Acknowledgement />} />
        <Route path="/colab" element={<Colab />} />
        <Route path="/fileupload" element={<FileUpload />} />

        {/* Analysis Routes */}
        <Route path="/category-monthly" element={<CategoryMonthly />} />
        <Route path="/category-weekly" element={<CategoryWeekly />} />
        <Route path="/subcategory-monthly" element={<SubCategoryMonthly />} />

        {/* Prediction Routes */}
        <Route path="/prediction/category-weekly" element={<PredictCatW />} />
        <Route path="/prediction/category-monthly" element={<PredictCatM />} />
        <Route path="/prediction/subcategory-monthly" element={<PredictSubCatM />} />
        <Route path="/prediction/category-future" element={<PredictFuture />} />

        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
