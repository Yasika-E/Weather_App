import React, { useContext} from 'react';
import { MyContext } from './WeatherDetails';
// import { FaSearch} from 'react-icons/fa';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
const key = "5a23ebf9299361716b59634568353f3a";
const Header = () => {
  const { city,setCity, fetchData,} = useContext(MyContext);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setCity();
      fetchData();
    }
   };


   const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to fetch location data');
              }
              return response.json();
            })
            .then(data => {
              const cityName = data.name; // Extract city name from the response
              setCity(cityName); // Set the city name in your state or variable
              fetchData(); // Fetch weather data for the current location
            })
            .catch(error => {
              console.error('Error fetching location:', error);
            });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className='bg-image'>
    <div className='search-container'>      
     
      <div className='input-wrapper'>
      <FaSearch className='search-icon' onClick={() => fetchData()} FontAwesomeIcon icon="fa-brands fa-searchengin" />
      <FaMapMarkerAlt className='location-icon' onClick={fetchLocation} />
      <input
        type="text"
        className='search-box'
        placeholder='Enter the city name'
        value={city}
        onChange={(e) => setCity(e.target.value)}
         onKeyPress={handleKeyPress}
         
      />

      
    </div>
    </div>
    </div>
  );
}

export default Header;