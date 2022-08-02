'use strict';

require('dotenv').config();

const express=require('express');
const cors=require('cors');

const app=express();

app.use(cors());

const PORT=process.env.PORT || 3001
const weatherData=require('./data/Weather.json');

console.log(weatherData);

app.get('/weather', (req, res)=>{
    let searchQuery=req.query.searchQuery;

    const city=weatherData.find((city=> city.city_name.toLowerCase()===searchQuery.toLowerCase()));
    try{
    const weatherArr=city.data.map((item=>new Forecast(item)))
     
    res.status(200).send(city);
    }
    catch(err){
      handleError(err, res);
    }
})
function handleError(error, res){
    res.status(500).send('Somthing went wrong');

}

app.listen(PORT,()=>{
    console.log('Working Server!!!')
})

class Forecast{
    constructor(day){
        this.data=day.valid_date;
        this.description=day.weather.description;
    }
}