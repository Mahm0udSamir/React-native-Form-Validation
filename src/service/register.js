const registerServise = (authData) => {
    let url = `https://rn-task.dtagdev.com/api/register`;
    let formData = new FormData();
    formData.append('name', authData.name);
    formData.append('email', authData.email);
    formData.append('password', authData.password);
    formData.append('password_confirmation', authData.password_confirmation);

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
            alert(parsRes.errors.account[0]);
          } else { 
            resolve()
          }
          console.log(parsRes);
        })
    })

}

export default registerServise;
