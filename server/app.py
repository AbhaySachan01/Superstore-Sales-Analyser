import os
import pandas as pd
import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# CSV Data Path
CSV_PATH = os.path.join(BASE_DIR, "data", "clean_superstore.csv")


HISTORICAL_RESULTS = os.path.join(BASE_DIR, "historical_results")
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
    

def load_pivoted_csv(file_path, index_name):
    """Load pivoted CSV and transform it into list of dictionaries"""
    try:
        df = pd.read_csv(file_path, index_col=0)  # Read CSV (Index is Year-Month or Year-Week)
        df.reset_index(inplace=True)  # Convert index back to column
        df.rename(columns={df.columns[0]: index_name}, inplace=True)  # Rename index column
        return df.to_dict(orient="records")  # Convert DataFrame to List of Dicts
    except Exception as e:
        return {"error": str(e)}
    

@app.route('/analysis/category/weekly')
def category_weekly_sales():
    data = get_sales_data(df, "Category", "W")
    #print("Category Weekly Sales:", data)  # Debugging
    return jsonify(data)


@app.route('/analysis/category/monthly')
def category_monthly_sales():
    data = get_sales_data(df, "Category", "M")
    #print("Category Monthly Sales:", data)  # Debugging
    return jsonify(data)


@app.route('/analysis/subcategory/weekly')
def subcategory_weekly_sales():
    data = get_sales_data(df, "Sub-Category", "W")
    #print("Subcategory Weekly Sales:", data)  # Debugging
    return jsonify(data)


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


# Historical Sales
@app.route("/historical/category/monthly")
def get_category_monthly_sales():
    return jsonify(load_pivoted_csv(os.path.join(HISTORICAL_RESULTS, "category_monthly_sales.csv"), "Year-Month"))


@app.route("/historical/category/weekly")
def get_category_weekly_sales():
    return jsonify(load_pivoted_csv(os.path.join(HISTORICAL_RESULTS, "category_weekly_sales.csv"), "Year-Week"))


@app.route("/historical/subcategory/monthly/")
def get_subcategory_monthly_sales():
    return jsonify(load_pivoted_csv(os.path.join(HISTORICAL_RESULTS, "subcategory_monthly_sales.csv"), "Year-Month"))


@app.route("/historical/subcategory/weekly")
def get_subcategory_weekly_sales():
    return jsonify(load_pivoted_csv(os.path.join(HISTORICAL_RESULTS, "subcategory_weekly_sales.csv"), "Year-Week"))


@app.route("/historical/profit/weekly")
def get_profit_weekly():
    return jsonify(load_pivoted_csv(os.path.join(HISTORICAL_RESULTS, "profit_weekly.csv"), "Year-Week"))


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)