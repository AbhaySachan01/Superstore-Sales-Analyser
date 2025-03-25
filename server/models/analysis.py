import pandas as pd
import json
import os
from flask import Flask, jsonify

app = Flask(__name__)

# Correct path setup
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
csv_path = os.path.join(BASE_DIR, "data", "clean_superstore.csv")

# Load dataset
df = pd.read_csv(csv_path)
df["Order Date"] = pd.to_datetime(df["Order Date"], errors="coerce")  # Handle date errors

# Function to get aggregated sales data
def get_sales_data(df, group_by, freq):
    valid_frequencies = {"weekly": "W-SUN", "monthly": "M"}
    if group_by not in df.columns or freq not in valid_frequencies:
        return []  # Ensure column & freq exist
    
    freq_code = valid_frequencies[freq]
    df_grouped = df.groupby([pd.Grouper(key="Order Date", freq=freq_code), group_by])["Sales"].sum().reset_index()
    df_grouped["Order Date"] = df_grouped["Order Date"].astype(str)  # Convert to string for JSON response
    return df_grouped.to_dict(orient="records")

# API Endpoints
@app.route('/analysis/category/weekly')
def category_weekly_sales():
    return jsonify(get_sales_data(df, "Category", "weekly"))

@app.route('/analysis/category/monthly')
def category_monthly_sales():
    return jsonify(get_sales_data(df, "Category", "monthly"))

@app.route('/analysis/subcategory/weekly')
def subcategory_weekly_sales():
    return jsonify(get_sales_data(df, "Sub-Category", "weekly"))

@app.route('/analysis/subcategory/monthly')
def subcategory_monthly_sales():
    return jsonify(get_sales_data(df, "Sub-Category", "monthly"))

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
