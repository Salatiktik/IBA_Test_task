import './App.css';
import React from 'react';

import {Typography} from '@mui/material'

import UserModule from 'userProvider/UserModule';
import WeatherModule from 'weatherProvider/WeatherModule';

const App = () => {
  return (
    <div className="content">
      <Typography>User module</Typography>
      <UserModule/>
      <Typography>Weather module</Typography>
      <WeatherModule/>
    </div>
  );
};

export default App;
