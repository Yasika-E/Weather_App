import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from './WeatherDetails';
import moment from 'moment';

const Forecast = () => {
  const { forecastdata, handleClick } = useContext(MyContext);
  const [currentDay, setCurrentDay] = useState(null);

  // Group forecast data by day
  const groupForecastByDay = (data) => {
    const groupedData = {};
    data.list.forEach(item => {
      const date = moment(item.dt_txt).format('YYYY-MM-DD');
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    return groupedData;
  };

  useEffect(() => {
    if (forecastdata) {
      const forecastByDay = groupForecastByDay(forecastdata);
      const today = moment().format('YYYY-MM-DD');
      setCurrentDay(forecastByDay[today] ? today : Object.keys(forecastByDay)[0]);
      console.log(setCurrentDay);
    }
  }, [forecastdata]);

  const forecastDataByDay = forecastdata ? groupForecastByDay(forecastdata) : null;
  let currentDayData = currentDay ? forecastDataByDay[currentDay] : null;

  // Ensure at least 5 intervals are displayed by adding data from the next day(s)
  if (currentDayData && currentDayData.length < 5) {
    const nextDaysData = [];
    let nextDayIndex = 1;
    while (currentDayData.length + nextDaysData.length < 5) {
      const nextDayKey = Object.keys(forecastDataByDay)[nextDayIndex];
      if (nextDayKey) {
        nextDaysData.push(...forecastDataByDay[nextDayKey]);
        nextDayIndex += 1;
      } else {
        break;
      }
    }
    currentDayData = currentDayData.concat(nextDaysData.slice(0, 5 - currentDayData.length));
  }

  return (
    <div className='forecast-layout'>
      <div className='forecast-container'>
        {forecastdata && <h1 className='forecast-h1'>Forecasting</h1>}
        {currentDayData ? (
          <div className='container-forecast'>
            <h2>{moment(currentDay).format('dddd, MMMM Do YYYY')}</h2>
            <div className='hour-forecast'>
              {currentDayData.slice(0, 5).map((item, index) => (
                <div key={index} className='hour-item'>
                  <p>{moment(item.dt_txt).format('h:mm A')}</p>
                  <p>{Math.round(item.main.temp - 273.15)}&deg;C</p>
                  <p>Rain: {item.rain ? `${item.rain['3h']} mm` : '0 mm'}</p>
                  <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading forecast data...</p>
        )}
      </div>
      <div className='fivedays-overview'>
      {forecastDataByDay && Object.entries(forecastDataByDay).slice(0, 5).map(([dayKey, dayData], index) => (
  <div key={index} className='fiveday-column'>
    <h3>{moment(dayKey).format('dddd')}</h3>
    <p>High: {Math.round(Math.max(...dayData.map(item => item.main.temp_max - 273.15)))}&deg;C</p>
    <p>Low: {Math.round(Math.min(...dayData.map(item => item.main.temp_min - 273.15)))}&deg;C</p>
    <img
      src={`http://openweathermap.org/img/wn/${dayData[0].weather[0].icon}@2x.png`}
      alt={dayData[0].weather[0].description}
    />
  </div>
))}

      </div>
      <button className='knowmore' onClick={handleClick}>Know More..</button>
    </div>
  );
};

export default Forecast;
