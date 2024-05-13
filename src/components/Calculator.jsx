import { useState, useEffect } from "react";
import "./selectStyles.js";
import Select from "react-select";
import options from "../options/options-data";
import colourStyles from "./selectStyles.js";

const Converter = () => {
  const [amount, setAmount] = useState();
  const [result, setResult] = useState();
  const [first, setFirst] = useState("BTC");
  const [second, setSecond] = useState("USDT");
  const [rates, setRates] = useState(null);

  useEffect(() => {
    fetch("https://api.lemoncash.io/api/v1/exchange-rates-quotations-external")
      .then((response) => response.json())
      .then((data) => {
        setRates(data.results);
      });
    if (amount < 0) return setAmount(0);
  }, [amount]);

  useEffect(() => {
    if (rates) {
      const filterConvert = rates.filter((item) => {
        return item.instrument === `${first}-${second}`;
      });
      setResult(filterConvert);
    }
  }, [rates, first, second]);

  const handleTypeChangeFirst = (selectedOption) => {
    if (selectedOption.value === second) {
      // Intercambiar las opciones
      setSecond(first);
      setFirst(selectedOption.value);
    } else {
      setFirst(selectedOption.value);
    }
    if (selectedOption.value !== second) {
      setFirst(selectedOption.value);
    }
  };

  const handleTypeChangeSecond = (selectedOption) => {
    if (selectedOption.value === first) {
      // Intercambiar las opciones
      setFirst(second);
      setSecond(selectedOption.value);
    } else {
      setSecond(selectedOption.value);
    }
    if (selectedOption.value !== first) {
      setSecond(selectedOption.value);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  function calculateConversion(amount, firstCurrency, secondCurrency, rates) {
    if (first === "USDT" && second === "SAT") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-USDT";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount / (salePrice / 100000000)).toFixed(2);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">$${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }

    if (first === "USDT" && second === "BTC") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-USDT";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount / salePrice).toFixed(7);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">$${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }

    if (first === "SAT" && second === "USDT") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-USDT";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount * (salePrice / 100000000)).toFixed(7);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">$${calculatedAmount} ${second}</span>`;
    }

    if (first === "ARS" && second === "USDT") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "USDT-ARS";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount / salePrice).toFixed(8);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">$${calculatedAmount} ${second}</span>`;
    }
    if (first === "SAT" && second === "BTC") {
      const calculatedAmount = (amount / 100000000).toFixed(8);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }
    if (first === "ARS" && second === "BTC") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-ARS";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount / salePrice).toFixed(8);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">$${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }

    if (first === "SAT" && second === "ARS") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-ARS";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount * (salePrice / 100000000)).toFixed(2);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">$${calculatedAmount} ${second}</span>`;
    }

    if (first === "ARS" && second === "SAT") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-ARS";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = ((amount / salePrice) * 100000000).toFixed(2);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">$${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }

    if (first === "BTC" && second === "SAT") {
      const calculatedAmount = (amount * 100000000).toFixed(0);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }
    if (result.length > 0) {
      const calculatedAmount = (amount * result[0].sale_price.amount).toFixed(
        2
      );
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }
  }

  const handleSubmit = () => {
    const calculatedAmount = calculateConversion(amount, first, second, rates);
    return calculatedAmount;
  };

  const formatOptionLabel = ({ label, image }) => (
    <div
      style={{ display: "flex", alignItems: "center", borderRadius: "100px" }}>
      <img
        src={image.src}
        width="30px"
        style={{ marginRight: "10px" }}
        alt={label}
      />
      {label}
    </div>
  );

  return (
    <div className="container">
      <input
        type="number"
        id="amountInput"
        className="input"
        placeholder="Ingresa un valor"
        value={amount}
        onChange={handleAmountChange}
      />
      <Select
        value={options.find((option) => option.value === first)}
        onChange={handleTypeChangeFirst}
        isSearchable={false}
        formatOptionLabel={formatOptionLabel}
        options={options}
        styles={colourStyles}
      />
      <Select
        value={options.find((option) => option.value === second)}
        onChange={handleTypeChangeSecond}
        isSearchable={false}
        formatOptionLabel={formatOptionLabel}
        options={options}
        styles={colourStyles}
      />
      <button className="button" onClick={() => handleSubmit()}>
        Convertir
      </button>
      <div id="calculated" />
    </div>
  );
};

export default Converter;
