const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
// app.com
// app.com/help
// app.com/about

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'AJack Ti'
    })
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'AJack Ti'
    })
});

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some heplful text.',
        title: 'Help',
        name: 'AJack Ti'
    })
});

// app.get('', (req, res)=>{
//     res.send('<h1>Weather</h1>')
// });

// app.get('/help', (req, res)=>{
//     // res.send('Help page')
//     res.send([{
//         name: 'Andrew'
//     },{
//         name: 'Sarah'
//     }])
// });
//
// app.get('/about', (req, res)=>{
//     // res.send('About')
//     res.send('<h1>About</h1>')
// });

app.get('/weather', (req, res)=>{
    // res.send('Your weather')
    // http://localhost:3000/weather
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // http://localhost:3000/weather?address=Vietnam
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphian',
    //     address: req.query.address
    // })
});

app.get('/products', (req, res)=>{
    // console.log(req.query)
    // console.log(req.query.search)

    //http://localhost:3000/products
    if (!req.query.search)
    {
         return res.send({
            error: 'You must provice a search term'
        })
    }
    //http://localhost:3000/products?search=products
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'AJack Ti',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'AJack Ti',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})