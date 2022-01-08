const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')


app.use(cors({
    origin:'http://localhost:3000'
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT || 2000, () => console.log("Backend running!"));



app.get("/", (req,res)=>{
    res.send('Welcome')
})

const apiKey = "1751e40135324671ae701417220601";
const baseURL = "http://api.weatherapi.com/v1/";

app.post("/forecast", (req, res) => {

    const city = req.body.city;
    const daysForecast = 7;
    const forecastURL = baseURL + "forecast.json?key=" + apiKey + "&q=" + city + "&days=" + daysForecast + "&aqi=no&alerts=no";

    axios.get(forecastURL).then(
        (r) => {
            //console.log(r.data.forecast.forecastday)
            (r.data.forecast.forecastday).map((el,index)=>{
                console.log(el.day.condition)
            })
            res.send(r.data)
        }
        
    ).catch((err) => res.send('error'))
})

