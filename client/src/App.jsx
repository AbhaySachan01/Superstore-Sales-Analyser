import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Acknowledgement from "./components/Acknowledgement/acknowledgement"; // ✅ Corrected import
import Signup from "./components/Signup/index";
import Login from "./components/Login/index";
import ErrorPage from "./components/ErrorPage/index";
import AboutUs from "./components/AboutUs/index";
import Navbar from "./components/Navbar/Navbar";
import Learnmore from "./components/Learnmore/learnmore";
import Colab from "./components/Colab/colab";
import FileUpload from "./components/automatic/fileupload";
import Footer from "./components/Footer";


// Analysis Pages
import CategoryMonthly from "./pages/CategoryMonthly/index";
import CategoryWeekly from "./pages/CategoryWeekly/index";
import SubCategoryMonthly from "./pages/SubCategoryMonthly/index";

// Prediction Pages
import PredictCatM from "./components/Prediction/CategoryMonthlyPrediction";
import PredictCatW from "./components/Prediction/CategoryWeeklyPrediction";
import PredictSubCatM from "./components/Prediction/SubCategoryMonthlyPrediction";
import PredictFuture from "./components/Prediction/CategoryFuturePrediction";

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
        <Route path="/learnmore" element={<Learnmore/>} />
        <Route path="/acknowledgement" element={<Acknowledgement />} /> {/* ✅ Added acknowledgement page */}
        {/* <Route path="/colab" element={<Colab/>} />   */}
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

      <Footer/>


    </Router>
  );
}

export default App;
