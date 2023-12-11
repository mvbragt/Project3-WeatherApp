/* Global Variables */
const apiKey = '39e303bf51db5ac2e61500b816291446&units=imperial';
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=51.5606&lon=5.0919&appid=';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//get weatherData
const getWeatherData = async (url, apiKey)=> {
    const response = await fetch(url+apiKey)
    try {
        const data = await response.json();
        console.log('get weather: ', data.main.temp)
        return data.main.temp
    }  catch(error) {
        console.log("error", error);
    }
}

//postData
const postData = async(url = '', data = {}) => {
    console.log('postData appjs: ', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try{
        const newData = await response.json();
        return newData
    }catch(error) {
        console.log("error:", error);
    }
}

function handleClick(){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const date = document.getElementById('date').innerHTML = newDate;
    getWeatherData(openWeatherUrl, apiKey);
    postData('/weatherJournal', {temp, date, zipCode, feelings});
}

document.addEventListener("DOMContentLoaded", function(){
    const myButton = document.getElementById("generate")

    myButton.addEventListener("click", handleClick)
});


//get all projectData
const retrieveData = async () =>{
    const request = await fetch('/weatherJournal');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log('retrieveData: ', allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById("date").innerHTML = allData.newDate;
    }
    catch(error) {
        console.log("error", error);
        window.onerror = function() {
            var message = "something went wrong, try again"
            alert(message);
            return true;
        };
    }
}
