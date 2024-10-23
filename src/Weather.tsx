import React, { useState } from 'react';

// Functional component for the Weather Dashboard
const Weather = () => {
  // State variables
  const [city, setCity] = useState<string>(''); // To store the user's input for the city
  const [forecastData, setForecastData] = useState<any | null>(null); // To store the API response data (weather info)
  const [loading, setLoading] = useState<boolean>(false); // To indicate if the data is being fetched
  const [error, setError] = useState<string | null>(null); // To store any error messages

  const apiKey = '4f67872133c0ff12e5bf3b6ce49bd9b0'; // Your API key for OpenWeatherMap

  // Part 1: Function for handling input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value); // Update the 'city' state with the user's input from the text field
  };

  // Part 2: Async function to search for weather data
  const handleSearch = async () => {
    // Check if the city input is empty
    if (!city) {
      setError('Please enter a city name'); // Set an error message if no city is entered
      return; // Exit the function if there is no city
    }

    setLoading(true); // Start the loading process
    setError(null); // Clear any previous error messages
    setForecastData(null); // Clear any previously fetched weather data

    try {
      // Fetch weather data from OpenWeatherMap API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      // Check if the response is not okay (e.g., city not found)
      if (!response.ok) {
        throw new Error('City not found'); // Throw an error if the city is not found
      }

      // Parse the JSON response to get weather data
      const data = await response.json();
      setForecastData(data); // Update state with the fetched weather data
    } catch (e: any) {
      setError(e.message); // If an error occurs, update the error state with the error message
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>

      {/* Input field for the user to enter a city name */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city} // Bind input value to city state
        onChange={handleInputChange} // Call handleInputChange on input change
      />
      {/* Button to trigger the search for weather data */}
      <button onClick={handleSearch}>Search</button>

      {/* Show loading text while fetching data */}
      {loading && <p>Loading...</p>}
      {/* Show error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the weather data if available */}
      {forecastData && (
        <div>
          <h2>Weather in {forecastData.name}</h2>
          <p>Temperature: {forecastData.main.temp}°C</p>
          <p>Condition: {forecastData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather; // Export the Weather component for use in other parts of the application
