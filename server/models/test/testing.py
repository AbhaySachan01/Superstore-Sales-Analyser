import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv("clean_superstore.csv", parse_dates=['Order Date'])

# Ensure data is sorted
df = df.sort_values(by="Order Date")

# Aggregate sales data (Example: Category-wise Monthly Sales)
df['Year-Month'] = df['Order Date'].dt.to_period('M')
sales_data = df.groupby('Year-Month')['Sales'].sum().to_timestamp()
