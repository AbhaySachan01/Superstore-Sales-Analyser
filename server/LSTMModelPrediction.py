import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model

# Load the saved model once when the module is imported
model = load_model("lstm_sales_model.h5")

# Prediction function
def predict_sales_from_file(file_path, window_size=12):
    # Load and preprocess the data
    df = pd.read_csv(file_path, parse_dates=['Order Date'])
    df = df.sort_values('Order Date')
    df = df.groupby('Order Date')['Sales'].sum().reset_index()
    df.set_index('Order Date', inplace=True)
    df = df.resample('ME').sum()

    # Normalize
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(df)

    # Create sequences
    X, y = [], []
    for i in range(len(scaled_data) - window_size):
        X.append(scaled_data[i:i + window_size])
        y.append(scaled_data[i + window_size])
    X = np.array(X)
    y = np.array(y)

    if len(X) == 0:
        raise ValueError("Not enough data for the given window size.")

    # Reshape input for LSTM
    X = X.reshape((X.shape[0], X.shape[1], 1))

    # Predict
    y_pred = model.predict(X)

    # Rescale back to original
    y_pred_rescaled = scaler.inverse_transform(y_pred)
    y_true_rescaled = scaler.inverse_transform(y)

    return y_true_rescaled, y_pred_rescaled
