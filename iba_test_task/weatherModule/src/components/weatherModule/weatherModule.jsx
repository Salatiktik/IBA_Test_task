import React from "react";
import { Select, MenuItem, Button , TextField, Card, Box, InputLabel, FormControl,Typography} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getWeather, searchCity } from "../../api/weatherApi";
import defaultPlacesData from "./defaultPlaces.json";
import { WeatherBlock } from "./weatherBlock";

const weatherModule = ()=>{
    const defaultPlaces = defaultPlacesData;
    const [isLoading, setIsLoading] = useState(false);
    const [searchLine, setSearchLine] = useState();
    const [currentPlace, setCurrentPlace] = useState();
    const [searchPlaces, setSearchPlaces] = useState([]);
    const [currentWeatherData, setCurrentWeatherData] = useState();

    useEffect(()=>{
        const getData = async ()=>{
            setIsLoading(true);
            setCurrentWeatherData(undefined);
            const result = await searchCity(searchLine);
            setSearchPlaces(result);
            setIsLoading(false);
        };

        if(searchLine){
            getData();
        }
        else{
            setSearchPlaces([]);
        }
    },[searchLine]);

    useEffect(()=>{
        setSearchPlaces([]);

        const getData = async ()=>{
            setIsLoading(true);
            const result = await getWeather(
                {
                    latitude: currentPlace.latitude,
                    longitude: currentPlace.longitude,
                    current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", , "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"]
                }
            );

            console.log(result)

            setCurrentWeatherData(result);
            setIsLoading(false);
        };

        if(currentPlace){
            getData();
        }

    },[currentPlace])

    return (
        <Card sx={{p:2, m:5, height:'30vh', alignItems:'start'}}>
            <Box sx={{display:'flex', flexDirection:'row'}}>
                <FormControl sx={{width:'20vw'}}>
                    <InputLabel id="select-label">Select place</InputLabel>
                    <Select labelId="select-label" label="Select place" sx={{display:'flex', mb:5, position:'sticky', top:0, zIndex:1, mb:0}} value={currentPlace?.id} onChange={(e)=>setCurrentPlace(defaultPlaces.find(place => place.id == e.target.value))}>
                        {
                            defaultPlaces && defaultPlaces.map(place=>
                                <MenuItem value={place.id}>{place.name},{place.country}</MenuItem>    
                            )
                        }                
                    </Select>
                </FormControl>
                <Typography sx={{display:'flex', alignSelf:'center', mx:5}} variant='h5'>
                    or
                </Typography>
                <Box sx={{display:'flex', flexDirection:'column',width:'20vw'}}>
                    <TextField label="Type a new one" sx={{display:'flex', mb:5, position:'sticky', top:0, zIndex:1, mb:0}} onChange={(e)=>setSearchLine(e.target.value)}>{searchLine}</TextField>
                    
                    <Box sx={{width:'20vw'}}>
                        <Card sx={{display:'flex', position:'absolute', flexDirection:'column', maxHeight:'20vh', overflowY:'scroll', width:'20vw'}}>
                            {
                                searchPlaces && searchPlaces.map(place =>
                                    <Button sx={{justifyContent:'start'}} onClick={()=>setCurrentPlace(place)}>{place.name},{place.country}</Button>   
                                )
                            }
                            {
                                !searchPlaces && searchLine && !isLoading && <Typography sx={{p:5, width:'fit-content'}}>No results</Typography>
                            }
                        </Card>
                    </Box>
                </Box>
            </Box>    
            <Typography sx={{py:5, width:'fit-content'}} hidden={!isLoading}>Loading...</Typography>
            {
                currentWeatherData && !isLoading && <WeatherBlock currentPlace={currentPlace} currentWeatherData={currentWeatherData}/>
            }
        </Card>
    )
}

export default weatherModule;
