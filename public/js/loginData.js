const loginForm = document.querySelector('#login__form')

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

async function sendPOSTRequest(email, password) {
    try {
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
        const data = await response.json()

        if(response.ok){
            localStorage.setItem('token', data.token);
            window.location.href = '/';
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