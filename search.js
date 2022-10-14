//Define zodiacSign as a global variable to use later in the getAztro function
var zodiacSign = "";

// set variable for clicking button
const saveButton = document.getElementById('saveBtn')
const button = document.getElementById('btn');
const horoMonth = $('#horoscopeMonth');
const horoInfo = $('#horoscopeInfo');
const bDayLink = $('#bdayLinktoWiki');
const bDayInfo = $('#fetchbdayinfo');
const savedText = $('#dataHere1')

// when the page loads, storageLocal is either the local storage info or an
// empty string. A for loop allows all of that data in the Array to be appended
// to the savedText box upon page load.
let storageLocal = JSON.parse(localStorage.getItem("sign-store")) || [];
for (let i = 0; i < storageLocal.length; i++) {
  savedText.append(storageLocal[i].date + ': ' + storageLocal[i].description + '<br>');
}


//add event listeners to trigger functions when submit button is clicked
//first need to prevent default page reload behavior because the console 
//log was clearing immediately, so couldn't debug page behavior

// combined our three EventListeners into one, added jQuery to enable the 
// save button after it is pressed and change the color back to emerald.
button.addEventListener('click', function (event) {
    event.preventDefault()
    getByabbe();
    dateToZodiac();
    $('#saveBtn #btn').prop("disabled", false);
    $('#saveBtn #btn').css("background-color", "rgb(16 185 129)");
    //
});


// This is the Save Button event listener, uses a callback function to grab the
// date and description values set in popDate(), so we can call them outside of
// that function. Runs the addLSText function with those variables.
// jQuery to disable the save button when pressed and change the color.
saveButton.addEventListener('click', function() {
  const date = horoInfo.data("date");
  const desc = horoInfo.data("desc");
  addLSText(date, desc);
  $('#saveBtn #btn').prop("disabled", true);
  $('#saveBtn #btn').css("background-color", "rgb(120 113 108)")

}) 
//onload~ load Local storage


//fetch request for Byabee - wiki births
function getByabbe() {
    ///set variables for Byabbe function to use:
    let bDateText = $("#calendarSelector").val();
    var bDateMoment = moment(bDateText, 'MM-DD-YYYY');
    let month = bDateMoment.month() + 1; //moment month is 0 base, so add 1
    var day = bDateMoment.date();
    var year = bDateMoment.year();
    var byabbeURI = "https://byabbe.se/on-this-day/";

    fetch(byabbeURI + month + '/' + day + '/births.json')
        .then(response => response.json())
        .then(wikiData => { //make a function to store the wiki data
            console.log(wikiData) //show what's in the JSON object 
            popWiki(wikiData) //call next function and pass wikiData into it
        })
}

// I would not use removeContent here, as running this function clears the horoData.
// The removeContent function can be deleted, as the Wiki info is replaced everytime anyways.
function popWiki(wikiData) { //make function to render the wiki data elements
    // removeContent();
    let apString = ""; //apString holds the HTML that we'll replace in the loop
    var wikiUL = document.getElementById('bdayList'); //into this element we'll insert new <a> and <p> tags
    for (let i = 0; i < 5; i++) { //loop through first five people, maybe later make random?
        var e = Math.floor((Math.random() * wikiData.births.length))
        var birthsYear = wikiData.births[e].year;
        var birthsDesc = wikiData.births[e].description;
        var birthsLink = wikiData.births[e].wikipedia[0].wikipedia;
        //wikiData.births.delete(e)
        apString += '<a class="list-disc hover:text-slate-200"  target=_blank  href="' + birthsLink + '">\
                            <li class="list-disc">'+ birthsYear + ' - ' + birthsDesc + '</li>\
                            </a>'
    }
    wikiUL.innerHTML = apString;
}

//next function to calculate Zodiac sign from input month and day
//attempting method described here: https://medium.com/@Saf_Bes/get-the-zodiac-sign-for-a-date-in-javascript-797305d75869

