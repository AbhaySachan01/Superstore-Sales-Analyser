import React from "react";
import arimaFuture from "../../../images/arima future.png"; 

const CategoryFuturePrediction = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Category Future Prediction</h2>
      <img
        src={arimaFuture}
        alt="Future Prediction"
        style={{
          width: "80%",
          borderRadius: "8px",
          display: "block",
          margin: "0 auto"
        }}
      />
    </div>
  );
};

export default CategoryFuturePrediction;
