import React, { useState, useEffect } from "react";
import "./StockPriceTracker.css";

function StockPriceTracker() {
  const [selectedStock, setSelectedStock] = useState("");
  const [stocks, setStocks] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [flag, setflag] = useState(1);

  //fetching stock price on selecting a stock
  const userSelectStock = (e) => {
    setSelectedStock(e.target.value);
    // Fetch the price of the selected stock
    fetch(`https://spearmint-assignment.onrender.com/stocks/${e.target.value}`)
      .then((response) => response.json())
      .then((data) => setCurrentPrice(data.price))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // Fetch the list of predefined stocks from the backend
    fetch("https://spearmint-assignment.onrender.com/stocks")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setStocks(data);
      })
      .catch((error) => console.error(error));
  }, []);

  //fetching stock price on every minute
  useEffect(() => {
    // Polling mechanism to update stock prices every minute
    const updatePriceInterval = setInterval(
      () => {
        if (selectedStock) {
          // Fetch the price of the selected stock
          fetch(
            `https://spearmint-assignment.onrender.com/stocks/${selectedStock}`
          )
            .then((response) => response.json())
            .then((data) => setCurrentPrice(data.price))
            .catch((error) => console.error(error));
        }
      },

      60000
    ); // Update every minute

    return () => clearInterval(updatePriceInterval);
  }, [selectedStock]);

  return (
    <div>
      {" "}
      <div class="custom-select">
        <select onChange={(e) => userSelectStock(e)}>
          {" "}
          <option value="">Select a stock</option>{" "}
          {stocks.map((item) => (
            <option key={item._id} value={item._id}>
              {" "}
              {item.stock}
            </option>
          ))}
        </select>
      </div>{" "}
      {selectedStock && (
        <div>
          {" "}
          <h5>Price will change on every minute</h5>{" "}
          <h3>
            Current Price: <span className="price">{currentPrice}</span>
          </h3>{" "}
        </div>
      )}
    </div>
  );
}

export default StockPriceTracker;
