import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import Header from './Header';
import Axios from 'axios';
import Search from './Search';
import Forecast from './Forecast';
import Fivedays_Forecast from './Fivedays_Forecast';

// Create a Context
export const MyContext = createContext();

const key = "5a23ebf9299361716b59634568353f3a";

const WeatherDetails = ({ children }) => {
  const [city, setCity] = useState("Karur");
  const [data, setData] = useState();
  const [forecastdata, setForecastData] = useState();
  const [more,setMore]=useState(false);


  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
      setData(response.data);
      setBackground(response.data.weather[0].description);
      fetchForecast();
    } catch (err) {
       console.log("Enter Correct City Name");
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`);
      setForecastData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const setBackground = (description) => {
    switch (description) {
      case 'clear':
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNvbG9yZnVsJTIwc2t5fGVufDB8fHx8MTY4NjgxMzg5Ng&ixlib=rb-1.2.1&q=80&w=1080')";
        break;
      case 'few clouds':
        document.body.style.backgroundImage = "url('https://t4.ftcdn.net/jpg/00/46/46/59/360_F_46465951_HUU3s1EmZU9j7GOM5P9q8hqkO4r13aUA.jpg')";
        break;
      case 'clear sky':
        document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYhf0vkHTmFzNI-MQRiVqtmUySB5hRu-tcIA&s')";
        break;
      case 'broken clouds':
        document.body.style.backgroundImage = "url('https://qph.cf2.quoracdn.net/main-qimg-05fd5d085fa844e3d533b2275a7d71e6-lq')";
        break;
      case 'shower rain':
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1561484936-7e9af6d33280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHJhaW58ZW58MHx8fHwxNjg2ODUwOTg2&ixlib=rb-1.2.1&q=80&w=1080')";
        break;
      case 'rain':
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1607083202970-5d3b45d5a2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHJhaW58ZW58MHx8fHwxNjg2ODUwOTg2&ixlib=rb-1.2.1&q=80&w=1080')";
        break;
      case 'rains':
        document.body.style.backgroundImage = "https://c02.purpledshub.com/uploads/sites/41/2020/08/GettyImages-NA006117-b5eac24.jpg')";
        break;
      case 'thunderstrom':
        document.body.style.backgroundImage = "url('https://c02.purpledshub.com/uploads/sites/41/2020/08/GettyImages-NA006117-b5eac24.jpg')";
        break;
      case 'moderate rain':
        document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/04/04/18/74/360_F_404187446_tpkexQR4I7faYvCTeurnXVNiFrhFONd7.webp')";
        break;
      default:
        document.body.style.backgroundImage = "url('https://akm-img-a-in.tosshub.com/sites/weather/resources/image/bg/clouds.jpg?size=910%E2%88%B6431')";
    }
  };
  const handleClick=()=>{
    setMore(!more);
  }

  return (
    <MyContext.Provider value={{ city, setCity, data, setData, forecastdata, handleClick,setForecastData, fetchData, fetchForecast,more,setMore }}>
      {children}
      <div className='App'>
      
      <div className='layout'>
       
        {!more && <><Header /><Search /> <Forecast /></>}
        {more &&<Fivedays_Forecast/>}
        
      </div>
      </div>
    </MyContext.Provider>
  );
}

export default WeatherDetails;