function dateToZodiac(day, month) {
    let bDateText = $("#calendarSelector").val();
    var bDateMoment = moment(bDateText, 'MM-DD-YYYY');
    var month = bDateMoment.month() + 1; //moment month is 0 base, so add 1
    var day = bDateMoment.date();

    // checks month and date within the
    // valid range of a specified zodiac
    if (month == 12) {

        if (day < 22)
            zodiacSign = "Sagittarius";
        else
            zodiacSign = "Capricorn";
    }

    else if (month == 1) {
        if (day < 20)
            zodiacSign = "Capricorn";
        else
            zodiacSign = "aquarius";
    }

    else if (month == 2) {
        if (day < 19)
            zodiacSign = "Aquarius";
        else
            zodiacSign = "Pisces";
    }

    else if (month == 3) {
        if (day < 21)
            zodiacSign = "Pisces";
        else
            zodiacSign = "Aries";
    }
    else if (month == 4) {
        if (day < 20)
            zodiacSign = "Aries";
        else
            zodiacSign = "Taurus";
    }

    else if (month == 5) {
        if (day < 21)
            zodiacSign = "Taurus";
        else
            zodiacSign = "Gemini";
    }

    else if (month == 6) {
        if (day < 21)
            zodiacSign = "Gemini";
        else
            zodiacSign = "Cancer";
    }

    else if (month == 7) {
        if (day < 23)
            zodiacSign = "Cancer";
        else
            zodiacSign = "Leo";
    }

    else if (month == 8) {
        if (day < 23)
            zodiacSign = "Leo";
        else
            zodiacSign = "Virgo";
    }

    else if (month == 9) {
        if (day < 23)
            zodiacSign = "Virgo";
        else
            zodiacSign = "Libra";
    }

    else if (month == 10) {
        if (day < 23)
            zodiacSign = "Libra";
        else
            zodiacSign = "Scorpio";
    }

    else if (month == 11) {
        if (day < 22)
            zodiacSign = "Scorpio";
        else
            zodiacSign = "Sagittarius";
    }

    //console.log(zodiacSign);
    getAztro(zodiacSign);
}



//fetch request for Aztro - Horoscope
function getAztro() {

    const aztroCall = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': 'b03c81bcf8msh1ab2df3e54279fdp1b0701jsnebb14a4fadd9',
            'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
        }
    };

    fetch('https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=' + zodiacSign + '&day=today', aztroCall)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            popData(data, zodiacSign)
        })
}


// added horoInfo.data to store these variables in the data fields I added to
// "horoscopeInfo" in the HTML.
function popData(horoData) {
    removeContent();
    const horoDesc = horoData.description;
    const horoColor = horoData.color;
    const horoComp = horoData.compatibility;
    const horoMood = horoData.mood;
    const horoDate = horoData.current_date;
    const horoNum = horoData.lucky_number;
    horoInfo.data("date", horoDate);
    horoInfo.data("desc", horoDesc);
    horoMonth.append(zodiacSign);
    horoInfo.append('Color: ' + horoColor + '<br> Mood: ' + horoMood + '<br> Lucky Number: ' + horoNum +
        '<br> Compatibility: ' + horoComp + '<br> Horoscope: ' + horoDesc)
}

function removeContent() {
    horoMonth.empty();
    horoInfo.empty();
}
//local storage, I changed this so that it uses the date and description, sets
// them to an object, pushes the object into the storageLocal array above, then
// stringifies the array into localStorage, then appends the date + description
// inside the savedText box.

// Instead of the birthday being saved, I was thinking that the date you requested
// the horoscope is saved. Your birthday won't change, but your horoscope tomorrow will
// so now, it appends today's date and today's description, so you can see which
// description you got on which day.
function addLSText(date, description){
    let storageObject = {
      date: date,
      description: description
    }
    storageLocal.push(storageObject)
    localStorage.setItem('sign-store', JSON.stringify(storageLocal))
    savedText.append(date + ': ' + description + '<br>')
}