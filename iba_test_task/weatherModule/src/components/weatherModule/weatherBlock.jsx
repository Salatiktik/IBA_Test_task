import React from "react";
import { Card,Typography} from "@mui/material";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

export const WeatherBlock = ({currentWeatherData, currentPlace})=>{
    return(
        <Card sx={{p:3, flexDirection:'column', alignItems:'start', display:'flex'}}>
            <Typography variant="h3">{currentPlace.name},{currentPlace.country}</Typography>
            <Typography variant="h5">{currentWeatherData.current?.apparent_temperature}{currentWeatherData.current_units?.apparent_temperature}</Typography>
            <Typography sx={{alignItems:'center', display:'flex'}}>
                {new Date(currentWeatherData.current.time).toUTCString()}
                {
                    currentWeatherData.is_day?
                        <LightModeIcon sx={{m:2}}/>
                    :
                        <ModeNightIcon sx={{m:2}}/>
                }
            </Typography>
            {
                currentWeatherData.precipitation?
                    <Typography sx={{alignItems:'center', display:'flex'}}>
                        {
                            currentWeatherData.showers?
                                <ThunderstormIcon sx={{m:2}}/>
                            :null
                        }
                        {
                            currentWeatherData.rain || currentWeatherData.showers?
                                <WaterDropIcon sx={{m:2}}/>
                            :null
                        }
                        {
                            currentWeatherData.snowfall?
                                <AcUnitIcon sx={{m:2}}/>
                            :null
                        }
                    </Typography>
                    :
                    null
            }
            <Typography sx={{alignItems:'center', display:'flex'}}>
                {
                    currentWeatherData.showers?
                        <ThunderstormIcon sx={{m:2}}/>
                    :null
                }
            </Typography>
        </Card>
    )
}