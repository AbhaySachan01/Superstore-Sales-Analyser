import arimaFuture from "../../../images/arima monthly.png"; 
const CategoryMonthlyPrediction = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Category Monthly Prediction</h2>
      <img
        src={arimaFuture}
        alt="Category Monthly"
        style={{
          maxWidth: "80%",
          borderRadius: "8px",
          display: "block",
          margin: "0 auto"
        }}
      />
    </div>
  );
};

export default CategoryMonthlyPrediction;
