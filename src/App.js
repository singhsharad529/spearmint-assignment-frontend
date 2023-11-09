import logo from "./logo.svg";
import "./App.css";
import StockPriceTracker from "./Components/StockPriceTracker";

function App() {
  return (
    <div className="App">
      <h3>Welcome to Stock Tracking App</h3>
      <StockPriceTracker />
    </div>
  );
}

export default App;
