function getWeather() {
    const apiKey = '43faee665c295c0cbbf1d790cb32f771';
    const city = document.getElementById('cityInput').value;
    
    if( city === "") {
        alert("Please Enter a City Name");
        return;
    }
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            showWeather(data);
            cityInput.value = ''; 
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError('Failed to fetch weather data. Please try again later.');
        });
}

function showWeather(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Climate: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels Like: ${data.main.feels_like}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

function displayError(message) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `<p class="error">${message}</p>`;
}
