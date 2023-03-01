window.addEventListener("load", ()=>{
    let long;
    let lat;
    let temperaturDescription = document.querySelector(".temperture-description")
    let temperaturDegree = document.querySelector(".temperture-degree")
    let locationTimeZone = document.querySelector(".location-timezone")

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude
            lat = position.coords.latitude

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}http://api.weatherapi.com/v1/current.json?key=1c90130abf8341a1b1d205819232802&q=${lat},${long}`
            //console.log(api)
            
            
            fetch(api)
            .then(response => {
              return response.json() 
            })
            .then(data => {
                console.log(data)
                const temp = data.current.temp_c;
                const summary = data.current.condition.text;
                //const location = data.current.temp_c
                // Set DOM element frpm API
                temperaturDegree.textContent = temp + " C"
                temperaturDescription.textContent = summary
                locationTimeZone.textContent = data.location.name
                
            })
        })
       
    }
        function setIcons(icon, iconId)
        {
            const skycons = new Skycons({color:"white"})
        }
})