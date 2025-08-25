export async function fetchWeather(location) {
  const apiKey = "8555YH3DY6LV8QKF946NYKN7J";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    location
  )}?key=${apiKey}&unitGroup=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  // Visual Crossing sometimes returns an {error: { ... }} shape; guard for it
  if (data?.error) {
    throw new Error(data.error.message || "API returned an error.");
  }
  return data;
}
