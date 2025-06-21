import React from "react";
import "./style.css"; // ✅ Normal CSS import

const models = [
  {
    title: "Monthly ARIMA",
    description: "ARIMA model applied on monthly sales data. Good accuracy.",
    link: "https://colab.research.google.com/drive/1sXGMsnsWEYQpgwdc6FeYV0l3iCefCliG",
  },
  {
    title: "Weekly ARIMA",
    description: "ARIMA model applied on weekly sales data. Accuracy is comparatively lower.",
    link: "https://colab.research.google.com/drive/1ML5F80SrZj020PZEmN4MiQF7s_V0aq66",
  },
  {
    title: "Weekly SARIMA",
    description: "SARIMA model applied on weekly sales data. Achieved better accuracy.",
    link: "https://colab.research.google.com/drive/10jsz81EygRIodL7tWF6e_SRDZHNCOZ0P",
  },
  {
    title: "LSTM",
    description: "LSTM model applied on monthly sales data. Achieved better accuracy.",
    link: "https://colab.research.google.com/drive/1vXl6tT_bb2mgB5qBKTDedViA0HEJz0CR",
  },
];

const Colab = () => {
  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Sales Forecasting Models</h1>
      <div className="cardsGrid">
        {models.map((model, index) => (
          <div key={index} className="card">
            <h2 className="modelTitle">{model.title}</h2>
            <p className="modelDescription">{model.description}</p>
            <button
              onClick={() => window.open(model.link, "_blank")}
              className="openButton"
            >
              Open Notebook
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colab;
