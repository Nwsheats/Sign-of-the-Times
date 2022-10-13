//Define zodiacSign as a global variable to use later in the getAztro function
var zodiacSign = "";

// set variable for clicking button
const button = document.getElementById('btn');
const horoMonth = $('#horoscopeMonth');
const horoInfo = $('#horoscopeInfo');
const bDayLink = $('#bdayLinktoWiki');
const bDayInfo = $('#fetchbdayinfo');


//add event listeners to trigger functions when submit button is clicked
//first need to prevent default page reload behavior because the console 
//log was clearing immediately, so couldn't debug page behavior
button.addEventListener('click', function (event) {
    event.preventDefault()
});

button.addEventListener('click', getByabbe);
//button.addEventListener('click', getAztro);
button.addEventListener('click', dateToZodiac);



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
function popWiki(wikiData) { //make function to render the wiki data elements
    removeContent();
    let apString = ""; //apString holds the HTML that we'll replace in the loop
    var wikiUL = document.getElementById('bdayList');
     //into this element we'll insert new <a> and <p> tags
    for (let i = 0; i < 5; i++) { //loop through first five people, maybe later make random?
        var birthsYear = wikiData.births[i].year;
        var birthsDesc = wikiData.births[i].description;
        var birthsLink = wikiData.births[i].wikipedia[0].wikipedia;

        apString += '<a class="list-disc" target=_blank href="' + birthsLink + '">\
                            <p class="list-disc">'+ birthsYear + ' - ' + birthsDesc + '</p>\
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
    //let horoSign = zodiacSign;

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

function popData(horoData) {
    removeContent();
    const horoDesc = horoData.description;
    const horoColor = horoData.color;
    const horoComp = horoData.compatibility;
    const horoMood = horoData.mood;
    const horoDate = horoData.current_date;
    const horoNum = horoData.lucky_number;

    horoMonth.append(zodiacSign);
    horoInfo.append('Color: ' + horoColor + '<br> Mood: ' + horoMood + '<br> Lucky Number: ' + horoNum +
        '<br> Compatibility: ' + horoComp + '<br> Horoscope: ' + horoDesc)
}

function removeContent() {
    horoMonth.empty();
    horoInfo.empty();
}