const express=require('express')
const path=require('path')
const hbs=require('hbs')
const app=express()
const port=process.env.PORT || 2000

const request=require('request')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const publicDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.use(express.static(publicDir))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
res.render('index',{
    title:'Weather-App',
    name:'Sezal',
})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Sezal',})
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Sezal',})
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address!',
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({error: error})
        }
    
    forecast(longitude,latitude,(error,data2)=>{
        if(error){
            return res.send({error: error})
        }
    
        res.send({location: location,
        forecast:data2,
        address:req.query.address,
    })
       
    })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sezal',
        errorMessage:'Help article not found'})

})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sezal',
        errorMessage:'Page not found'})
})
app.listen(port,()=>{console.log('server is up on port'+port)})