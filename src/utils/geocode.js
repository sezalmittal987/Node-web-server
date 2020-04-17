const request=require('request')

const geocode=(address,callback)=>{
    const url1='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2V6YWxtaXR0YWwiLCJhIjoiY2s0YTZ6NWY0MDEwdTNtbnpoYndrc3dqMCJ9.vWv4RmfJz8vFf38qSKkWmA'
    request({url:url1,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to the server',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                location:body.features[0].place_name,
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
            })
        
        }}
    )
}

module.exports=geocode