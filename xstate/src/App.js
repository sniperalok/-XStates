import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries on first render
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // When a country is selected
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);

    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error("Error fetching states:", err));
  };

  // When a state is selected
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);

    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Error fetching cities:", err));
  };

  // When a city is selected
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="app">
      <h1>Select Location</h1>
      <div className="dropdown-container">
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* ✅ Display selected location */}
      {selectedCountry && selectedState && selectedCity && (
        <p className="selected-location">
  You selected <strong>{selectedCity}</strong>,{" "}
  <span className="location-details">{selectedState}, {selectedCountry}</span>
</p>

      )}
    </div>
  );
}

export default App;
