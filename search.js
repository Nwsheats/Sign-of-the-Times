//First wrap everything in a Document Ready function to make sure nothing 
//happens in the JS until the page has fully loaded
//$(document).ready(function () {


// set variable for clicking button
const button = document.getElementById('btn');

//add event listeners to trigger functions when submit button is clicked
//first need to prevent default page reload behavior because the console 
//log was clearing immediately, so couldn't debug page behavior
button.addEventListener('click', function(event){
  event.preventDefault()
});

button.addEventListener('click', getByabbe);
button.addEventListener('click', getAztro);
button.addEventListener('click', dateToZodiac);



//fetch request for Byabee - wiki births
function getByabbe() {
  ///set variables for Byabbe function to use:
  let bDateText = $("#calendarSelector").val();
  var bDateMoment = moment(bDateText, 'MM-DD-YYYY');
  let month = bDateMoment.month()+1; //moment month is 0 base, so add 1
  var day = bDateMoment.date();
  var year = bDateMoment.year();
  var byabbeURI = "https://byabbe.se/on-this-day/";
  console.log(bDateMoment);
  console.log(month);
  console.log(day);
  console.log(year);


  fetch(byabbeURI+month+'/'+day+'/births.json')
   .then(response => response.json())
   .then(response => console.log(response))
   .catch(err => console.error(err));
}

//function to calculate Zodiac sign from input month and day
//attempting method described here: https://medium.com/@Saf_Bes/get-the-zodiac-sign-for-a-date-in-javascript-797305d75869





function dateToZodiac(day, month)
    {
      let bDateText = $("#calendarSelector").val();
      var bDateMoment = moment(bDateText, 'MM-DD-YYYY');
      var month = bDateMoment.month()+1; //moment month is 0 base, so add 1
      var day = bDateMoment.date();  
      var zodiacSign="";
           
        // checks month and date within the
        // valid range of a specified zodiac
        if (month == 12){
               
            if (day < 22)
            zodiacSign = "Sagittarius";
            else
            zodiacSign ="Capricorn";
        }
               
        else if (month == 1){
            if (day < 20)
            zodiacSign = "Capricorn";
            else
            zodiacSign = "aquarius";
        }
               
        else if (month == 2){
            if (day < 19)
            zodiacSign = "Aquarius";
            else
            zodiacSign = "Pisces";
        }
               
        else if(month == 3){
            if (day < 21)
            zodiacSign = "Pisces";
            else
            zodiacSign = "Aries";
        }
        else if (month == 4){
            if (day < 20)
            zodiacSign = "Aries";
            else
            zodiacSign = "Taurus";
        }
               
        else if (month == 5){
            if (day < 21)
            zodiacSign = "Taurus";
            else
            zodiacSign = "Gemini";
        }
               
        else if( month == 6){
            if (day < 21)
            zodiacSign = "Gemini";
            else
            zodiacSign = "Cancer";
        }
               
        else if (month == 7){
            if (day < 23)
            zodiacSign = "Cancer";
            else
            zodiacSign = "Leo";
        }
               
        else if( month == 8){
            if (day < 23)
            zodiacSign = "Leo";
            else
            zodiacSign = "Virgo";
        }
               
        else if (month == 9){
            if (day < 23)
            zodiacSign = "Virgo";
            else
            zodiacSign = "Libra";
        }
               
        else if (month == 10){
            if (day < 23)
            zodiacSign = "Libra";
            else
            zodiacSign = "Scorpio";
        }
               
        else if (month == 11){
            if (day < 22)
            zodiacSign = "Scorpio";
            else
            zodiacSign = "Sagittarius";
        }
               
        console.log(zodiacSign);
    }





// method below didn't work, trying new approach above
// found on GitHub at https://gist.github.com/nporteschaikin/ea8fb4a291dcc63270ce#file-datetozodiac-js

//do we need to declare these date variables again outside the zodiac function 
// //so they can be used as input? 

//   let bDateText = $("#calendarSelector").val();
//   var bDateMoment = moment(bDateText, 'MM-DD-YYYY');
//   let month = +bDateMoment.month()+1; //moment month is 0 base, so add 1
//   var day = +bDateMoment.date();
//   var year = bDateMoment.year();
//   var x;

//   function dateToZodiac() {
//   x = (month * 100) + day;
//   console.log(x);
//   return x >= 221 && x <= 319 ? 'Aries' : x >= 320 && x <= 420 ? 'Taurus' : x >= 421 && x <= 520 ? 'Gemini' : x >= 521 && x <= 622 ? 'Cancer' : x >= 623 && x <= 722 ? 'Leo' : x >= 723 && x <= 922 ? 'Virgo' : x >= 823 && x <= 922 ? 'Libra' : x >= 923 && x <= 1021 ? 'Scorpio' : x >= 1022 && x <= 1121 ? 'Sagittarius' : x >= 1122 && x <= 19 ? 'Capricorn' : x >= 20 && x <= 118 ? 'Aquarius' : x >= 119 && x <= 220 ? 'Pisces' : void 0;
// }
// //console.log(dateToZodiac.toString());
// console.log(dateToZodiac());


//fetch request for Aztro - Horoscope
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

//  }) //closing document ready function from start