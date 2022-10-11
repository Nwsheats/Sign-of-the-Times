let bDate = 1;
let month = 5;
var day = 9;
var byabbeURI = "https://byabbe.se/on-this-day/"

fetch('https://byabbe.se/on-this-day/'+month+'/'+day+'/births.json', {
// ) {
//   method: 'GET', //GET is the default.
//   // appid: 'bdc63249ca9c768d065db41d5ee05a7d', // apikey
//   // q: 'Minneapolis', // Query to search for
// 
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// fetch(byabbeURI+bDate+month) {
//   method: 'GET', //GET is the default.
//   // appid: 'bdc63249ca9c768d065db41d5ee05a7d', // apikey
//   // q: 'Minneapolis', // Query to search for
// })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
const button = document.getElementById('btn');



function getAztro() {
    
    const aztroCall = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': 'b03c81bcf8msh1ab2df3e54279fdp1b0701jsnebb14a4fadd9',
            'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
        }
    };
    
    fetch('https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=aquarius&day=today', aztroCall)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    }

button.addEventListener('click', getAztro)
