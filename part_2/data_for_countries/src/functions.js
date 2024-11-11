
// function to get the wind direction
const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
};

// function that returns object literal of the correct infoMessage
const searchConditions = (filteredCountries, countries) => ({
    0: {
        countries,
        infoMessage: "No matches found",
    },
    many: {
        countries,
        infoMessage: "Too many matches, specify another filter",
    },
    default: {
        countries: filteredCountries,
        infoMessage: "",
    },
})
// function that convert the weather codes to the correct image
const imageCodeToDisplay = (code) =>
({
    0: "./images/sunny.png",
    1: "./images/cloudy-and-sun.png",
    2: "./images/cloudy.png",
    3: "./images/overcast.png",
    45: "./images/fog.png",
    48: "./images/fog.png",
    51: "./images/drizzle.png",
    53: "./images/drizzle.png",
    55: "./images/drizzle.png",
    61: "./images/moderate-rain.png",
    63: "./images/moderate-rain.png",
    65: "./images/heavy-rain.png",
    71: "./images/moderate-snow.png",
    73: "./images/moderate-snow.png",
    75: "./images/heavy-snow.png",
    80: "./images/rain-shower.png",
    81: "./images/rain-showers.png",
    95: "./images/thunderstorm.png",
}[code]);


export default {
    getWindDirection,
    searchConditions,
    imageCodeToDisplay,
}