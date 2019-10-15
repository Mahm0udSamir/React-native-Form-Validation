const loginServise = (authData) => {
    let url = `https://rn-task.dtagdev.com/api/login`;
    let formData = new FormData();
    formData.append('email', authData.email);
    formData.append('password', authData.password);

    console.log(authData)
    return new Promise(resolve => {

        return fetch(url, {
          method: "POST",
          body: formData,
        })
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
            resolve()
          }
          console.log(parsRes);
        })
    })

}

export default loginServise;
