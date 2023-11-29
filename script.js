async function fetchData(address) {
  try {
    const response = await fetch(address);
    if(response.status === 200){
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById("formId");
  form.addEventListener('submit', showtime);
  async function showtime(event) {
      event.preventDefault();
      const location = document.getElementById('locationInput').value;
      const loc = `https://geocode.maps.co/search?q=${location}`
      await fetchData(loc).then( async(res) => {
        const latitude = res[0].lat
        const longitude  = res[0].lon
        const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${tomorrow.toISOString().split('T')[0]}`;
        await fetchData(url).then( async(data) => {
                document.querySelector('#today').innerHTML = `
                <div class="p-10 bold">Today</div>
                <div class="p-10 highlight">${data?.results?.sunrise}</div>
                <div class="p-10 highlight">${data?.results?.sunset}</div>
                <div class="p-10 highlight">${data?.results?.dawn}</div>
                <div class="p-10 highlight">${data?.results?.dusk}</div>
                <div class="p-10 highlight">${data?.results?.day_length}</div>
                <div class="p-10 highlight">${data?.results?.solar_noon}</div>
                <div class="p-10 highlight">${data?.results?.timezone}</div>              
              `
        }).catch((err) => console.log(`${err}`))
  
        await fetchData(tomorrowUrl).then( async(data) => {
              document.querySelector('#tomorrow').innerHTML = `
                <div class="p-10 bold">Tomorrow</div>
                <div class="p-10 highlight">${data?.results?.sunrise}</div>
                <div class="p-10 highlight">${data?.results?.sunset}</div>
                <div class="p-10 highlight">${data?.results?.dawn}</div>
                <div class="p-10 highlight">${data?.results?.dusk}</div>
                <div class="p-10 highlight">${data?.results?.day_length}</div>
                <div class="p-10 highlight">${data?.results?.solar_noon}</div>
                <div class="p-10 highlight">${data?.results?.timezone}</div>              
              `
        }).catch((err) => console.log(`${err}`))
      }).catch((err) => alert("Please specify correct Location"));
  }
});
