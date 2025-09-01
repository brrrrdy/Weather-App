export async function fetchWeather(location, unit = "metric") {
  const apiKey = "8555YH3DY6LV8QKF946NYKN7J";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    location
  )}?key=${apiKey}&unitGroup=${unit}&include=current`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (data?.error) {
    throw new Error(data.error.message || "API returned an error.");
  }

  // Log the API response for debugging precipitation data
  console.log("Weather API Response:", data);
  if (data.currentConditions) {
    console.log("Current conditions:", data.currentConditions);
    console.log("Precipitation data:", {
      precipprob: data.currentConditions.precipprob,
      pop: data.currentConditions.pop,
      precip: data.currentConditions.precip,
    });
  }

  return data;
}
