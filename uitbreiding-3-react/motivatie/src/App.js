import React, { useState, useEffect } from "react";
import "./App.css";
const quotes = require("inspirational-quotes");

function App() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const newQuote = quotes.getQuote();
    setQuote(newQuote.text + " - " + newQuote.author);
  }, []);

  return (
    <div className="App">
      <div className="quote-box">
        <p>{quote}</p>
      </div>

      <button onClick={() => window.location.reload()}>
        Nieuwe motivatie
      </button>
    </div>
  );
}

export default App;