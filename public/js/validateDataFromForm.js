const registraitionForm = document.querySelector("#register__form");

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(pass) {
  const symbolsOfPass = pass.split("");
  const regexUpper = /[A-Z]/;
  const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const numberRegex = /[0-9]/;

  if (
    pass.length > 8 &&
    symbolsOfPass.some((str) => numberRegex.test(str)) &&
    symbolsOfPass.some((str) => regexUpper.test(str)) &&
    symbolsOfPass.some((str) => specialCharsRegex.test(str))
  ) {
    return true;
  } else {
    console.log("password is not correct");
    if (pass.length <= 8) {
      console.log("Пароль слишком короткий");
    }
    if (!symbolsOfPass.some((str) => numberRegex.test(str))) {
      console.log("Пароль должен содержать цифры");
    }
    if (!symbolsOfPass.some((str) => regexUpper.test(str))) {
      console.log("Пароль должен сожержать заглавные буквы");
    }
    if (!symbolsOfPass.some((str) => specialCharsRegex.test(str))) {
      console.log("Пароль должен содержать специальные симовлы");
    }
    return false;
  }
}

async function sendPOSTRequest(username, email, password) {
  return await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });
}

registraitionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const emailValue = document.querySelector("#email__input").value;
  const passwordValue = document.querySelector("#password__input").value;
  const usernameValue = document.querySelector("#username__input").value;

  if (validateEmail(emailValue) && validatePassword(passwordValue)) {
    try {
      const response = await sendPOSTRequest(
        usernameValue.trim(),
        emailValue.trim(),
        passwordValue.trim(),
      );
      console.log('Отправка данных на сервер')
      const result = await response.json()
      console.log(`Результат ${result}`)
    } catch (error) {
      console.log("Ошибка сети: ", error);
    }
  }
});

export { validatePassword, validateEmail }