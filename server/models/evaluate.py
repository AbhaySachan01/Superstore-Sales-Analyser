import pandas as pd
import os

# Load superstore data
df = pd.read_csv("data/clean_superstore.csv", parse_dates=["Order Date"])

# Filter for 2022
df = df[df["Order Date"].dt.year == 2022]

# Ensure historical_results directory exists
os.makedirs("historical_results", exist_ok=True)

# Extract Year-Month and Year-Week
df["Year-Month"] = df["Order Date"].dt.to_period("M").astype(str)
df["Year-Week"] = df["Order Date"].dt.to_period("W").astype(str)

# 🔹 Category-wise Monthly Sales (Pivoted Format)
category_monthly_sales = df.groupby(["Year-Month", "Category"])["Sales"].sum().unstack()
category_monthly_sales.to_csv("historical_results/category_monthly_sales.csv")

# 🔹 Category-wise Weekly Sales (Pivoted Format)
category_weekly_sales = df.groupby(["Year-Week", "Category"])["Sales"].sum().unstack()
category_weekly_sales.to_csv("historical_results/category_weekly_sales.csv")

# 🔹 Subcategory-wise Monthly Sales (Pivoted Format)
subcategory_monthly_sales = df.groupby(["Year-Month", "Sub-Category"])["Sales"].sum().unstack()
subcategory_monthly_sales.to_csv("historical_results/subcategory_monthly_sales.csv")

# 🔹 Subcategory-wise Weekly Sales (Pivoted Format)
subcategory_weekly_sales = df.groupby(["Year-Week", "Sub-Category"])["Sales"].sum().unstack()
subcategory_weekly_sales.to_csv("historical_results/subcategory_weekly_sales.csv")

# 🔹 Profit Weekly (Pivoted Format)
profit_weekly = df.groupby(["Year-Week"])["Profit"].sum()
profit_weekly.to_csv("historical_results/profit_weekly.csv", header=["Profit"])

print("✅ 2022 Historical data saved successfully in historical_results/")
