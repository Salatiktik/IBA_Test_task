import axios from 'axios';

export const WEATHER_URL = "https://api.open-meteo.com/v1";
export const GEO_URL = "https://geocoding-api.open-meteo.com/v1";

export const geoClient = axios.create({
    baseURL: GEO_URL,
});

export const weatherClient = axios.create({
    baseURL: WEATHER_URL,
});
