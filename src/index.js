//TECH IMPORTS 
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
//COMPONENT IMPORTS
import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
//STYLING IMPORTS
import "./styles.scss";
//BEGIN CODE


//START localStorage Hook

const useLocalStorage = (key, initialValue) => {

  const [storedValue, setStoredValue]=useState(()=>{
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : localStorage.setItem(key, JSON.stringify(initialValue))
  })

  const setValue = (value) => {
    
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));

  }
  
  return [storedValue, setValue];

}

//END localStorage Hook

//START DARK MODE HOOK

const useDarkMode = () => {

  const [siteStyle, setSiteStyle] = useLocalStorage("siteStyle", false)

  return [siteStyle, setSiteStyle];
}


//END DARK MODE HOOK

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useDarkMode("siteStyle", false);



  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
