// import {  noEmptyFields } from "./noEmptyFields";
import "regenerator-runtime/runtime"; // to use async-await in webpack - babel environment
import moment from "moment"  // for time manipulation

// trip summary to add scroll effect for event listener
const tripSummary = document.getElementById("trip__summary");
// api keys
let pixabayKey = "18019768-6e42d36fd84b4113013308b10";
let weatherbitKey = "aa87aea469a6451da98eb73289218725";


// post user input data to the server
const postData = async (url = 'http://localhost:1412/all', projectData) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(projectData)
    });
    try {
        const newProjectData = await response.json()
        // console.log(newProjectData);
    } catch (error) {
        console.log('error', error)
    }
};
// moment date validator to check if trip is within 7 days or more by getting the DIFFERENCE between end and start date as MOMENT OBJECTS.
const validateDate = (start, end) => {
    const startDate = document.getElementById("dateStart").value
    const endDate = document.getElementById("dateEnd").value
    let startDateMoment = moment(startDate)
    let endDateMoment = moment(endDate)
    let m = moment()
    const diff = startDateMoment.diff(m, 'days') + 1
    const durationDiff = endDateMoment.diff(startDateMoment, "days")
    const momentData = {
        duration: diff,
        tripDuration: durationDiff
    }
    return momentData
};
// fetching city name, lat, and lon from geonamesAPI using async await and exporting dictionary to callback function with return
const geonamesAPI = async (cityInput) => {
    let geonamesUser = "ialthani"
    const geonamesFetch = await fetch(`http://api.geonames.org/searchJSON?q=${cityInput}&username=${geonamesUser}`)
    try {
        const response = await geonamesFetch.json()
        const geonamesData = await response.geonames[0]
        const geoData = {
            lat: geonamesData.lat,
            lng: geonamesData.lng,
            cityName: geonamesData.toponymName,
        }
        document.getElementById("city__result").innerHTML = geonamesData.toponymName
        return geoData
    }
    catch (error) {
        console.log("error", error)
    }
};
// weatherbit data. this takes data from geonames and moment functions and uses them to fetch either current or forecast weather data
const weatherbitAPI = async (geoData, momentData) => {
    const weatherbitFetch = await fetch(`http://api.weatherbit.io/v2.0/current?lat=${geoData.lat}&lon=${geoData.lng}&key=${weatherbitKey}`)
    const weatherbitForecastFetch = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${geoData.lat}&lon=${geoData.lng}&key=${weatherbitKey}&days=16`)
    if (momentData.duration < 7) {
        try {
            // console.log(geoData) -- to check results
            const response = await weatherbitFetch.json()
            const weatherResult = await response
            // console.log(weatherResult.data[0].temp) to check results
            // Updating UI.
            document.getElementById("trip__duration").innerHTML = `The current weather at ${geoData.cityName} is ${weatherResult.data[0].temp}°C.
            Your trip duration is ${momentData.tripDuration} days.`// This is the extended requirement here.
        }
        catch (error) {
            console.log("error", error)
        }
    }
    // if time difference is less than 7 days, use current weather data. if it is greater than seven days, use forecast weather.
    else if (momentData.duration > 7) {
        try {
            const response = await weatherbitForecastFetch.json()
            const forecastResult = await response
            document.getElementById("trip__duration").innerHTML = `Expect ${forecastResult.data[0].weather.description}. The weather forecast for ${geoData.cityName} on your selected Start Date is ${forecastResult.data[0].temp}°C.  Your trip duration is ${momentData.tripDuration} days.`
        }
        catch (error) {
            console.log("error", error)
        }
    }
};
 // fetch pictures from pixabay using cityInput from suer
const pixabayAPI = async (cityInput) => {
    const pixabayFetch = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(cityInput)}&image_type=photo&safesearch=true&`)
    const response = await pixabayFetch.json()
    const pixabayResults = response
    document.getElementById("img").src = pixabayResults.hits[0].webformatURL // update UI
};

// callback function that combines everything and allows the app to get data from all the functions. uses scrollIntoView()!
export async function handleSubmit(event) {
    event.preventDefault()
    const startDate = document.getElementById("dateStart").value
    const endDate = document.getElementById("dateEnd").value
    const checkDate = validateDate(startDate, endDate)
    const cityInput = document.getElementById("city").value
    const pixabay = await pixabayAPI(cityInput)
    const geonames = await geonamesAPI(cityInput)
    const weatherbit = await weatherbitAPI(geonames, checkDate)
    tripSummary.scrollIntoView()
};