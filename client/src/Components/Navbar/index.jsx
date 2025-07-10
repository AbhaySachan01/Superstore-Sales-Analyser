import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center text-center sm:justify-between sm:text-left gap-y-4 py-4">
          {/* Logo */}
          <div className="w-full sm:w-auto text-xl font-bold text-blue-600 dark:text-white">
            Sales Analyzer
          </div>

          {/* Navigation Links (Responsive & Centered) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:space-x-6">
            <ul className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-gray-800 dark:text-white font-medium">
              <li><Link to="/" className="hover:text-blue-600">Home</Link></li>

              {/* Dropdown: Analysis */}
              <li className="relative group">
                <span className="cursor-pointer hover:text-blue-600">Analysis</span>
                <ul className="absolute top-full left-0 z-10 hidden group-hover:block bg-white dark:bg-gray-800 border rounded shadow-md py-2 min-w-max">
                  <li>
                    <Link to="/category-weekly" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Category Weekly
                    </Link>
                  </li>
                  <li>
                    <Link to="/category-monthly" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Category Monthly
                    </Link>
                  </li>
                  <li>
                    <Link to="/subcategory-monthly" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      SubCategory Monthly
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Dropdown: Prediction */}
              <li className="relative group">
                <span className="cursor-pointer hover:text-blue-600">Prediction</span>
                <ul className="absolute top-full left-0 z-10 hidden group-hover:block bg-white dark:bg-gray-800 border rounded shadow-md py-2 min-w-max">
                  <li>
                    <Link to="/prediction/category-monthly" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Category Monthly
                    </Link>
                  </li>
                  <li>
                    <Link to="/prediction/category-weekly" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Category Weekly
                    </Link>
                  </li>
                  <li>
                    <Link to="/prediction/subcategory-monthly" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      SubCategory Monthly
                    </Link>
                  </li>

                  <li>
                    <Link to="/prediction/subcategory-weekly" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      SubCategory Weekly
                    </Link>
                  </li>

                  <li>
                    <Link to="/prediction/category-future" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Category Future
                    </Link>
                  </li>
                </ul>
              </li>

              <li><Link to="/colab" className="hover:text-blue-600">Forecasting Models</Link></li>
              <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link to="/acknowledgement" className="hover:text-blue-600">Acknowledgement</Link></li>
            </ul>

            {/* CTA Button */}
            <div>
              <Link
                to="/signup"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
