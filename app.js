window.addEventListener("load", ()=>{
    let long;
    let lat;
    const temperaturDescription = document.querySelector(".temperture-description")
    const temperaturDegree = document.querySelector(".temperture-degree")
    const locationTimeZone = document.querySelector(".location-timezone")
    const iconEl = document.getElementById("icon")
    const inputEl = document.getElementById("locationInput")
    let localTime = document.getElementById("currentTime")

    
    if(navigator.geolocation)
    {
            navigator.geolocation.getCurrentPosition(position =>
        {
            long = position.coords.longitude
            lat = position.coords.latitude

            const proxy = "https://cors-anywhere.herokuapp.com/"
            let api = `${proxy}http://api.weatherapi.com/v1/current.json?key=1c90130abf8341a1b1d205819232802&q=${lat},${long}`
            getWheather(api)
            //console.log(api)
           
            inputEl.addEventListener("click" ,function()
            {
                inputEl.value =""
            })
            //letar upp inputfältet och lyssnar om trycker Enter. Värdet fråmn inputfältest ska sedan sparas
            inputEl.addEventListener('change', (e) => 
            {
                let city = e.currentTarget.value
                api = `${proxy}http://api.weatherapi.com/v1/current.json?key=1c90130abf8341a1b1d205819232802&q=${city}`
                getWheather(api)
               
                
             });
                function getWheather(api)  
                {  
                fetch(api)
                .then(response => {
                return response.json() 
                })
                .then(data => {
                    console.log(data)
                    const temp = data.current.temp_c;
                    if(temp < 0)
                    {
                        temperaturDegree.style.color = "blue"
                    }
                    else{
                        temperaturDegree.style.color = "red"
                    }
                    console.log(temp)
                    const summary = data.current.condition.text;
                   
                    // Set DOM element from API
                    temperaturDegree.textContent = temp + " C"
                    temperaturDescription.textContent = summary
                    locationTimeZone.textContent = data.location.name
                    iconEl.innerHTML = `<img src="${data.current.condition.icon}" style="height:100px"/>`
                    localTime.textContent = "Lokal tid: " + data.location.localtime.slice(11)
                   
                    
                    
                })
            }
            
        })
       
    }
})