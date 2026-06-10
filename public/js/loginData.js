const loginForm = document.querySelector('#login__form')

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

async function sendPOSTRequest(email, password) {
    try {
        // Send request on server
        const response = await fetch('http://localhost:3000/login/dataValidation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        // Get the answer from server
        const data = await response.json()

        if(response.ok){
            window.location.href = '/';
        }
        const errorEmailText = document.querySelector('.logine__error')
        const errorPasswordText = document.querySelector('.login__error')

        if(data.error === 'Invalid Email or Password'){
            errorEmailText.style.display = 'none'
            errorPasswordText.style.display = 'block'
        }

        if(data.error === "User not found"){
            errorPasswordText.style.display = 'none'
            errorEmailText.style.display = 'block'
        }
        
    } catch (error) {
        console.error(error.message)
    }
}

loginForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const email = document.querySelector('#login__email').value
    const password = document.querySelector('#login__password').value

    if(validateEmail(email)){
        sendPOSTRequest(email.trim().toLowerCase(), password.trim())
    }
})