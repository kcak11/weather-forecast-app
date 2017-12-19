import axios from 'axios';

const API_KEY = '6bf924969a784be91dcd9199c1f109fd';
const ROOT_URL = `//api.openweathermap.org/data/2.5/forecast?units=imperial&appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city}`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
