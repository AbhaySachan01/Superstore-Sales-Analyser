import { Link } from "react-router-dom";
import imgSrc from "../../assets/IMG.jpg";

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-10 py-16">
        
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Grow Your Business With Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            We help businesses scale with strategic solutions and insights.
          </p>
          <Link
            to="/learnmore"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300"
          >
            Learn More →
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={imgSrc}
            alt="Sales Analyzer"
            className="w-full max-w-md md:max-w-lg rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
