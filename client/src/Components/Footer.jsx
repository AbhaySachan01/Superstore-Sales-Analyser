import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-blue-600 dark:text-white mb-4">
            Sales Analyzer
          </h2>
          <p className="text-sm">
            A powerful dashboard for analyzing and predicting Superstore sales using ML & time series.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
            <li><Link to="/acknowledgement" className="hover:text-blue-600">Acknowledgement</Link></li>
          </ul>
        </div>

        {/* Analysis */}
        <div>
          <h3 className="font-semibold mb-3">Analysis</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/category-weekly" className="hover:text-blue-600">Category Weekly</Link></li>
            <li><Link to="/category-monthly" className="hover:text-blue-600">Category Monthly</Link></li>
            <li><Link to="/subcategory-monthly" className="hover:text-blue-600">SubCategory Monthly</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4 text-lg">
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Sales Analyzer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
