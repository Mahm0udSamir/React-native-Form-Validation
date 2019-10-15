const getAddress = (lat, lng) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&location_type=ROOFTOP&result_type=street_address&key=AIzaSyDUls2fj2LLh3vnIpQ2DU_MhjPHIauGtZU`;
    

     
    return new Promise(resolve => {

        return fetch(url)
        .catch(err => {
          console.log(err);
          alert("Authantication Falid Please Try Again!");
        })
        .then(res => res.json())
        .then(parsRes => {
          if (parsRes.errors) {
            let msg = '';
            for (const i in parsRes.errors) {
              msg += parsRes.errors[i] + '\n';
            }
            alert(msg);
          } else { 
          
            console.log(parsRes);
            if(parsRes.results[0]){

              resolve(parsRes.results[0].formatted_address);
            } else {
              resolve()
            }
          }
        })
    })

}

export default getAddress;
