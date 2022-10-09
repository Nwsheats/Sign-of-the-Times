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