import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Sales Analyzer</div>
      <ul className={styles.navLinks}>
        <li><Link to="/">Home</Link></li>

        <li className={styles.dropdown}>
          <span className={styles.dropbtn}>Analysis</span>
          <div className={styles.dropdownContent}>
            <Link to="/category-weekly">Category Weekly Analysis</Link>
            <Link to="/category-monthly">Category Monthly Analysis</Link>
            <Link to="/subcategory-monthly">SubCategory Monthly Analysis</Link>
          </div>
        </li>

        <li className={styles.dropdown}>
          <span className={styles.dropbtn}>Prediction</span>
          <div className={styles.dropdownContent}>
            <Link to="/prediction/category-weekly">Category Weekly Prediction</Link>
            <Link to="/prediction/category-monthly">Category Monthly Prediction</Link>
            <Link to="/prediction/subcategory-monthly">SubCategory Monthly Prediction</Link>
            <Link to="/prediction/category-future">Category Future Prediction</Link> 
          </div>
        </li>
        <li><Link to="/colab">Forecasting Models</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/acknowledgement">Acknowledgement</Link></li>
      </ul>
      <Link to="/signup" className={styles.ctaButton}>Get Started</Link>
    </nav>
  );
};

export default Navbar;
