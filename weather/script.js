async function getWeatherByInput() {
    const location = document.getElementById('location-input').value;
    if (location) {
        getWeather(location);
    }
}

async function getWeather(location) {
    const apiKey = '07b2c7ca315cd08a7545fbf31c6a42f8';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    if (data.cod === 200) {
        const weatherHtml = `
            <h2>Weather in ${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherDiv.innerHTML = weatherHtml;
    } else {
        weatherDiv.innerHTML = `<p>${data.message}</p>`;
    }
}

async function getWeatherByLocation(lat, lon) {
    const apiKey = '07b2c7ca315cd08a7545fbf31c6a42f8';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByLocation(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

window.onload = getLocation;
