import {weatherClient, geoClient} from './config';



export const getWeather = async (params) => {
    const response = await weatherClient.get(`/forecast?latitude=${params.latitude}&longitude=${params.latitude}&current=${params.current.join('%2C')}&format=json`);
    return response.data;
}   

export const searchCity = async (search) => {
    const response = await geoClient.get(`/search?name=${search}`);
    return response.data?.results;
}   