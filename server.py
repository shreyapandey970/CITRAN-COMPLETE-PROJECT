from flask import Flask, render_template, request, url_for, redirect
import numpy as np
import pandas as pd
import yfinance as yf
import datetime as dt
from sklearn.preprocessing import MinMaxScaler
from keras.layers import Dense, Dropout, LSTM
from keras.models import Sequential
import matplotlib.pyplot as plt


app = Flask(__name__)

@app.route('/prediction', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        crypto_currency = request.form['crypto_currency']
        against_currency = request.form['against_currency']
        future_date_input = request.form['future_date']

        data, prediction_prices, extended_dates, extended_predictions, next_day_prediction = predict_prices(
            crypto_currency, against_currency, future_date_input
        )

        return render_template(
            'index.html',
            data=data,
            against_currency = against_currency,
            prediction_prices=prediction_prices,
            extended_dates=extended_dates,
            extended_predictions=extended_predictions,
            next_day_prediction=next_day_prediction,
            crypto_currency=crypto_currency,
        )

    return render_template('index.html')

def predict_prices(crypto_currency, against_currency, future_date_input):
    start = dt.datetime(2023, 1, 1)
    end = dt.datetime.now()

    # Getting actual data using yfinance
    data = yf.download(f'{crypto_currency}-{against_currency}', start=start, end=end)

    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data['Close'].values.reshape(-1, 1))

    prediction_days = 60

    x_train, y_train = [], []
    for x in range(prediction_days, len(scaled_data)):
        x_train.append(scaled_data[x - prediction_days:x, 0])
        y_train.append(scaled_data[x, 0])

    x_train, y_train = np.array(x_train), np.array(y_train)
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50, return_sequences=True))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50))
    model.add(Dropout(0.2))
    model.add(Dense(units=1))

    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(x_train, y_train, epochs=25, batch_size=32)

    test_start = dt.datetime(2023, 1, 1)
    test_end = dt.datetime.now()

    test_data = yf.download(f'{crypto_currency}-{against_currency}', test_start, test_end)

    total_dataset = pd.concat((data['Close'], test_data['Close']), axis=0)

    model_inputs = total_dataset[len(total_dataset) - len(test_data) - prediction_days:].values
    model_inputs = model_inputs.reshape(-1, 1)
    model_inputs = scaler.fit_transform(model_inputs)

    x_test = []
    for x in range(prediction_days, len(model_inputs)):
        x_test.append(model_inputs[x - prediction_days:x, 0])

    x_test = np.array(x_test)
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

    prediction_prices = model.predict(x_test)
    prediction_prices = scaler.inverse_transform(prediction_prices)

    future_date = dt.datetime.strptime(future_date_input, "%Y-%m-%d")
    extended_dates = pd.date_range(start=data.index[-1], end=future_date_input)

    extended_inputs = scaled_data[-prediction_days:]
    extended_predictions = []

    for _ in range(len(extended_dates)):
        x_extended = np.array(extended_inputs[-prediction_days:])
        x_extended = x_extended.reshape((1, x_extended.shape[0], 1))
        prediction = model.predict(x_extended)
        extended_inputs = np.append(extended_inputs, prediction[0])
        extended_predictions.append(prediction[0])

    extended_predictions = scaler.inverse_transform(np.array(extended_predictions).reshape(-1, 1))

    plt.plot(data.index, data['Close'], label='Actual Prices')
    plt.plot(data.index[-len(test_data):], prediction_prices, label='Predicted Prices', color='green')
    plt.plot(extended_dates, extended_predictions, label='Future Predicted Prices', linestyle='dashed', color='orange')
    plt.title(f'{crypto_currency} price prediction')
    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.legend()
    plt.savefig('static/prediction.png')
    #plt.show()
    

    x_test_next_day = model_inputs[-prediction_days:]
    x_test_next_day = np.array(x_test_next_day)
    x_test_next_day = np.reshape(x_test_next_day, (1, x_test_next_day.shape[0], 1))

    real_data = model_inputs[len(model_inputs) - prediction_days:]
    real_data = np.array(real_data)
    real_data = np.reshape(real_data, (1, real_data.shape[0], 1))

    next_day_prediction = model.predict(x_test_next_day)
    next_day_prediction = scaler.inverse_transform(next_day_prediction)

    return data, prediction_prices, extended_dates, extended_predictions, next_day_prediction




























def calculate_strategy(dates, closing_prices):
    data = {'Date': dates, 'Close': closing_prices}
    df = pd.DataFrame(data)
    df['Date'] = pd.to_datetime(df['Date'])
    df['SMA'] = df['Close'].rolling(window=3).mean()
    df['Signal'] = 0
    df.loc[df['Close'] > df['SMA'], 'Signal'] = 1
    df.loc[df['Close'] < df['SMA'], 'Signal'] = -1
    df['Daily_Return'] = df['Close'].pct_change()
    df['Strategy_Return'] = df['Signal'].shift(1) * df['Daily_Return']
    return df

@app.route('/buysell', methods=['GET', 'POST'])
def buysell():
    if request.method == 'POST':
        num_inputs = int(request.form['num_inputs'])
        return redirect(url_for('process_data', num_inputs=num_inputs))
    
    return render_template('buysell.html')

@app.route('/process/<int:num_inputs>', methods=['GET', 'POST'])
def process_data(num_inputs):
    if request.method == 'POST':
        dates = []
        closing_prices = []
        
        for i in range(num_inputs):
            date_input = request.form.get(f"date_{i}")
            closing_price_input = float(request.form.get(f"closing_price_{i}", 0))  # default value of 0 if not present
            dates.append(date_input)
            closing_prices.append(closing_price_input)
        
        try:
            df = calculate_strategy(dates, closing_prices)
            
            # Plotting logic remains the same...
            plt.figure(figsize=(10, 6))
            plt.plot(df['Date'], df['Close'], label='Close Prices', linewidth=2)
            plt.plot(df['Date'], df['SMA'], label='Simple Moving Average (SMA)', linestyle='dashed', linewidth=2)
            plt.plot(df.loc[df['Signal'] == 1, 'Date'], df.loc[df['Signal'] == 1, 'Close'], '^', markersize=10, color='g', label='Buy Signal')
            plt.plot(df.loc[df['Signal'] == -1, 'Date'], df.loc[df['Signal'] == -1, 'Close'], 'v', markersize=10, color='r', label='Sell Signal')
            plt.title('Simple Moving Average Strategy')
            plt.xlabel('Date')
            plt.ylabel('Prices')
            plt.legend()
            plt.savefig('static/buysell.png')

            total_strategy_return = df['Strategy_Return'].sum()

            # Redirect to the 'result' route
            return redirect(url_for('result'))
        
        except Exception as e:
            return f"An error occurred: {e}"
    
    return render_template('input_form.html', num_inputs=num_inputs)

@app.route('/result', methods=['GET'])
def result():
   
    return render_template('result.html')



if __name__ == '__main__':
    app.run(debug=True)
