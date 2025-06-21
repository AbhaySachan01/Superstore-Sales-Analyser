from flask import Flask, jsonify
import os
import pandas as pd

app = Flask(__name__)

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HISTORICAL_RESULTS = os.path.join(BASE_DIR, "../historical_results")


def load_pivoted_csv(file_path, index_name):
    """Load pivoted CSV and transform it into list of dictionaries"""
    try:
        df = pd.read_csv(file_path, index_col=0)  # Read CSV (Index is Year-Month or Year-Week)
        df.reset_index(inplace=True)  # Convert index back to column
        df.rename(columns={df.columns[0]: index_name}, inplace=True)  # Rename index column
        return df.to_dict(orient="records")  # Convert DataFrame to List of Dicts
    except Exception as e:
        return {"error": str(e)}


@app.route("/api/historical/category_monthly_sales")
def get_category_monthly_sales():
    return jsonify(load_pivoted_csv(os.path.join(HISTORICAL_RESULTS, "category_monthly_sales.csv"), "Year-Month"))


@app.route("/api/historical/category_weekly_sales")
def get_category_weekly_sales():
    return jsonify(load_pivoted_csv(os.path.join(HISTORICAL_RESULTS, "category_weekly_sales.csv"), "Year-Week"))


@app.route("/api/historical/subcategory_monthly_sales")
def get_subcategory_monthly_sales():
    return jsonify(load_pivoted_csv(os.path.join(HISTORICAL_RESULTS, "subcategory_monthly_sales.csv"), "Year-Month"))


@app.route("/api/historical/subcategory_weekly_sales")
def get_subcategory_weekly_sales():
    return jsonify(load_pivoted_csv(os.path.join(HISTORICAL_RESULTS, "subcategory_weekly_sales.csv"), "Year-Week"))


@app.route("/api/historical/profit_weekly")
def get_profit_weekly():
    return jsonify(load_pivoted_csv(os.path.join(HISTORICAL_RESULTS, "profit_weekly.csv"), "Year-Week"))


if __name__ == "__main__":
    app.run(debug=True)
