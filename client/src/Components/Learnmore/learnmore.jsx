import React from 'react';
import './style.css';

const Learnmore = () => {
  return (
    <div className="summary-container">
      <h1 className="summary-title">Superstore Sales Analyzer</h1>
      
      <p className="summary-intro">
        The <strong>Superstore Sales Analyzer</strong> is a comprehensive AI/ML project designed to analyze historical sales data,
        extract meaningful patterns, and predict future sales trends using advanced Machine Learning models.
      </p>

      <div className="section">
        <h2 className="section-title">Data Cleaning</h2>
        <p className="section-text">
          The raw Superstore dataset underwent thorough data cleaning processes including
          handling missing values, removing duplicates, correcting inconsistent data entries,
          and ensuring overall data quality to prepare for accurate analysis.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Data Preprocessing</h2>
        <p className="section-text">
          Preprocessing steps such as feature selection, normalization, encoding categorical variables,
          and time-series formatting were implemented to enhance the model's performance and reliability.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Modeling Techniques</h2>
        <ul className="model-list">
          <li><strong>ARIMA (AutoRegressive Integrated Moving Average):</strong> ARIMA is a statistical model used for time-series forecasting. It combines three components: AutoRegressive (AR), Integrated (I), and Moving Average (MA). ARIMA is effective for forecasting short-term sales trends by analyzing historical sales data.
          <br></br>
          <i>For more information visit: <a href="https://www.geeksforgeeks.org/python-arima-model-for-time-series-forecasting/" target="_blank">Arima</a></i>

          </li>
          <li><strong>SARIMA (Seasonal ARIMA):</strong> SARIMA is an extension of ARIMA that incorporates seasonality into time-series forecasting. It adds seasonal components to the model, making it suitable for predicting sales during seasonal cycles such as holidays or yearly events.
          <br></br><i>For more information visit: <a href="https://www.geeksforgeeks.org/sarima-seasonal-autoregressive-integrated-moving-average/" target="_blank">Sarima</a></i></li>
          <li><strong>LSTM (Long Short-Term Memory Networks):</strong> LSTM is a type of Recurrent Neural Network (RNN) designed to capture long-term dependencies in sequential data. Unlike traditional RNNs, LSTM can remember information for long periods, making it highly effective for predicting future sales based on historical data with complex patterns, trends, and seasonality.
          <br></br><i>For more information visit: <a href="https://www.geeksforgeeks.org/deep-learning-introduction-to-long-short-term-memory/" target="_blank">LSTM</a></i></li>
        </ul>
      </div>

      <p className="summary-outro">
        Through the combined use of statistical and deep learning techniques, the Superstore Sales Analyzer offers
        detailed insights and reliable predictions, empowering businesses to make smarter decisions and optimize their sales strategies.
      </p>
    </div>
  );
};

export default Learnmore;
