const registerServise = (authData) => {
    let url = `https://rn-task.dtagdev.com/api/register`;
    let formData = new FormData();
    formData.append('name', authData.name);
    formData.append('email', authData.email);
    formData.append('password', authData.password);
    formData.append('password_confirmation', authData.password_confirmation);

  console.log('authData ', authData)
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
            console.log('parsRes ', parsRes);
            resolve()
          }
        })
    })

}

export default registerServise;
