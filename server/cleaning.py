import pandas as pd

# Load dataset
df = pd.read_csv("data/superstore.csv", parse_dates=["Order Date", "Ship Date"])

# 🔹 1. Remove Duplicates
df.drop_duplicates(inplace=True)

# 🔹 2. Handle Missing Values
# Drop rows with missing essential values
df.dropna(subset=["Order ID", "Order Date", "Sales", "Profit"], inplace=True)

# Fill missing values in categorical columns with "Unknown"
categorical_cols = ["Category", "Sub-Category", "Segment", "Ship Mode", "Region"]
# Fill missing values in categorical columns
for col in categorical_cols:
    df[col] = df[col].fillna("Unknown")  # Removed inplace=True




# Fill missing numeric values with median (better than mean for outliers)
numeric_cols = ["Sales", "Profit", "Discount", "Quantity"]
for col in numeric_cols:
    df[col] = df[col].fillna(df[col].median())  
# 🔹 3. Fix Data Types
df["Order Date"] = pd.to_datetime(df["Order Date"])
df["Ship Date"] = pd.to_datetime(df["Ship Date"])
df["Year"] = df["Order Date"].dt.year  # Extract year for filtering

# 🔹 4. Remove Outliers (Sales & Profit Beyond 99th Percentile)
for col in ["Sales", "Profit"]:
    upper_limit = df[col].quantile(0.99)
    lower_limit = df[col].quantile(0.01)
    df = df[(df[col] >= lower_limit) & (df[col] <= upper_limit)]

# 🔹 5. Standardize Text Columns (Trim Spaces & Lowercase)
for col in categorical_cols:
    df[col] = df[col].str.strip().str.lower()

# 🔹 Save Cleaned Data
df.to_csv("data/clean_superstore.csv", index=False)

print("✅ Superstore data cleaned and saved as 'clean_superstore.csv'!")
