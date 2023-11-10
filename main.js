function displayGreeting() {
  let name = document.getElementById("name").value;
  let city = document.getElementById("city").value;

  if (!name || !city) {
    alert("Please enter both your name and choose a city.");
    return;
  }

  let date = new Date();
  let greeting = "Hello " + name + "!";

  // You can create a mapping of the selected cities with their corresponding timezones
  let cityTimezones = {
    London: "Europe/London",
    "New York": "America/New_York",
    Tokyo: "Asia/Tokyo",
    Paris: "Europe/Paris",
    Beijing: "Asia/Shanghai",
    Moscow: "Europe/Moscow",
    Cairo: "Africa/Cairo",
    "Rio de Janeiro": "America/Sao_Paulo",
    Sydney: "Australia/Sydney",
    Istanbul: "Europe/Istanbul",
  };

  let selectedTimezone = cityTimezones[city];
  let options = {
    timeZone: selectedTimezone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  let time =
    "Current time at " +
    city +
    ": " +
    new Intl.DateTimeFormat("en-US", options).format(date);

  let apiKey = "f7d733761e34e1ec9403c7f04b372b35";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let temperature = "Temperature: " + data.main.temp + "°C";
      let weatherDescription = "Weather: " + data.weather[0].description;
      let result =
        greeting +
        "<br>" +
        time +
        "<br>" +
        temperature +
        "<br>" +
        weatherDescription;
      document.getElementById("result").innerHTML = result;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      let result =
        greeting + "<br>" + time + "<br>" + "Weather information not available";
      document.getElementById("result").innerHTML = result;
    });
}
