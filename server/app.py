import os
import pandas as pd
import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Correct path setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
CSV_PATH = os.path.join(BASE_DIR, "data", "clean_superstore.csv")
FORECAST_DIR = os.path.join(BASE_DIR, "models", "forecast_results")

# Load dataset (Ensure correct path)
df = pd.read_csv("data/superstore.csv")  # Adjust path if needed

# Ensure Order Date is in datetime format
df["Order Date"] = pd.to_datetime(df["Order Date"], errors="coerce")

# Remove NaT (Invalid dates)
df = df.dropna(subset=["Order Date"])

# Function to get aggregated sales data
def get_sales_data(df, group_by, freq):
    df_grouped = df.groupby([pd.Grouper(key="Order Date", freq=freq), group_by])["Sales"].sum().reset_index()
    df_grouped["Order Date"] = df_grouped["Order Date"].astype(str)  # Convert for JSON response
    return df_grouped.to_dict(orient="records")

def load_forecast(filename):
    file_path = os.path.join(FORECAST_DIR, filename)
    if os.path.exists(file_path):
        df_pred = pd.read_csv(file_path)
        return df_pred.to_dict(orient="records")
    else:
        return {"error": "Prediction file not found"}
# API: Category-wise Weekly Sales
@app.route('/analysis/category/weekly')
def category_weekly_sales():
    data = get_sales_data(df, "Category", "W")
    #print("Category Weekly Sales:", data)  # Debugging
    return jsonify(data)

# API: Category-wise Monthly Sales
@app.route('/analysis/category/monthly')
def category_monthly_sales():
    data = get_sales_data(df, "Category", "M")
    #print("Category Monthly Sales:", data)  # Debugging
    return jsonify(data)

# API: Subcategory-wise Weekly Sales
@app.route('/analysis/subcategory/weekly')
def subcategory_weekly_sales():
    data = get_sales_data(df, "Sub-Category", "W")
    #print("Subcategory Weekly Sales:", data)  # Debugging
    return jsonify(data)

# API: Subcategory-wise Monthly Sales
@app.route('/analysis/subcategory/monthly')
def subcategory_monthly_sales():
    data = get_sales_data(df, "Sub-Category", "M")
    #print("Subcategory Monthly Sales:", data)  # Debugging
    return jsonify(data)

# 🔵 PREDICTION ROUTES
@app.route('/prediction/category/weekly')
def category_weekly_prediction():
    return jsonify(load_forecast("category_weekly_sales.csv"))

@app.route('/prediction/category/monthly')
def category_monthly_prediction():
    return jsonify(load_forecast("category_monthly_sales.csv"))

@app.route('/prediction/subcategory/weekly')
def subcategory_weekly_prediction():
    return jsonify(load_forecast("subcategory_weekly_sales.csv"))

@app.route('/prediction/subcategory/monthly')
def subcategory_monthly_prediction():
    return jsonify(load_forecast("subcategory_monthly_sales.csv"))

@app.route('/prediction/profit/weekly')
def profit_weekly_prediction():
    return jsonify(load_forecast("profit_weekly.csv"))

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)