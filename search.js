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