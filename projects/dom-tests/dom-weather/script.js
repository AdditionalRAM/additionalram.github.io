const list = document.querySelector("#daylist");
const weatherblock = document.querySelector(".weatherblock").cloneNode(true);
document.querySelector(".weatherblock").remove();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("loaded");
      }, 200);
      observer.unobserve(entry.target);
    }
  });
});

fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,windspeed_10m&timezone=Europe%2FBerlin&forecast_days=3")
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.hourly.time.length; i++) {
      const weather = weatherblock.cloneNode(true);
      weather.querySelector(".time").innerHTML = formatDateTime(data.hourly.time[i]);
      weather.querySelector(".temp").innerHTML = data.hourly.temperature_2m[i] + "°C";
      weather.querySelector(".wind").innerHTML = data.hourly.windspeed_10m[i] + "km/h";
      if (i % 2 == 0) {
        weather.classList.add("bcg1");
      } else {
        weather.classList.add("bcg2");
      }
      list.appendChild(weather);
      observer.observe(weather);
    }
  })
  .catch(error => console.error(error));

function formatDateTime(inputDateString) {
    const date = new Date(inputDateString);
  
    // Define options for formatting
    const options = {
      weekday: "long", // Full weekday name
      hour: "2-digit", // 2-digit hour
      minute: "2-digit", // 2-digit minute
      hour12: false, // Use 24-hour format
    };
  
    // Get the day of the week and time
    const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
    const time = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(date);
  
    // Combine the formatted day and time
    const formattedDate = `${dayOfWeek}, ${time}`;
  
    return formattedDate;
}