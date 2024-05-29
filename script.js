const apiKey = '2467d0f93e0aa9d5aae45e93fa70a080';

async function getWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function processWeatherData(data) {
    const processedData = {
        location: data.name,
        temperature: (data.main.temp - 273.15).toFixed(2),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
    };
    return processedData;
}

document.getElementById('location-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = document.getElementById('location-input').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    document.getElementById('loading').style.display = 'block';
    
    const weatherData = await getWeather(location);
    document.getElementById('loading').style.display = 'none';
    
    if (weatherData) {
        const processedData = processWeatherData(weatherData);
        console.log(processedData);
        displayWeather(processedData);
    }
});

function displayWeather(data) {
    const weatherResultDiv = document.getElementById('weather-result');
    weatherResultDiv.innerHTML = `
        <h2>Weather in ${data.location}</h2>
        <p>Temperature: ${data.temperature} °C</p>
        <p>Description: ${data.description}</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} m/s</p>
    `;
}
