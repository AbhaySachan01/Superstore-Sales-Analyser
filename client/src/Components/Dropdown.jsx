import React from "react";
import styles from "./styles.module.css";

const Dropdown = ({ label, options, selected, onChange }) => {
  return (
    <div className={styles.dropdownContainer}>
      <label className={styles.label}>{label}:</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)} className={styles.select}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;