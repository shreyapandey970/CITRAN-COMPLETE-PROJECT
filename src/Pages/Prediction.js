import React from 'react';

const Prediction = ({ against_currency, next_day_prediction }) => {
  return (
    <div>
      <h1>Crypto Price Prediction</h1>
      <form method="post" action="/prediction">
        <label htmlFor="crypto_currency">Crypto Currency:</label>
        <input type="text" name="crypto_currency" required />
        
        <label htmlFor="against_currency">Against Currency:</label>
        <input type="text" name="against_currency" required />

        <label htmlFor="future_date">Future Prediction End Date (YYYY-MM-DD):</label>
        <input type="text" name="future_date" required />

        <button type="submit">Predict</button>
      </form>
      
      <img src="../static/prediction.png" alt="Prediction Plot" height="500" width="700" />
      <h3>Future Day Prediction:</h3>
      <p>{against_currency} {next_day_prediction}</p>
    </div>
  );
};

export default Prediction;
