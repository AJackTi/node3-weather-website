console.log('Client side javascript file is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })
//
// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         if (data.error){
//             console.log(data.error)
//         }
//         else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e)=>{
    // prevent load page
    e.preventDefault();

    const location = search.value;
    if (!location) {
        console.log('');
        return;
    }
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            console.log(data.error);
            document.getElementById('result1').innerText = data.error;
        }
        else {
            document.getElementById('result1').innerText = data.location;
            document.getElementById('result2').innerText = data.forecast;
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})
    // console.log('testing!')
});