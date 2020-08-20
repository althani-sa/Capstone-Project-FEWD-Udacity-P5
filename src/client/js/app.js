/*
TODO:
1. Include form validation on Countries input for Start Date and End Date ...
to validate date by getting Current Date. Sorts out upper or lower case values!
2. Create api.js to call Pixabay, Weatherbit, and Geonames
3. Sign up for api keys and configure .env 
*/
export function handleSubmit(event) {
    event.preventDefault()
    const tripSummary = document.getElementById("trip__summary")
    tripSummary.scrollIntoView()
}

document.getElementById("btn__submit").addEventListener("click", handleSubmit)

