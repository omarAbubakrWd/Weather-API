
var day = document.getElementById('day'),
    search = document.getElementById('Search'),
    date = document.getElementById('date'),
    country = document.getElementById('country'),
    temp = document.getElementById('temp'),
    icon = document.getElementById('icon'),
    statu = document.getElementById('statu');
rain = document.getElementById('rain')
wind = document.getElementById('wind')
windDirection = document.getElementById('windDirection')
//
var day2 = document.getElementsByClassName('day2'),
    icon2 = document.getElementsByClassName('icon2'),
    temp2 = document.getElementsByClassName('temp2'),
    smallTemp = document.getElementsByClassName('smallTemp'),
    custom = document.getElementsByClassName('custom'),

    currentCity = "Cairo",
    apiResponse,
    responseData,
    monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'SpeT', 'Oct', 'Nov', 'Dec'],
    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
//
async function getweather() {

    apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=28b5629057b647f6a02104320243003&q=${currentCity}&days=3`)
    responseData = await apiResponse.json();
    currentDay();
    nextDay();
    getCoordintes()
}

getweather();

var date1 = new Date()

function currentDay() {
    day.innerHTML = days[date1.getDay()];
    date.innerHTML = `${date1.getDate()} ${monthName[date1.getMonth()]}`;
    country.innerHTML = responseData.location.name;
    temp.innerHTML = responseData.current.temp_c += `<sup>o</sup>C`;
    icon.setAttribute("src", `https:${responseData.current.condition.icon}`)
    statu.innerHTML = responseData.current.condition.text;
    rain.innerHTML = responseData.current.humidity += `% <i class="fa-solid fa-umbrella me-1"></i>`
    wind.innerHTML = responseData.current.wind_kph += `km/H <i class="fa-solid fa-wind me-1"></i>`
    windDirection.innerHTML = responseData.current.wind_dir += ` <i class="fa-solid fa-compass me-1"></i>`
}

search.addEventListener("keyup", function () {

    currentCity = search.value
    console.log(currentCity)
    getweather(currentCity)

})

function nextDay() {
    for (var i = 0; i < day2.length; i++) {
        day2[i].innerHTML = days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()];
        icon2[i].setAttribute("src", `https:${responseData.forecast.forecastday[i + 1].day.condition.icon}`)
        temp2[i].innerHTML = responseData.forecast.forecastday[i + 1].day.maxtemp_c += `<sup>o</sup>C`;
        smallTemp[i].innerHTML = responseData.forecast.forecastday[i + 1].day.mintemp_c += `<sup>o</sup>C`;
        custom[i].innerHTML = responseData.forecast.forecastday[i + 1].day.condition.text;
    }

}

function getCoordintes() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
    xhr.open('GET', " https://us1.locationiq.com/v1/reverse.php?key=pk.4ff4f7f57ba85b4785bcca177dff71c6&lat=" + lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.address.city;
            console.log(city);
            return;
        }
    }
}