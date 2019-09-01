window.addEventListener("load", () => {
    let currentLongitude;
    let currentLatitude;
    let tempDesc = document.querySelector(".temp-desc");
    let locationCountry = document.querySelector(".location-country");
   /*  let locDate = document.querySelector(".location-date"); */   // exact date not located in the api
    let tempDegree = document.querySelector(".temperature-degree");
    let sectionTemp = document.querySelector(".temperature");
    let degreeFah = document.querySelector(".temperature span");
    let degreeFigure = document.querySelector(".temperature-degree");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(current => {
            currentLongitude = current.coords.longitude;
            currentLatitude = current.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/4fc58a1cba6a2ba60409fa7ad28ec623/${currentLatitude},${currentLongitude}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    /*  console.log(data); */
                    const { temperature, summary, icon } = data.currently;
                    tempDegree.textContent = temperature;
                    tempDesc.textContent = summary;
                    locationCountry.textContent = data.timezone;

                    // figure cel to fah calculation
                    let celsius = (temperature - 32) * (5 / 9);

                    Iconize(icon, document.querySelector(".icon")); // invoke function

                    // temperature to cel/
                    sectionTemp.addEventListener("click", () => {
                        if (degreeFah.textContent === "F") {
                            degreeFah.textContent = "C";
                            degreeFigure.textContent = Math.floor(celsius);
                        } else {
                            degreeFah.textContent = "F";
                            degreeFigure.textContent = temperature;
                        }
                    });
                });
        });
    }

    function Iconize(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});