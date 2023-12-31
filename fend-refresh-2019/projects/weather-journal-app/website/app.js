/* Global Variables */
const apiKey = '39e303bf51db5ac2e61500b816291446&units=imperial';
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=51.5606&lon=5.0919&appid=';
let temp = 0;


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//get weatherData
const getWeatherData = async (url, apiKey)=> {
    const response = await fetch(url+apiKey)
    try {
        const data = await response.json();
        console.log('get weather function: ', data.main.temp)
        return temp = data.main.temp
    }  catch(error) {
        console.log("error", error);
    }
}

getWeatherData(openWeatherUrl, apiKey);

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
        return response.json()
    }catch(error) {
        console.log("error:", error);
    }
}

//handle on click
async function handleClick(){
    await getWeatherData(openWeatherUrl, apiKey);
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const date = newDate;
    await postData('/weatherJournal', {date, zipCode, feelings, temp});
    console.log('after postdata in click');
    retrieveData('/weatherJournal');
}

//add eventlistner
document.addEventListener("DOMContentLoaded", function(){
    const myButton = document.getElementById("generate")

    myButton.addEventListener("click", handleClick)
});

//get all projectData
const retrieveData = async(url) =>{
    const request = await fetch(url);
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log('Data: ', allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
        document.getElementById('content').innerHTML = allData.feelings;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('zipCode').innerHTML = allData.zipCode;
    }
    catch(error) {
        console.log(error, error);
        // appropriately handle the error
    }
}


// window.onerror = function() {
//     let message = "something went wrong, try again"
//     alert(message);
//     return true;
// };
