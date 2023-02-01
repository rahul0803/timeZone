const apiKey = "f3a0d93710fb413fb60f96eb6c72532d";
const nameTimeZone = document.getElementById("name"),
    nameTimeZone2 = document.getElementById("name2"),
    latitude = document.getElementById("lat"),
    latitude2 = document.getElementById("lat2"),
    longitude = document.getElementById("long"),
    longitude2 = document.getElementById("long2"),
    std = document.getElementById("std"),
    std2 = document.getElementById("std2"),
    stdSec = document.getElementById("stdSec"),
    stdSec2 = document.getElementById("stdSec2"),
    dst = document.getElementById("dst"),
    dst2 = document.getElementById("dst2"),
    dstSec = document.getElementById("dstSec"),
    dstSec2 = document.getElementById("dstSec2"),
    country = document.getElementById("country"),
    country2 = document.getElementById("country2"),
    postcode = document.getElementById("postcode"),
    postcode2 = document.getElementById("postcode2"),
    city = document.getElementById("city"),
    city2 = document.getElementById("city2");
var address = "";
const resultContainer = document.querySelector(".resultContainer");
const inputBox = document.querySelector(".box");
const errorMsg = document.getElementById("error");
const timeZoneError = document.getElementById("timeZoneError");


const getDeviceLocation = () => {
    const getLocation = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve);
    })
    return getLocation;
}


const displayResult = async () => {
    try {
        const addressUrl = "https://api.geoapify.com/v1/geocode/search?text=Kolkata%20-%20700061%2C%20WB%2C%20India&format=json&apiKey=f3a0d93710fb413fb60f96eb6c72532d";
        const response = await fetch(addressUrl);
        console.log(response);
        const jsonData = await response.json();
        console.log(jsonData);
        const addressDetails1 = jsonData.results[0].address_line1;
        const addressDetails2 = jsonData.results[0].address_line2;
        const address = addressDetails1 + " " + addressDetails2;
        const validAddress = address.trim();
        console.log(validAddress);                                                                    // Kolkata WB, India

        /*    please use this "Kolkata WB, India" as the input address   */

        if (!inputBox.value) {
            errorMsg.textContent = "Please enter an address!"
            errorMsg.style.display = "block";
            document.querySelector(".yourResult").style.display = "none";
            resultContainer.style.display = "none";
            timeZoneError.style.display = "none";
        }
        else if (inputBox.value != validAddress) {
            errorMsg.textContent = "Please enter the correct address";
            errorMsg.style.display = "block";
            document.querySelector(".yourResult").style.display = "none";
            resultContainer.style.display = "none";
            timeZoneError.style.display = "none";
        }
        else if (inputBox.value && inputBox.value == validAddress) {
            document.querySelector(".yourResult").style.display = "block";
            errorMsg.textContent = "";
            resultContainer.style.display = "block";
            nameTimeZone2.innerHTML += jsonData.results[0].timezone.name;
            latitude2.innerHTML += jsonData.results[0].lat;
            longitude2.innerHTML += jsonData.results[0].lon;
            std2.innerHTML += jsonData.results[0].timezone.offset_STD;
            stdSec2.innerHTML += jsonData.results[0].timezone.offset_STD_seconds;
            dst2.innerHTML += jsonData.results[0].timezone.offset_DST;
            dstSec2.innerHTML += jsonData.results[0].timezone.offset_DST_seconds;
            country2.innerHTML += jsonData.results[0].country;
            postcode2.innerHTML += jsonData.query.parsed.postcode;
            city2.innerHTML += jsonData.results[0].city;
        }
    }
    catch (err) {
        console.log(err, "error in fetching");
        timeZoneError.textContent = "Time zone could not be found!";
        timeZoneError.style.display = "block";
        errorMsg.textContent = "";
        document.querySelector(".yourResult").style.display = "none";
        resultContainer.style.display = "none";
    }
}


const displayDetails = (jsonData) => {
    nameTimeZone.innerHTML += jsonData.results[0].timezone.name;
    latitude.innerHTML += jsonData.results[0].lat;
    longitude.innerHTML += jsonData.results[0].lon;
    std.innerHTML += jsonData.results[0].timezone.offset_STD;
    stdSec.innerHTML += jsonData.results[0].timezone.offset_STD_seconds;
    dst.innerHTML += jsonData.results[0].timezone.offset_DST;
    dstSec.innerHTML += jsonData.results[0].timezone.offset_DST_seconds;
    country.innerHTML += jsonData.results[0].country;
    postcode.innerHTML += jsonData.results[0].postcode;
    city.innerHTML += jsonData.results[0].city;

    address = jsonData.results[0].address_line2;
}


const fetchDetails = async () => {
    const data = await getDeviceLocation();
    console.log(data);
    const lat = data.coords.latitude;
    const long = data.coords.longitude;

    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${apiKey}`;
    const resp = await fetch(url);
    console.log(resp);
    const jsonData = await resp.json();
    console.log(jsonData);
    // const details = jsonData.results[0].timezone;
    // console.log(details);

    displayDetails(jsonData);
}


document.addEventListener("DOMContentLoaded", fetchDetails);

