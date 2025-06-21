import os
import pandas as pd
import warnings
from statsmodels.tsa.arima.model import ARIMA

warnings.filterwarnings("ignore")

# Correct path setup
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Moves up from models/
CSV_PATH = os.path.join(BASE_DIR, "data", "clean_superstore.csv")  # Path to dataset
RESULTS_DIR = os.path.join(BASE_DIR, "models", "forecast_results")  # Save predictions here

# Ensure forecast directory exists
os.makedirs(RESULTS_DIR, exist_ok=True)

# Load dataset
def load_data():
    df = pd.read_csv(CSV_PATH)
    df["Order Date"] = pd.to_datetime(df["Order Date"])
    return df


def aggregate_sales(df, group_by, time_period):
    df = df.copy()  # Avoid modifying original DataFrame
    df["Order Date"] = pd.to_datetime(df["Order Date"])  # Ensure it's datetime
    df["Order Date"] = df["Order Date"].dt.to_period("W" if time_period == "weekly" else "M")  # Convert to Period
    return df.groupby(["Order Date", group_by])["Sales"].sum().unstack(fill_value=0)

# Train ARIMA model and predict future sales
def train_arima_and_predict(df, periods=12):

    predictions = {}
    
    for col in df.columns:
        train = df.iloc[:-periods][col]
        model = ARIMA(train, order=(16,2,5))  # (p,d,q) can be tuned
        model_fit = model.fit()
        
        forecast = model_fit.forecast(steps=periods)
        predictions[col] = forecast
    
    return pd.DataFrame(predictions, index=df.index[-periods:])

# Save predictions to CSV
def save_forecast(df, filename):
    df.to_csv(os.path.join(RESULTS_DIR, filename))

# Main function to run predictions
def main():
    df = load_data()

    # Category-wise Predictions
    # cat_weekly = aggregate_sales(df, "Category", "weekly")
    cat_monthly = aggregate_sales(df, "Category", "monthly")
    # save_forecast(train_arima_and_predict(cat_weekly), "category_weekly_sales.csv")
    save_forecast(train_arima_and_predict(cat_monthly), "category_monthly_sales.csv")

    # Subcategory-wise Predictions
    # subcat_weekly = aggregate_sales(df, "Sub-Category", "weekly")
    # subcat_monthly = aggregate_sales(df, "Sub-Category", "monthly")
    # save_forecast(train_arima_and_predict(subcat_weekly), "subcategory_weekly_sales.csv")
    # save_forecast(train_arima_and_predict(subcat_monthly), "subcategory_monthly_sales.csv")

    # Profit Weekly Prediction
    df_profit = df.groupby(df["Order Date"].dt.to_period("W"))["Profit"].sum().to_frame()
    save_forecast(train_arima_and_predict(df_profit, periods=52), "profit_weekly.csv")

    print("Predictions saved successfully!")

if __name__ == "__main__":
    main()
