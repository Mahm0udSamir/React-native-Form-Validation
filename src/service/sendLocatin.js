const sendLocation = (locationData) => {
    let url = `https://rn-task.dtagdev.com/api/post/location`;
    let formData = new FormData();
    formData.append('latitude', locationData.latitude);
    formData.append('longitude', locationData.longitude);
    formData.append('area', locationData.area);
    formData.append('address', locationData.address);

    console.log(locationData)
    return new Promise(resolve => {

        return fetch(url, {
            method: "POST",
            body: formData,
        })
            .catch(err => {
                console.log(err);
                alert("Send Falid Please Try Again!");
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
                    alert('Send Succsess');
                    resolve();
                }
                console.log(parsRes);
            })
    })

}

export default sendLocation;
