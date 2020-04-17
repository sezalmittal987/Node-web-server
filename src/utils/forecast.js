const request=require('request')
const forecast=(longitude,latitude,callback)=>{
    const url='https://api.darksky.net/forecast/dc82d5484586bacdc67d8a6f0ceaaef3/'+longitude+','+latitude+'?units=si'
     request({url:url,json:true},(error,{body}={})=>{
if(error){
    callback('Unable to connect to the weather service',undefined)
}else if(body.error){
callback('Unable to find location',undefined)
}else{
callback(undefined, 'It is currently '+body.currently.temperature+'degress out.There is a '+body.currently.precipProbability+'chances of raining')

}})}

module.exports=forecast